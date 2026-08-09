import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readSheet, appendRow, nextId } from "@/lib/googleSheets";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId") || (session.user.role === "student" ? session.user.id : null);

  try {
    let logs = await readSheet("PracticeLogs");
    if (studentId) logs = logs.filter((l) => String(l.studentId) === String(studentId));
    return NextResponse.json({ logs });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "student") {
    return NextResponse.json({ error: "فقط هنرجو می‌تواند گزارش تمرین ثبت کند" }, { status: 403 });
  }
  try {
    const body = await req.json();
    const existing = await readSheet("PracticeLogs");
    const id = nextId(existing);
    const row = {
      id,
      studentId: session.user.id,
      date: new Date().toLocaleDateString("fa-IR"),
      duration: body.duration,
      note: body.note,
      fileUrl: body.fileUrl || "",
    };
    await appendRow("PracticeLogs", row);
    return NextResponse.json({ ok: true, log: row });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
