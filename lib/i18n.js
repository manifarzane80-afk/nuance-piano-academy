"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const dict = {
  fa: {
    dir: "rtl",

    brand: "آکادمی پیانو نوانس",
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
    passwordHint: "حداقل ۶ کاراکتر",

    loginBtn: "ورود",
    loginError: "شماره موبایل یا رمز عبور اشتباه است",

    step: "مرحله",
    of: "از",

    stepPersonal: "اطلاعات شخصی",
    stepMusic: "وضعیت موسیقی",
    stepGoal: "هدف و سبک",
    stepConfirm: "تأیید نهایی",

    fullName: "نام و نام خانوادگی",
    age: "سن",
    city: "شهر",
    email: "ایمیل",

    phoneOrEmailRequired:
      "حداقل یکی از شماره تلفن یا ایمیل باید وارد شود.",

    playedBefore:
      "آیا قبلاً ساز زده‌اید؟",

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

    classical: "کلاسیک",
    pop: "پاپ",
    jazz: "جاز",
    filmMusic: "موسیقی فیلم",
    iranianTraditional: "سنتی ایرانی",

    morning: "صبح",
    noon: "ظهر",
    evening: "عصر",
    night: "شب",
    weekend: "آخر هفته",

    prev: "قبلی",
    next: "مرحله بعد",
    submit: "ثبت درخواست",

    loading: "در حال بارگذاری...",

    success:
      "ثبت‌نام با موفقیت انجام شد",

    successSub:
      "حساب هنرجو ایجاد شد. از این پس می‌توانید با اطلاعات خود وارد شوید.",

    newRequest:
      "ثبت‌نام هنرجوی جدید",

    submitError:
      "خطا در ثبت‌نام",

    genericError:
      "خطایی رخ داده است",

    statStudents: "هنرجویان فعال",
    statSessions: "جلسات این هفته",
    statCancelled: "جلسات لغو شده",
    statPractice: "گزارش تمرین جدید",

    calendarTitle: "تقویم کلاس‌ها",
    studentsTitle: "لیست هنرجویان",

    searchPlaceholder:
      "جستجوی نام هنرجو...",

    filterAll: "همه",

    remainingSessions:
      "جلسه باقی‌مانده",

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

    mySchedule:
      "برنامه کلاس من",

    logPractice:
      "ثبت گزارش تمرین امروز",

    duration:
      "مدت زمان تمرین (دقیقه)",

    note:
      "توضیح تمرین امروز",

    optionalFile:
      "فایل صوتی یا ویدیو (اختیاری)",

    addFile:
      "افزودن فایل",

    logBtn:
      "ثبت گزارش",

    teacherFiles:
      "فایل‌های استاد",

    teacherMessages:
      "پیام‌های استاد",

    practiceHistory:
      "تاریخچه تمرین‌ها",

    send:
      "ارسال",

    connectSheetNote:
      "داده‌ها از گوگل‌شیت متصل خوانده می‌شود.",
  },  en: {
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
    passwordHint: "Minimum 6 characters",

    email: "Email",

    loginBtn: "Sign in",
    loginError: "Incorrect phone number or password",

    step: "Step",
    of: "of",

    stepPersonal: "Personal Info",
    stepMusic: "Music Background",
    stepGoal: "Goal & Style",
    stepConfirm: "Confirmation",

    fullName: "Full name",
    age: "Age",
    city: "City",

    phoneOrEmailRequired:
      "At least one phone number or email is required.",

    playedBefore:
      "Have you played an instrument before?",

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

    classical: "Classical",
    pop: "Pop",
    jazz: "Jazz",
    filmMusic: "Film Music",
    iranianTraditional: "Iranian Traditional",

    morning: "Morning",
    noon: "Noon",
    evening: "Evening",
    night: "Night",
    weekend: "Weekend",

    prev: "Back",
    next: "Next",
    submit: "Submit request",

    loading: "Loading...",

    success:
      "Registration completed successfully",

    successSub:
      "Your student account has been created. You can now log in with your information.",

    newRequest:
      "New student registration",

    submitError:
      "Registration failed",

    genericError:
      "Something went wrong",

    statStudents:
      "Active students",

    statSessions:
      "Sessions this week",

    statCancelled:
      "Cancelled sessions",

    statPractice:
      "New practice logs",

    calendarTitle:
      "Class Calendar",

    studentsTitle:
      "Students",

    searchPlaceholder:
      "Search student name...",

    filterAll:
      "All",

    remainingSessions:
      "sessions left",

    tabInfo:
      "Info",

    tabSchedule:
      "Schedule",

    tabPractice:
      "Practice",

    tabFiles:
      "Files",

    tabMessages:
      "Messages",

    held:
      "Held",

    cancelled:
      "Cancelled",

    scheduled:
      "Scheduled",

    markHeld:
      "Mark as held",

    markCancelled:
      "Mark as cancelled",

    welcome:
      "Hello",

    mySchedule:
      "My class schedule",

    logPractice:
      "Log today's practice",

    duration:
      "Practice duration (minutes)",

    note:
      "What did you practice today?",

    optionalFile:
      "Audio or video file (optional)",

    addFile:
      "Add file",

    logBtn:
      "Submit log",

    teacherFiles:
      "Teacher files",

    teacherMessages:
      "Teacher messages",

    practiceHistory:
      "Practice history",

    send:
      "Send",

    connectSheetNote:
      "Data is read live from the connected Google Sheet.",
  },
};


const LangContext = createContext(null);


export function LangProvider({ children }) {
  const [lang, setLang] = useState("fa");

  useEffect(() => {
    const saved =
      localStorage.getItem("npa-lang");

    if (saved) {
      setLang(saved);
    }
  }, []);


  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir =
      dict[lang].dir;

    document.body.classList.remove(
      "lang-fa",
      "lang-en"
    );

    document.body.classList.add(
      lang === "fa"
        ? "lang-fa"
        : "lang-en"
    );

    localStorage.setItem(
      "npa-lang",
      lang
    );
  }, [lang]);


  const toggle = () => {
    setLang((l) =>
      l === "fa" ? "en" : "fa"
    );
  };


  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
        toggle,
        t: dict[lang],
      }}
    >
      {children}
    </LangContext.Provider>
  );
}


export function useLang() {
  const ctx = useContext(LangContext);

  if (!ctx) {
    throw new Error(
      "useLang must be used within LangProvider"
    );
  }

  return ctx;
}