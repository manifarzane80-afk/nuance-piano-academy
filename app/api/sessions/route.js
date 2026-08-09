import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  readSheet,
  appendRow,
  updateRowById,
  nextId,
} from "@/lib/googleSheets";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "teacher") {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز" },
        { status: 403 }
      );
    }

    const sessions = await readSheet("Sessions");

    return NextResponse.json({
      ok: true,
      sessions,
    });
  } catch (err) {
    console.error("GET /api/sessions error:", err);

    return NextResponse.json(
      {
        error: err?.message || "خطا در دریافت جلسات",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "teacher") {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const studentId = String(body.studentId || "").trim();
    const date = String(body.date || "").trim();
    const time = String(body.time || "").trim();
    const status =
      String(body.status || "برنامه‌ریزی شده").trim();

    if (!studentId) {
      return NextResponse.json(
        { error: "شناسه هنرجو ارسال نشده است" },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: "تاریخ جلسه وارد نشده است" },
        { status: 400 }
      );
    }

    if (!time) {
      return NextResponse.json(
        { error: "ساعت جلسه وارد نشده است" },
        { status: 400 }
      );
    }

    const [sessions, students] = await Promise.all([
      readSheet("Sessions"),
      readSheet("Students"),
    ]);

    const student = students.find(
      (s) => String(s.id) === studentId
    );

    if (!student) {
      return NextResponse.json(
        {
          error: `هنرجو پیدا نشد. studentId=${studentId}`,
        },
        { status: 404 }
      );
    }

    const newSession = {
      id: nextId(sessions),
      studentId,
      date,
      time,
      status,
    };

    console.log("Creating session:", newSession);

    const saved = await appendRow(
      "Sessions",
      newSession
    );

    return NextResponse.json({
      ok: true,
      message: "جلسه با موفقیت ثبت شد",
      session: saved || newSession,
    });
  } catch (err) {
    console.error("POST /api/sessions error:", err);

    return NextResponse.json(
      {
        ok: false,
        error:
          err?.message ||
          "خطا در ثبت جلسه",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "teacher") {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const id = String(body.id || "").trim();
    const status = String(body.status || "").trim();

    if (!id) {
      return NextResponse.json(
        { error: "شناسه جلسه ارسال نشده است" },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: "وضعیت جلسه مشخص نشده است" },
        { status: 400 }
      );
    }

    const sessions = await readSheet("Sessions");

    const target = sessions.find(
      (s) => String(s.id) === id
    );

    if (!target) {
      return NextResponse.json(
        { error: "جلسه پیدا نشد" },
        { status: 404 }
      );
    }

    await updateRowById(
      "Sessions",
      "id",
      id,
      { status }
    );

    return NextResponse.json({
      ok: true,
      message: "وضعیت جلسه تغییر کرد",
    });
  } catch (err) {
    console.error("PATCH /api/sessions error:", err);

    return NextResponse.json(
      {
        error:
          err?.message ||
          "خطا در تغییر وضعیت جلسه",
      },
      { status: 500 }
    );
  }
}