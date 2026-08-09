"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Users,
  CalendarDays,
  XCircle,
  ClipboardList,
  Search,
  ChevronDown,
  ChevronLeft,
  CheckCircle2,
  Clock3,
  TrendingUp,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import { useLang } from "@/lib/i18n";

function Avatar({ name, size = 44 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: "rgba(198,161,91,.15)",
        border: "1px solid rgba(198,161,91,.4)",
        color: "var(--gold-bright)",
      }}
    >
      {name?.[0] || "؟"}
    </div>
  );
}

function SectionTitle({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2.5">
        <div
          className="w-[36px] h-[36px] rounded-[11px] flex items-center justify-center border border-gold/40"
          style={{
            background: "rgba(198,161,91,.12)",
          }}
        >
          <Icon
            size={18}
            style={{
              color: "var(--gold-bright)",
            }}
          />
        </div>

        <div>
          <h2 className="font-bold text-[15px]">
            {title}
          </h2>

          {sub && (
            <div className="text-[10.5px] text-inkdim mt-0.5">
              {sub}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyNote({ text = "موردی ثبت نشده است." }) {
  return (
    <div className="npa-card p-5 text-center text-[12px] text-inkdim">
      {text}
    </div>
  );
}

export default function TeacherDashboard() {
  const { t } = useLang();

  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [logs, setLogs] = useState([]);

  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState(
    t.filterAll || "همه"
  );

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const [studentsRes, sessionsRes, logsRes] =
        await Promise.all([
          fetch("/api/students", {
            cache: "no-store",
          }).then((r) => r.json()),

          fetch("/api/sessions", {
            cache: "no-store",
          }).then((r) => r.json()),

          fetch("/api/practice-logs", {
            cache: "no-store",
          }).then((r) => r.json()),
        ]);

      setStudents(
        Array.isArray(studentsRes.students)
          ? studentsRes.students
          : []
      );

      setSessions(
        Array.isArray(sessionsRes.sessions)
          ? sessionsRes.sessions
          : []
      );

      setLogs(
        Array.isArray(logsRes.logs)
          ? logsRes.logs
          : []
      );
    } catch (error) {
      console.error(
        "Teacher dashboard error:",
        error
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const levels = [
    t.filterAll || "همه",
    t.beginner || "مبتدی",
    t.intermediate || "متوسط",
    t.advanced || "پیشرفته",
  ];

  const filteredStudents = useMemo(() => {
    const search = query.trim().toLowerCase();

    return students.filter((student) => {
      const name = String(
        student.fullName || ""
      ).toLowerCase();

      const phone = String(
        student.phone || ""
      ).toLowerCase();

      const email = String(
        student.email || ""
      ).toLowerCase();

      const matchesSearch =
        !search ||
        name.includes(search) ||
        phone.includes(search) ||
        email.includes(search);

      const matchesLevel =
        levelFilter === (t.filterAll || "همه") ||
        student.level === levelFilter;

      return matchesSearch && matchesLevel;
    });
  }, [
    students,
    query,
    levelFilter,
    t.filterAll,
  ]);

  const plannedSessions = sessions.filter(
    (s) => s.status === "برنامه‌ریزی شده"
  );

  const heldSessions = sessions.filter(
    (s) => s.status === "برگزار شده"
  );

  const cancelledSessions = sessions.filter(
    (s) => s.status === "لغو شده"
  );

  const stats = [
    {
      label: t.statStudents || "هنرجوها",
      value: students.length,
      icon: Users,
    },
    {
      label: "جلسات برنامه‌ریزی‌شده",
      value: plannedSessions.length,
      icon: CalendarDays,
    },
    {
      label: t.statPractice || "تمرین‌ها",
      value: logs.length,
      icon: ClipboardList,
    },
    {
      label: t.statCancelled || "لغوشده",
      value: cancelledSessions.length,
      icon: XCircle,
    },
  ];

  const setStatus = async (id, status) => {
    setSessions((previous) =>
      previous.map((session) =>
        session.id === id
          ? { ...session, status }
          : session
      )
    );

    try {
      const response = await fetch(
        "/api/sessions",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Session update failed"
        );
      }
    } catch (error) {
      console.error(error);
      await loadDashboard(true);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-inkdim">
        {t.loading || "در حال بارگذاری..."}
      </div>
    );
  }

  return (
    <div className="fade-in flex flex-col gap-6">

      {/* Welcome */}
      <div
        className="npa-card p-5"
        style={{
          background:
            "linear-gradient(145deg, rgba(198,161,91,.16), rgba(198,161,91,.04))",
        }}
      >
        <div className="flex items-center gap-3">

          <div
            className="w-12 h-12 rounded-full flex items-center justify-center border border-gold"
            style={{
              background:
                "rgba(198,161,91,.12)",
            }}
          >
            <GraduationCap
              size={23}
              style={{
                color:
                  "var(--gold-bright)",
              }}
            />
          </div>

          <div className="flex-1">
            <div className="text-[11px] text-inkdim">
              Nuance Piano Academy
            </div>

            <h1 className="text-lg font-bold mt-0.5">
              خوش آمدید، مانی 👋
            </h1>

            <div className="text-[11.5px] text-inkdim mt-1">
              مدیریت هنرجوها و جلسات
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              loadDashboard(true)
            }
            className="npa-btn-ghost !p-2"
            title="بروزرسانی"
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />
          </button>

        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2.5">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="npa-card p-4"
          >
            <div className="flex items-center justify-between">

              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                style={{
                  background:
                    "rgba(198,161,91,.11)",
                }}
              >
                <stat.icon
                  size={17}
                  style={{
                    color:
                      "var(--gold-bright)",
                  }}
                />
              </div>

              <TrendingUp
                size={14}
                className="text-inkdim"
              />

            </div>

            <div className="text-2xl font-bold mt-3">
              {stat.value}
            </div>

            <div className="text-[11px] text-inkdim mt-1">
              {stat.label}
            </div>
          </div>
        ))}

      </div>

      {/* Session overview */}
      <div>
        <SectionTitle
          icon={CalendarDays}
          title="وضعیت جلسات"
          sub={`${sessions.length} جلسه`}
        />

        <div className="grid grid-cols-3 gap-2">

          <div className="npa-card p-3 text-center">
            <Clock3
              size={17}
              className="mx-auto text-gold"
            />

            <div className="font-bold text-lg mt-1">
              {plannedSessions.length}
            </div>

            <div className="text-[10.5px] text-inkdim">
              برنامه‌ریزی‌شده
            </div>
          </div>

          <div className="npa-card p-3 text-center">
            <CheckCircle2
              size={17}
              className="mx-auto"
              style={{
                color: "var(--sage)",
              }}
            />

            <div className="font-bold text-lg mt-1">
              {heldSessions.length}
            </div>

            <div className="text-[10.5px] text-inkdim">
              برگزارشده
            </div>
          </div>

          <div className="npa-card p-3 text-center">
            <XCircle
              size={17}
              className="mx-auto"
              style={{
                color: "var(--clay)",
              }}
            />

            <div className="font-bold text-lg mt-1">
              {cancelledSessions.length}
            </div>

            <div className="text-[10.5px] text-inkdim">
              لغوشده
            </div>
          </div>

        </div>
      </div>

      {/* Sessions */}
      <div>
        <SectionTitle
          icon={CalendarDays}
          title={
            t.calendarTitle ||
            "جلسات"
          }
        />

        <div className="flex flex-col gap-2">

          {sessions.map((session) => {

            const student =
              students.find(
                (item) =>
                  String(item.id) ===
                  String(session.studentId)
              );

            return (
              <div
                key={session.id}
                className="npa-card p-3"
              >

                <div className="flex items-center gap-2.5">

                  <Avatar
                    name={
                      student?.fullName
                    }
                    size={38}
                  />

                  <div className="flex-1 min-w-0">

                    <div className="font-semibold text-[13px] truncate">
                      {student?.fullName ||
                        "هنرجوی نامشخص"}
                    </div>

                    <div className="text-[11px] text-inkdim mt-1">
                      {session.date} ·{" "}
                      {session.time}
                    </div>

                  </div>

                  {session.status !==
                    "برنامه‌ریزی شده" && (
                    <span
                      className={`npa-chip ${
                        session.status ===
                        "برگزار شده"
                          ? "sage"
                          : "clay"
                      }`}
                    >
                      {session.status}
                    </span>
                  )}

                </div>

                {session.status ===
                  "برنامه‌ریزی شده" && (
                  <div className="flex gap-2 mt-3">

                    <button
                      type="button"
                      className="npa-btn-ghost flex-1 justify-center text-[11px]"
                      onClick={() =>
                        setStatus(
                          session.id,
                          "برگزار شده"
                        )
                      }
                    >
                      <CheckCircle2
                        size={14}
                      />
                      برگزار شد
                    </button>

                    <button
                      type="button"
                      className="npa-btn-ghost flex-1 justify-center text-[11px]"
                      onClick={() =>
                        setStatus(
                          session.id,
                          "لغو شده"
                        )
                      }
                    >
                      <XCircle size={14} />
                      لغو جلسه
                    </button>

                  </div>
                )}

              </div>
            );
          })}

          {sessions.length === 0 && (
            <EmptyNote text="هنوز جلسه‌ای ثبت نشده است." />
          )}

        </div>
      </div>

      {/* Students */}
      <div>

        <SectionTitle
          icon={Users}
          title={
            t.studentsTitle ||
            "هنرجوها"
          }
          sub={`${filteredStudents.length} هنرجو`}
        />

        <div className="flex gap-2 mb-3">

          <div className="relative flex-1">

            <Search
              size={15}
              className="absolute right-3 top-[13px] text-inkdim"
            />

            <input
              className="npa-input pr-9"
              placeholder={
                t.searchPlaceholder ||
                "جستجوی هنرجو..."
              }
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
            />

          </div>

          <div className="relative">

            <select
              className="npa-input appearance-none pl-7 min-w-[105px]"
              value={levelFilter}
              onChange={(event) =>
                setLevelFilter(
                  event.target.value
                )
              }
            >
              {levels.map((level) => (
                <option
                  key={level}
                  value={level}
                >
                  {level}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="absolute left-2.5 top-[14px] text-inkdim pointer-events-none"
            />

          </div>

        </div>

        <div className="flex flex-col gap-2">

          {filteredStudents.map(
            (student) => (
              <Link
                key={student.id}
                href={`/teacher/students/${student.id}`}
                className="npa-card p-3 flex items-center gap-2.5"
              >

                <Avatar
                  name={
                    student.fullName
                  }
                />

                <div className="flex-1 min-w-0">

                  <div className="text-[13.5px] font-bold truncate">
                    {student.fullName ||
                      "—"}
                  </div>

                  <div className="text-[11px] text-inkdim mt-1">
                    {student.city ||
                      "—"}{" "}
                    ·{" "}
                    {student.remainingSessions ||
                      0}{" "}
                    جلسه باقی‌مانده
                  </div>

                </div>

                <div className="flex items-center gap-1.5">

                  <span className="npa-chip gold">
                    {student.level ||
                      "—"}
                  </span>

                  <ChevronLeft
                    size={15}
                    className="text-inkdim"
                  />

                </div>

              </Link>
            )
          )}

          {filteredStudents.length ===
            0 && (
            <EmptyNote
              text={
                query
                  ? "هنرجویی با این مشخصات پیدا نشد."
                  : "هنوز هنرجویی ثبت نشده است."
              }
            />
          )}

        </div>

      </div>

      {/* Recent practice */}
      <div>

        <SectionTitle
          icon={ClipboardList}
          title="آخرین تمرین‌ها"
          sub={`${logs.length} ثبت تمرین`}
        />

        <div className="flex flex-col gap-2">

          {logs
            .slice()
            .reverse()
            .slice(0, 5)
            .map((log) => {

              const student =
                students.find(
                  (item) =>
                    String(item.id) ===
                    String(
                      log.studentId
                    )
                );

              return (
                <div
                  key={log.id}
                  className="npa-card p-3 flex items-start gap-2.5"
                >

                  <Avatar
                    name={
                      student?.fullName
                    }
                    size={36}
                  />

                  <div className="flex-1 min-w-0">

                    <div className="font-semibold text-[12.5px]">
                      {student?.fullName ||
                        "هنرجو"}
                    </div>

                    <div className="text-[11px] text-inkdim mt-1">
                      {log.note ||
                        "بدون یادداشت"}
                    </div>

                  </div>

                  <span className="npa-chip gold">
                    {log.duration ||
                      "—"}
                  </span>

                </div>
              );
            })}

          {logs.length === 0 && (
            <EmptyNote text="هنوز تمرینی ثبت نشده است." />
          )}

        </div>

      </div>

      <div className="text-[10.5px] text-inkdim text-center pt-1">
        اطلاعات این داشبورد از Google Sheets دریافت می‌شود.
      </div>

    </div>
  );
}