import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  readSheet,
  updateRowById,
} from "@/lib/googleSheets";

async function getAccess(id) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  const role = session.user.role;
  const userId = String(session.user.id || "");
  const targetId = String(id || "");

  // Teacher can access every student
  if (role === "teacher") {
    return session;
  }

  // Student can access only their own record
  if (
    role === "student" &&
    userId === targetId
  ) {
    return session;
  }

  return null;
}

export async function GET(req, { params }) {
  const access = await getAccess(params.id);

  if (!access) {
    return NextResponse.json(
      { error: "دسترسی غیرمجاز" },
      { status: 403 }
    );
  }

  try {
    const [
      students,
      sessions,
      logs,
      messages,
      files,
    ] = await Promise.all([
      readSheet("Students"),
      readSheet("Sessions"),
      readSheet("PracticeLogs"),
      readSheet("Messages"),
      readSheet("Files"),
    ]);

    const student = students.find(
      (s) =>
        String(s.id) === String(params.id)
    );

    if (!student) {
      return NextResponse.json(
        { error: "هنرجو پیدا نشد" },
        { status: 404 }
      );
    }

    // Never send password or PIN to browser
    const safeStudent = {
      ...student,
    };

    delete safeStudent.pin;
    delete safeStudent.passwordHash;

    const studentSessions =
      sessions.filter(
        (s) =>
          String(s.studentId) ===
          String(params.id)
      );

    const studentLogs =
      logs.filter(
        (l) =>
          String(l.studentId) ===
          String(params.id)
      );

    const studentMessages =
      messages.filter(
        (m) =>
          String(m.studentId) ===
          String(params.id)
      );

    const studentFiles =
      files.filter(
        (f) =>
          !f.studentId ||
          String(f.studentId) ===
            String(params.id)
      );

    return NextResponse.json({
      student: safeStudent,
      sessions: studentSessions,
      logs: studentLogs,
      messages: studentMessages,
      files: studentFiles,
    });
  } catch (err) {
    console.error(
      "Student API error:",
      err
    );

    return NextResponse.json(
      {
        error:
          err.message ||
          "خطا در دریافت اطلاعات هنرجو",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req,
  { params }
) {
  const session =
    await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "teacher"
  ) {
    return NextResponse.json(
      { error: "دسترسی غیرمجاز" },
      { status: 403 }
    );
  }

  try {
    const patch = await req.json();

    await updateRowById(
      "Students",
      "id",
      params.id,
      patch
    );

    return NextResponse.json({
      ok: true,
    });
  } catch (err) {
    console.error(
      "Student update error:",
      err
    );

    return NextResponse.json(
      {
        error:
          err.message ||
          "خطا در ذخیره اطلاعات",
      },
      { status: 500 }
    );
  }
}