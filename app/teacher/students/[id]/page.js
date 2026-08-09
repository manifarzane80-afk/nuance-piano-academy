"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  User,
  Calendar,
  ClipboardList,
  FileText,
  MessageSquare,
  ArrowRight,
  Send,
  Download,
  Plus,
  Save,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import DatePicker, {
  DateObject,
} from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import { useLang } from "@/lib/i18n";

export default function TeacherStudentProfile() {
  const { t, lang } = useLang();
  const { id } = useParams();
  const router = useRouter();

  const isPersian = lang === "fa";

  const [data, setData] = useState(null);
  const [tab, setTab] = useState("info");

  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);

  const [showSessionForm, setShowSessionForm] =
    useState(false);

  const [sessionDate, setSessionDate] =
    useState(null);

  const [sessionTime, setSessionTime] =
    useState("");

  const [sessionStatus, setSessionStatus] =
    useState("برنامه‌ریزی شده");

  const [savingSession, setSavingSession] =
    useState(false);

  const load = async () => {
    try {
      const res = await fetch(
        `/api/students/${id}`,
        {
          cache: "no-store",
        }
      );

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(
        "Student profile error:",
        error
      );

      setData({
        error:
          "خطا در دریافت اطلاعات هنرجو",
      });
    }
  };

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  /*
   * تبدیل تاریخ انتخاب‌شده به تاریخ میلادی استاندارد
   * برای ذخیره در Google Sheets
   */
  const getGregorianDate = () => {
    if (!sessionDate) return "";

    try {
      const dateObject =
        sessionDate instanceof DateObject
          ? sessionDate
          : new DateObject(sessionDate);

      return dateObject
        .convert(gregorian)
        .format("YYYY-MM-DD");
    } catch (error) {
      console.error(
        "Date conversion error:",
        error
      );

      return "";
    }
  };

  const sendMessage = async () => {
    if (!msg.trim() || sending) return;

    try {
      setSending(true);

      const res = await fetch(
        "/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            studentId: id,
            text: msg.trim(),
          }),
        }
      );

      const result = await res.json();

      if (!res.ok || result.error) {
        throw new Error(
          result.error ||
            "ارسال پیام انجام نشد"
        );
      }

      setMsg("");
      await load();
    } catch (error) {
      console.error(
        "Send message error:",
        error
      );
    } finally {
      setSending(false);
    }
  };

  const createSession = async () => {
    const normalizedDate =
      getGregorianDate();

    if (
      !normalizedDate ||
      !sessionTime ||
      savingSession
    ) {
      return;
    }

    try {
      setSavingSession(true);

      const res = await fetch(
        "/api/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            studentId: id,
            date: normalizedDate,
            time: sessionTime,
            status: sessionStatus,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok || result.error) {
        throw new Error(
          result.error ||
            "ثبت جلسه انجام نشد"
        );
      }

      setSessionDate(null);
      setSessionTime("");
      setSessionStatus(
        "برنامه‌ریزی شده"
      );
      setShowSessionForm(false);

      await load();
    } catch (error) {
      console.error(
        "Create session error:",
        error
      );
    } finally {
      setSavingSession(false);
    }
  };

  if (!data) {
    return (
      <div className="text-center py-10 text-inkdim">
        {t.loading ||
          "در حال بارگذاری..."}
      </div>
    );
  }

  if (data.error) {
    return (
      <div
        className="text-center text-sm py-10"
        style={{
          color: "var(--clay)",
        }}
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

  const tabs = [
    [
      "info",
      t.tabInfo || "اطلاعات",
      User,
    ],
    [
      "schedule",
      t.tabSchedule || "جلسات",
      Calendar,
    ],
    [
      "practice",
      t.tabPractice ||
        "تمرین‌ها",
      ClipboardList,
    ],
    [
      "files",
      t.tabFiles || "فایل‌ها",
      FileText,
    ],
    [
      "messages",
      t.tabMessages ||
        "پیام‌ها",
      MessageSquare,
    ],
  ];

  const upcomingSessions =
    sessions.filter(
      (s) =>
        s.status ===
        "برنامه‌ریزی شده"
    ).length;

  const heldSessions =
    sessions.filter(
      (s) =>
        s.status ===
        "برگزار شده"
    ).length;

  const cancelledSessions =
    sessions.filter(
      (s) =>
        s.status ===
        "لغو شده"
    ).length;

  return (
    <div className="flex flex-col gap-4">

      {/* Back */}
      <button
        type="button"
        onClick={() =>
          router.push("/teacher")
        }
        className="npa-btn-ghost w-fit"
      >
        <ArrowRight size={15} />
        {t.studentsTitle ||
          "هنرجوها"}
      </button>

      {/* Student Header */}
      <div className="npa-card p-5">
        <div className="flex items-center gap-3">

          <div
            className="w-[58px] h-[58px] rounded-full flex items-center justify-center font-bold text-[20px] shrink-0"
            style={{
              background:
                "rgba(198,161,91,.15)",
              border:
                "1px solid rgba(198,161,91,.4)",
              color:
                "var(--gold-bright)",
            }}
          >
            {student.fullName?.[0] ||
              "؟"}
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-bold text-[17px] truncate">
              {student.fullName ||
                "هنرجو"}
            </div>

            <div className="text-[12px] text-inkdim mt-1">
              {student.city || "—"}

              {student.level
                ? ` · ${student.level}`
                : ""}
            </div>
          </div>

          <div className="npa-chip gold">
            {student.remainingSessions ||
              0}{" "}
            {t.remainingSessions ||
              "جلسه باقی‌مانده"}
          </div>

        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">

        <div className="npa-card p-3 text-center">
          <Clock3
            size={17}
            className="mx-auto mb-1 text-gold"
          />

          <div className="font-bold text-[16px]">
            {upcomingSessions}
          </div>

          <div className="text-[10.5px] text-inkdim">
            برنامه‌ریزی شده
          </div>
        </div>

        <div className="npa-card p-3 text-center">
          <CheckCircle2
            size={17}
            className="mx-auto mb-1"
            style={{
              color:
                "var(--sage)",
            }}
          />

          <div className="font-bold text-[16px]">
            {heldSessions}
          </div>

          <div className="text-[10.5px] text-inkdim">
            برگزار شده
          </div>
        </div>

        <div className="npa-card p-3 text-center">
          <XCircle
            size={17}
            className="mx-auto mb-1"
            style={{
              color:
                "var(--clay)",
            }}
          />

          <div className="font-bold text-[16px]">
            {cancelledSessions}
          </div>

          <div className="text-[10.5px] text-inkdim">
            لغو شده
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto npa-scroll">

        {tabs.map(
          ([
            tabId,
            label,
            Icon,
          ]) => (
            <button
              key={tabId}
              type="button"
              className={`npa-tab whitespace-nowrap min-w-[76px] ${
                tab === tabId
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setTab(tabId)
              }
            >
              <Icon size={13} />
              {label}
            </button>
          )
        )}

      </div>

      {/* INFO */}
      {tab === "info" && (
        <div className="npa-card p-4">

          <div className="text-[14px] font-bold mb-3">
            اطلاعات هنرجو
          </div>

          <div className="flex flex-col">

            {[
              [
                t.phone ||
                  "شماره تماس",
                student.phone,
              ],
              [
                t.email ||
                  "ایمیل",
                student.email,
              ],
              [
                t.level ||
                  "سطح",
                student.level,
              ],
              [
                t.goal ||
                  "هدف",
                student.goal,
              ],
              [
                t.style ||
                  "سبک",
                student.style,
              ],
              [
                t.times ||
                  "زمان‌های مناسب",
                student.times,
              ],
              [
                "سن",
                student.age,
              ],
              [
                "شهر",
                student.city,
              ],
            ]
              .filter(
                ([, value]) =>
                  value
              )
              .map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 py-2.5 border-b border-dashed border-line text-[13px]"
                  >
                    <span className="text-inkdim">
                      {label}
                    </span>

                    <span className="font-semibold text-left">
                      {value}
                    </span>
                  </div>
                )
              )}

          </div>
        </div>
      )}

      {/* SCHEDULE */}
      {tab === "schedule" && (
        <div className="flex flex-col gap-3">

          <button
            type="button"
            className="npa-btn-gold w-full justify-center"
            onClick={() =>
              setShowSessionForm(
                !showSessionForm
              )
            }
          >
            <Plus size={16} />

            {showSessionForm
              ? "بستن فرم"
              : "ثبت جلسه جدید"}
          </button>

          {/* New Session Form */}
          {showSessionForm && (
            <div className="npa-card p-4 flex flex-col gap-3">

              <div>
                <div className="font-bold text-[14px]">
                  ثبت جلسه جدید
                </div>

                <div className="text-[11.5px] text-inkdim mt-1">
                  برای{" "}
                  {student.fullName}
                </div>
              </div>

              {/* DATE PICKER */}
              <div>
                <label className="text-[11.5px] text-inkdim block mb-1.5">
                  {isPersian
                    ? "تاریخ جلسه"
                    : "Session date"}
                </label>

                <DatePicker
                  value={sessionDate}
                  onChange={setSessionDate}
                  calendar={
                    isPersian
                      ? persian
                      : gregorian
                  }
                  locale={
                    isPersian
                      ? persian_fa
                      : gregorian_en
                  }
                  calendarPosition="bottom-right"
                  format={
                    isPersian
                      ? "YYYY/MM/DD"
                      : "YYYY/MM/DD"
                  }
                  inputClass="npa-input w-full"
                  placeholder={
                    isPersian
                      ? "انتخاب تاریخ"
                      : "Select date"
                  }
                  editable={false}
                  portal
                />

                <div className="text-[10.5px] text-inkdim mt-1.5">
                  {isPersian
                    ? "تقویم شمسی"
                    : "Gregorian calendar"}
                </div>
              </div>

              {/* TIME */}
              <div>
                <label className="text-[11.5px] text-inkdim block mb-1.5">
                  {isPersian
                    ? "ساعت جلسه"
                    : "Session time"}
                </label>

                <input
                  type="time"
                  className="npa-input"
                  value={sessionTime}
                  onChange={(e) =>
                    setSessionTime(
                      e.target.value
                    )
                  }
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="text-[11.5px] text-inkdim block mb-1.5">
                  {isPersian
                    ? "وضعیت جلسه"
                    : "Session status"}
                </label>

                <select
                  className="npa-input"
                  value={
                    sessionStatus
                  }
                  onChange={(e) =>
                    setSessionStatus(
                      e.target.value
                    )
                  }
                >
                  <option value="برنامه‌ریزی شده">
                    {isPersian
                      ? "برنامه‌ریزی شده"
                      : "Scheduled"}
                  </option>

                  <option value="برگزار شده">
                    {isPersian
                      ? "برگزار شده"
                      : "Held"}
                  </option>

                  <option value="لغو شده">
                    {isPersian
                      ? "لغو شده"
                      : "Cancelled"}
                  </option>
                </select>
              </div>

              {/* SAVE */}
              <button
                type="button"
                className="npa-btn-gold w-full justify-center"
                disabled={
                  !sessionDate ||
                  !sessionTime ||
                  savingSession
                }
                onClick={
                  createSession
                }
              >
                <Save size={15} />

                {savingSession
                  ? isPersian
                    ? "در حال ثبت..."
                    : "Saving..."
                  : isPersian
                  ? "ثبت جلسه"
                  : "Save session"}
              </button>

            </div>
          )}

          {/* Remaining Sessions */}
          <div className="npa-card p-4">
            <div className="flex items-center justify-between">

              <div>
                <div className="text-[11.5px] text-inkdim">
                  {isPersian
                    ? "جلسات باقی‌مانده"
                    : "Remaining sessions"}
                </div>

                <div className="text-[24px] font-bold mt-1">
                  {student.remainingSessions ||
                    0}
                </div>
              </div>

              <Calendar
                size={25}
                className="text-gold"
              />

            </div>
          </div>

          {/* Sessions */}
          <div className="flex flex-col gap-2">

            {sessions.map(
              (s) => (
                <div
                  key={s.id}
                  className="npa-card p-3 flex items-center gap-3"
                >

                  <div
                    className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0"
                    style={{
                      background:
                        "rgba(198,161,91,.12)",
                    }}
                  >
                    <Calendar
                      size={17}
                      className="text-gold"
                    />
                  </div>

                  <div className="flex-1">

                    <div className="font-semibold text-[13px]">
                      {formatDisplayDate(
                        s.date,
                        isPersian
                      )}
                    </div>

                    <div className="text-[11.5px] text-inkdim mt-0.5">
                      {s.time ||
                        "—"}
                    </div>

                  </div>

                  <span
                    className={`npa-chip ${
                      s.status ===
                      "برگزار شده"
                        ? "sage"
                        : s.status ===
                          "لغو شده"
                        ? "clay"
                        : "gold"
                    }`}
                  >
                    {s.status ||
                      "برنامه‌ریزی شده"}
                  </span>

                </div>
              )
            )}

            {sessions.length ===
              0 && (
              <div className="npa-card p-5 text-center text-[12.5px] text-inkdim">
                {isPersian
                  ? "هنوز جلسه‌ای ثبت نشده است."
                  : "No sessions yet."}
              </div>
            )}

          </div>
        </div>
      )}

      {/* PRACTICE */}
      {tab === "practice" && (
        <div className="flex flex-col gap-2">

          {logs.map(
            (l) => (
              <div
                key={l.id}
                className="npa-card p-3"
              >

                <div className="flex justify-between gap-2 mb-1">

                  <span className="font-bold text-[13px]">
                    {formatDisplayDate(
                      l.date,
                      isPersian
                    )}
                  </span>

                  <span className="npa-chip gold">
                    {l.duration ||
                      "—"}
                  </span>

                </div>

                <div className="text-[12.5px] text-inkdim">
                  {l.note ||
                    "بدون یادداشت"}
                </div>

              </div>
            )
          )}

          {logs.length ===
            0 && (
            <div className="npa-card p-5 text-center text-[12.5px] text-inkdim">
              {isPersian
                ? "هنوز تمرینی ثبت نشده است."
                : "No practice records yet."}
            </div>
          )}

        </div>
      )}

      {/* FILES */}
      {tab === "files" && (
        <div className="flex flex-col gap-2">

          {files.map(
            (f) => (
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
                  {f.name ||
                    "فایل آموزشی"}
                </div>

                <Download
                  size={16}
                  className="text-inkdim"
                />

              </a>
            )
          )}

          {files.length ===
            0 && (
            <div className="npa-card p-5 text-center text-[12.5px] text-inkdim">
              {isPersian
                ? "هنوز فایلی برای این هنرجو ثبت نشده است."
                : "No files yet."}
            </div>
          )}

        </div>
      )}

      {/* MESSAGES */}
      {tab === "messages" && (
        <div className="flex flex-col gap-2">

          {messages.map(
            (m) => (
              <div
                key={m.id}
                className="npa-card p-3"
              >

                <div className="text-[13px] leading-6">
                  {m.text}
                </div>

                <div className="text-[11px] text-inkdim mt-1.5">
                  {m.from ||
                    (isPersian
                      ? "استاد"
                      : "Teacher")}{" "}
                  ·{" "}
                  {m.time || ""}
                </div>

              </div>
            )
          )}

          {messages.length ===
            0 && (
            <div className="npa-card p-5 text-center text-[12.5px] text-inkdim">
              {isPersian
                ? "هنوز پیامی ثبت نشده است."
                : "No messages yet."}
            </div>
          )}

          <div className="npa-card p-3 mt-1">

            <div className="text-[12px] text-inkdim mb-2">
              {isPersian
                ? "ارسال پیام به هنرجو"
                : "Send message"}
            </div>

            <div className="flex gap-2">

              <input
                className="npa-input"
                placeholder={
                  isPersian
                    ? "پیام خود را بنویسید..."
                    : "Write a message..."
                }
                value={msg}
                onChange={(e) =>
                  setMsg(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                      "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />

              <button
                type="button"
                className="npa-btn-gold px-4 shrink-0"
                disabled={
                  !msg.trim() ||
                  sending
                }
                onClick={
                  sendMessage
                }
              >
                {sending ? (
                  "..."
                ) : (
                  <Send size={15} />
                )}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

/*
 * نمایش تاریخ‌های ذخیره‌شده
 *
 * اگر تاریخ در شیت به شکل:
 * 2026-08-10
 *
 * باشد:
 *
 * فارسی → 1405/05/19
 * انگلیسی → 2026/08/10
 */
function formatDisplayDate(
  value,
  isPersian
) {
  if (!value) return "—";

  try {
    const dateObject =
      new DateObject({
        date: value,
        calendar: gregorian,
        locale: gregorian_en,
      });

    if (isPersian) {
      return dateObject
        .convert(persian)
        .format("YYYY/MM/DD");
    }

    return dateObject
      .convert(gregorian)
      .format("YYYY/MM/DD");
  } catch {
    return value;
  }
}