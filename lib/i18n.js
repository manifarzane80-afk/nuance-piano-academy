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

    styles: [
      "کلاسیک",
      "پاپ",
      "جاز",
      "موسیقی فیلم",
      "سنتی ایرانی"
    ],

    timesList: [
      "صبح",
      "ظهر",
      "عصر",
      "شب",
      "آخر هفته"
    ],

    prev: "قبلی",
    next: "مرحله بعد",
    submit: "ثبت درخواست",

    submitted: "ثبت‌نام با موفقیت انجام شد",
    submittedSub:
      "حساب هنرجو ایجاد شد. اکنون می‌توانید با شماره تلفن یا ایمیل و رمز عبور وارد شوید.",

    newRequest: "ثبت‌نام هنرجوی جدید",

    loading: "در حال بارگذاری...",

    backHome: "بازگشت به صفحه اصلی"
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

    step: "Step",
    of: "of",

    stepPersonal: "Personal Info",
    stepMusic: "Music Background",
    stepGoal: "Goal & Style",
    stepConfirm: "Confirm",

    fullName: "Full name",
    age: "Age",
    city: "City",

    playedBefore: "Have you played an instrument before?",
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

    styles: [
      "Classical",
      "Pop",
      "Jazz",
      "Film Music",
      "Traditional Persian"
    ],

    timesList: [
      "Morning",
      "Noon",
      "Afternoon",
      "Night",
      "Weekend"
    ],

    prev: "Back",
    next: "Next",
    submit: "Submit request",

    submitted: "Registration completed successfully",

    submittedSub:
      "Student account created. You can now log in using your phone/email and password.",

    newRequest: "Register another student",

    loading: "Loading...",

    backHome: "Back to home"
  }
};


const LangContext = createContext(null);


export function LangProvider({ children }) {

  const [lang, setLang] = useState("fa");


  useEffect(() => {

    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("npa-lang")
        : null;

    if (saved) {
      setLang(saved);
    }

  }, []);



  useEffect(() => {

    if (typeof document === "undefined") return;


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

    setLang(
      (l) =>
        l === "fa"
          ? "en"
          : "fa"
    );

  };



  return (

    <LangContext.Provider
      value={{
        lang,
        setLang,
        toggle,
        t: dict[lang]
      }}
    >

      {children}

    </LangContext.Provider>

  );

}



export function useLang() {

  const ctx = useContext(
    LangContext
  );


  if (!ctx) {

    throw new Error(
      "useLang must be used within LangProvider"
    );

  }


  return ctx;

}