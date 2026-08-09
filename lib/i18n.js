"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const dict = {
  fa: {
    dir: "rtl",
    brand: "Nuance Piano Academy",
    brandBy: "مانی فرزانه",
    navRegister: "ثبت‌نام هنرجو",
    navTeacher: "پنل استاد",
    navStudent: "پنل هنرجو",
    navLogin: "ورود",
    navLogout: "خروج",
    loginTitle: "ورود به سامانه",
    loginSub: "با شماره موبایل و رمز عبور خود وارد شوید",
    phone: "شماره موبایل",
    password: "رمز عبور",
    loginBtn: "ورود",
    loginError: "شماره موبایل یا رمز عبور اشتباه است",
    studentHint: "هنرجویان عزیز، شماره موبایل و کد اختصاصی که در پیامک دریافت کرده‌اید را وارد کنید.",
    step: "مرحله",
    of: "از",
    stepPersonal: "اطلاعات شخصی",
    stepMusic: "وضعیت موسیقی",
    stepGoal: "هدف و سبک",
    stepConfirm: "تأیید نهایی",
    fullName: "نام و نام خانوادگی",
    age: "سن",
    city: "شهر",
    playedBefore: "آیا قبلاً ساز زده‌اید؟",
    yes: "بله",
    no: "خیر",
    years: "چند سال سابقه دارید؟",
    level: "سطح نوازندگی",
    beginner: "مبتدی",
    intermediate: "متوسط",
    advanced: "پیشرفته",
    goal: "هدف از یادگیری پیانو",
    style: "سبک مورد علاقه",
    times: "زمان‌های مناسب کلاس",
    prev: "قبلی",
    next: "مرحله بعد",
    submit: "ثبت درخواست",
    submitted: "درخواست ثبت‌نام شما ثبت شد",
    submittedSub: "همکاران آموزشگاه طی ۲۴ ساعت آینده برای هماهنگی جلسه‌ی اول با شما تماس می‌گیرند.",
    newRequest: "ثبت درخواست جدید",
    statStudents: "هنرجویان فعال",
    statSessions: "جلسات این هفته",
    statCancelled: "جلسات لغو شده",
    statPractice: "گزارش تمرین جدید",
    calendarTitle: "تقویم کلاس‌ها",
    studentsTitle: "لیست هنرجویان",
    searchPlaceholder: "جستجوی نام هنرجو...",
    filterAll: "همه",
    remainingSessions: "جلسه باقی‌مانده",
    tabInfo: "اطلاعات",
    tabSchedule: "برنامه",
    tabPractice: "تمرین",
    tabFiles: "فایل‌ها",
    tabMessages: "پیام‌ها",
    held: "برگزار شده",
    cancelled: "لغو شده",
    scheduled: "برنامه‌ریزی شده",
    markHeld: "ثبت برگزار شد",
    markCancelled: "ثبت لغو شد",
    welcome: "سلام",
    mySchedule: "برنامه کلاس من",
    logPractice: "ثبت گزارش تمرین امروز",
    duration: "مدت زمان تمرین (دقیقه)",
    note: "توضیح تمرین امروز",
    optionalFile: "فایل صوتی یا ویدیو (اختیاری)",
    addFile: "افزودن فایل",
    logBtn: "ثبت گزارش",
    teacherFiles: "فایل‌های استاد",
    teacherMessages: "پیام‌های استاد",
    practiceHistory: "تاریخچه تمرین‌ها",
    send: "ارسال",
    loading: "در حال بارگذاری...",
    connectSheetNote: "داده‌ها از گوگل‌شیت متصل خوانده می‌شود.",
  },
  en: {
    dir: "ltr",
    brand: "Nuance Piano Academy",
    brandBy: "by Mani Farzaneh",
    navRegister: "Enroll",
    navTeacher: "Teacher Panel",
    navStudent: "Student Panel",
    navLogin: "Log in",
    navLogout: "Log out",
    loginTitle: "Sign in",
    loginSub: "Enter your phone number and password",
    phone: "Phone number",
    password: "Password",
    loginBtn: "Sign in",
    loginError: "Incorrect phone number or password",
    studentHint: "Students: use the phone number and code you received by SMS.",
    step: "Step",
    of: "of",
    stepPersonal: "Personal Info",
    stepMusic: "Music Background",
    stepGoal: "Goal & Style",
    stepConfirm: "Confirm",
    fullName: "Full name",
    age: "Age",
    city: "City",
    playedBefore: "Have you played before?",
    yes: "Yes",
    no: "No",
    years: "Years of experience",
    level: "Playing level",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    goal: "Goal for learning piano",
    style: "Preferred style",
    times: "Preferred class times",
    prev: "Back",
    next: "Next",
    submit: "Submit request",
    submitted: "Your enrollment request was submitted",
    submittedSub: "Our team will contact you within 24 hours to schedule your first session.",
    newRequest: "New request",
    statStudents: "Active students",
    statSessions: "Sessions this week",
    statCancelled: "Cancelled sessions",
    statPractice: "New practice logs",
    calendarTitle: "Class calendar",
    studentsTitle: "Students",
    searchPlaceholder: "Search student name...",
    filterAll: "All",
    remainingSessions: "sessions left",
    tabInfo: "Info",
    tabSchedule: "Schedule",
    tabPractice: "Practice",
    tabFiles: "Files",
    tabMessages: "Messages",
    held: "Held",
    cancelled: "Cancelled",
    scheduled: "Scheduled",
    markHeld: "Mark held",
    markCancelled: "Mark cancelled",
    welcome: "Hello",
    mySchedule: "My class schedule",
    logPractice: "Log today's practice",
    duration: "Practice duration (minutes)",
    note: "What did you practice today?",
    optionalFile: "Audio or video (optional)",
    addFile: "Add file",
    logBtn: "Submit log",
    teacherFiles: "Teacher's files",
    teacherMessages: "Messages from teacher",
    practiceHistory: "Practice history",
    send: "Send",
    loading: "Loading...",
    connectSheetNote: "Data is read live from the connected Google Sheet.",
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("fa");

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("npa-lang");
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = dict[lang].dir;
    document.body.classList.remove("lang-fa", "lang-en");
    document.body.classList.add(lang === "fa" ? "lang-fa" : "lang-en");
    localStorage.setItem("npa-lang", lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === "fa" ? "en" : "fa"));

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t: dict[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
