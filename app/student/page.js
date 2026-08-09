"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Calendar,
  ClipboardList,
  FileText,
  MessageSquare,
  Star,
  Mic,
  Send,
  Download,
} from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function StudentDashboard() {
  const { t } = useLang();
  const { data: session, status } = useSession();

  const [data, setData] = useState(null);
  const [duration, setDuration] = useState("");
  const [note, setNote] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fileRef = useRef(null);

  const load = async () => {
    if (!session?.user?.id) return;

    try {
      const res = await fetch(
        `/api/students/${session.user.id}`,
        {
          cache: "no-store",
        }
      );

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Student dashboard error:", error);

      setData({
        error: "خطا در دریافت اطلاعات هنرجو",
      });
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      load();
    }
  }, [status, session?.user?.id]);

  if (status === "loading") {
    return (
      <div className="text-center text-sm py-10 text-inkdim">
        {t.loading}
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center text-sm py-10">
        لطفاً ابتدا وارد حساب کاربری خود شوید.
      </div>
    );
  }

  if (session.user?.role === "teacher") {
    return (
      <div className="max-w-2xl mx-auto text-center py-10">
        <div
          className="npa-card p-6"
          style={{ color: "var(--ink-dim)" }}
        >
          این پنل مخصوص هنرجوهاست.
          <br />
          برای مشاهده اطلاعات هنرجوها از پنل استاد استفاده کنید.
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-sm py-10 text-inkdim">
        {t.loading}
      </div>
    );
  }

  if (data.error) {
    return (
      <div
        className="text-center text-sm py-10"
        style={{ color: "var(--clay)" }}
      >
        {data.error}
      </div>
    );
  }

  const {
    student = {},
    sessions = [],
    logs = [],
    messages = [],
    files = [],
  } = data;

  const submitPractice = async () => {
    if (!duration || !note) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/practice-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration: `${duration} دقیقه`,
          note,
        }),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        throw new Error(
          result.error || "ثبت تمرین انجام نشد"
        );
      }

      setDuration("");
      setNote("");
      setFileName("");

      await load();
    } catch (error) {
      console.error("Practice submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="npa-card p-5 mb-5">
        <div className="flex items-center gap-3">

          <div
            className="w-[50px] h-[50px] rounded-full flex items-center justify-center font-bold text-[17px]"
            style={{
              background: "rgba(198,161,91,.15)",
              border:
                "1px solid rgba(198,161,91,.4)",
              color: "var(--gold-bright)",
            }}
          >
            {student.fullName?.[0] || "؟"}
          </div>

          <div>
            <div className="text-lg font-bold">
              {t.welcome || "خوش آمدید"}،{" "}
              {student.fullName?.split(" ")[0] || "هنرجو"} 👋
            </div>

            <div className="text-[12.5px] text-inkdim mt-1">
              {student.level || "—"} ·{" "}
              {student.remainingSessions || 0}{" "}
              {t.remainingSessions || "جلسه باقی‌مانده"}
            </div>
          </div>

        </div>
      </div>


      {/* Schedule */}
      <Section
        icon={Calendar}
        title={t.mySchedule || "برنامه جلسات"}
      >
        {sessions.map((s) => (
          <div
            key={s.id}
            className="npa-card p-3 flex justify-between items-center"
          >
            <div className="text-[13px]">
              <div className="font-semibold">
                {s.date}
              </div>

              <div className="text-inkdim text-[11.5px]">
                {s.time}
              </div>
            </div>

            <span
              className={`npa-chip ${
                s.status === "برگزار شده"
                  ? "sage"
                  : s.status === "لغو شده"
                  ? "clay"
                  : "gold"
              }`}
            >
              {s.status}
            </span>
          </div>
        ))}

        {sessions.length === 0 && <Empty />}
      </Section>


      {/* Practice */}
      <Section
        icon={ClipboardList}
        title={t.logPractice || "ثبت تمرین"}
      >
        <div className="npa-card p-4 flex flex-col gap-3">

          <div>
            <label className="text-[12.5px] text-inkdim mb-1.5 block">
              {t.duration || "مدت تمرین"}
            </label>

            <input
              className="npa-input"
              type="number"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
            />
          </div>

          <div>
            <label className="text-[12.5px] text-inkdim mb-1.5 block">
              {t.note || "یادداشت"}
            </label>

            <textarea
              className="npa-input"
              rows={3}
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
            />
          </div>

          <div>
            <label className="text-[12.5px] text-inkdim mb-1.5 block">
              {t.optionalFile || "فایل اختیاری"}
            </label>

            <button
              type="button"
              className="npa-btn-ghost w-full justify-center"
              onClick={() =>
                fileRef.current?.click()
              }
            >
              <Mic size={15} />

              {fileName ||
                t.addFile ||
                "افزودن فایل"}
            </button>

            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) =>
                setFileName(
                  e.target.files?.[0]?.name || ""
                )
              }
            />
          </div>

          <button
            type="button"
            className="npa-btn-gold justify-center"
            disabled={
              !duration ||
              !note ||
              submitting
            }
            onClick={submitPractice}
          >
            {submitting
              ? t.loading
              : t.logBtn || "ثبت تمرین"}

            <Send size={15} />
          </button>

        </div>
      </Section>


      {/* Teacher Files */}
      <Section
        icon={FileText}
        title={t.teacherFiles || "فایل‌های استاد"}
      >
        {files.map((f) => (
          <a
            key={f.id}
            href={f.url}
            target="_blank"
            rel="noreferrer"
            className="npa-card p-3 flex items-center gap-2.5"
          >
            <FileText
              size={17}
              className="text-gold"
            />

            <div className="flex-1 text-[13px]">
              {f.name}
            </div>

            <Download
              size={16}
              className="text-inkdim"
            />
          </a>
        ))}

        {files.length === 0 && <Empty />}
      </Section>


      {/* Messages */}
      <Section
        icon={MessageSquare}
        title={
          t.teacherMessages ||
          "پیام‌های استاد"
        }
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className="npa-card p-3"
          >
            <div className="text-[13px]">
              {m.text}
            </div>

            <div className="text-[11px] text-inkdim mt-1.5">
              {m.time}
            </div>
          </div>
        ))}

        {messages.length === 0 && <Empty />}
      </Section>


      {/* Practice History */}
      <Section
        icon={Star}
        title={
          t.practiceHistory ||
          "تاریخچه تمرین"
        }
      >
        {logs.map((l) => (
          <div
            key={l.id}
            className="npa-card p-3"
          >
            <div className="flex justify-between">

              <span className="font-bold text-[12.5px]">
                {l.date}
              </span>

              <span className="npa-chip gold">
                {l.duration}
              </span>

            </div>

            <div className="text-[12.5px] text-inkdim mt-1">
              {l.note}
            </div>
          </div>
        ))}

        {logs.length === 0 && <Empty />}
      </Section>

    </div>
  );
}


function Section({
  icon: Icon,
  title,
  children,
}) {
  return (
    <section className="mb-6">

      <div className="flex items-center gap-2 mb-3">

        <div
          className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center border border-gold/40"
          style={{
            background:
              "rgba(198,161,91,.12)",
          }}
        >
          <Icon
            size={17}
            style={{
              color: "var(--gold-bright)",
            }}
          />
        </div>

        <h2 className="font-semibold text-[15px]">
          {title}
        </h2>

      </div>

      <div className="flex flex-col gap-2">
        {children}
      </div>

    </section>
  );
}


function Empty() {
  return (
    <div className="text-center text-[12px] text-inkdim py-4">
      هنوز موردی ثبت نشده است.
    </div>
  );
}