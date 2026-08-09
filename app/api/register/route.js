import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { appendRow, readSheet, nextId } from "@/lib/googleSheets";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      fullName,
      phone,
      email,
      password,
      age,
      city,
      played,
      years,
      level,
      goal,
      style,
      times,
    } = body;

    // حداقل یکی از شماره تلفن یا ایمیل باید وارد شود
    if (!fullName || !password || (!phone && !email)) {
      return NextResponse.json(
        {
          error:
            "نام، رمز عبور و حداقل یکی از شماره تلفن یا ایمیل الزامی است",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
        { status: 400 }
      );
    }

    const students = await readSheet("Students");

    // جلوگیری از ثبت شماره تکراری
    if (
      phone &&
      students.some(
        (student) => String(student.phone).trim() === String(phone).trim()
      )
    ) {
      return NextResponse.json(
        { error: "این شماره تلفن قبلاً ثبت شده است" },
        { status: 409 }
      );
    }

    // جلوگیری از ثبت ایمیل تکراری
    if (
      email &&
      students.some(
        (student) =>
          String(student.email).trim().toLowerCase() ===
          String(email).trim().toLowerCase()
      )
    ) {
      return NextResponse.json(
        { error: "این ایمیل قبلاً ثبت شده است" },
        { status: 409 }
      );
    }

    const id = nextId(students);

    // رمز عبور هرگز به صورت خام در Google Sheet ذخیره نمی‌شود
    const passwordHash = await bcrypt.hash(password, 12);

    const row = {
      id,
      fullName,
      phone: phone || "",
      pin: "",
      email: email || "",
      passwordHash,
      age,
      city,
      level,
      goal,
      style,
      times: Array.isArray(times) ? times.join("، ") : times || "",
      joined: new Date().toLocaleDateString("fa-IR"),
      remainingSessions: "0",
      practiceAvg: "",
    };

    await appendRow("Students", row);

    return NextResponse.json({
      ok: true,
      id,
    });
  } catch (err) {
    console.error("Register error:", err);

    return NextResponse.json(
      { error: err.message || "خطای سرور" },
      { status: 500 }
    );
  }
}