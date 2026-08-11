import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 100 * 1024 * 1024;

const ALLOWED_TYPES = {
  image: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ],

  video: [
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ],

  audio: [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/ogg",
    "audio/mp4",
    "audio/aac",
  ],

  document: [
    "application/pdf",
  ],
};

function getCategory(type) {
  for (const [category, types] of Object.entries(ALLOWED_TYPES)) {
    if (types.includes(type)) {
      return category;
    }
  }

  return null;
}

function safeFileName(name) {
  return name
    .replace(/[^\w\u0600-\u06FF.\- ]/g, "_")
    .replace(/\s+/g, "_");
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const requestedCategory = formData.get("category");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          success: false,
          error: "فایلی انتخاب نشده است.",
        },
        { status: 400 }
      );
    }

    if (!file.type) {
      return NextResponse.json(
        {
          success: false,
          error: "نوع فایل مشخص نیست.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "حجم فایل نباید بیشتر از 100 مگابایت باشد.",
        },
        { status: 400 }
      );
    }

    const detectedCategory = getCategory(file.type);

    if (!detectedCategory) {
      return NextResponse.json(
        {
          success: false,
          error:
            "این نوع فایل پشتیبانی نمی‌شود. عکس، ویدیو، صوت یا PDF انتخاب کنید.",
        },
        { status: 400 }
      );
    }

    if (
      requestedCategory &&
      requestedCategory !== detectedCategory
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `این فایل از نوع ${detectedCategory} است.`,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension =
      path.extname(file.name) ||
      getExtensionFromMime(file.type);

    const uniqueName =
      `${Date.now()}-${crypto.randomUUID()}${extension}`;

    const folder =
      path.join(
        process.cwd(),
        "public",
        "uploads",
        detectedCategory
      );

    await mkdir(folder, {
      recursive: true,
    });

    const filePath =
      path.join(
        folder,
        safeFileName(uniqueName)
      );

    await writeFile(
      filePath,
      buffer
    );

    const publicUrl =
      `/uploads/${detectedCategory}/${safeFileName(uniqueName)}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      name: file.name,
      size: file.size,
      type: file.type,
      category: detectedCategory,
    });

  } catch (error) {
    console.error(
      "UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "آپلود فایل انجام نشد.",
      },
      { status: 500 }
    );
  }
}

function getExtensionFromMime(type) {
  const extensions = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",

    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "video/quicktime": ".mov",

    "audio/mpeg": ".mp3",
    "audio/mp3": ".mp3",
    "audio/wav": ".wav",
    "audio/x-wav": ".wav",
    "audio/ogg": ".ogg",
    "audio/mp4": ".m4a",
    "audio/aac": ".aac",

    "application/pdf": ".pdf",
  };

  return extensions[type] || "";
}