import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readSheet, appendRow, nextId } from "@/lib/googleSheets";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId") || (session.user.role === "student" ? session.user.id : null);
  if (!studentId) return NextResponse.json({ messages: [] });

  try {
    const all = await readSheet("Messages");
    return NextResponse.json({ messages: all.filter((m) => String(m.studentId) === String(studentId)) });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });

  try {
    const body = await req.json();
    const studentId = session.user.role === "student" ? session.user.id : body.studentId;
    if (!studentId || !body.text) return NextResponse.json({ error: "متن پیام یا هنرجو مشخص نیست" }, { status: 400 });

    const existing = await readSheet("Messages");
    const id = nextId(existing);
    const row = {
      id,
      studentId,
      from: session.user.role === "teacher" ? "استاد" : "هنرجو",
      text: body.text,
      time: new Date().toLocaleString("fa-IR"),
    };
    await appendRow("Messages", row);
    return NextResponse.json({ ok: true, message: row });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
