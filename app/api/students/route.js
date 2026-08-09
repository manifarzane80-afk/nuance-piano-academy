import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readSheet } from "@/lib/googleSheets";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "teacher") {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }
  try {
    const students = await readSheet("Students");
    // never leak login PINs to the client list view
    const safe = students.map(({ pin, ...rest }) => rest);
    return NextResponse.json({ students: safe });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
