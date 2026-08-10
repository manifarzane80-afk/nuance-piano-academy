"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const dict = {
  fa: {
    dir: "rtl",

    brand: "آکادمی پیانو نوانس",
    brandBy: "مانی فرزانه",

    home: "خانه",
    navRegister: "ثبت‌نام هنرجو",
    navLogin: "ورود",
    navLogout: "خروج",
    navTeacher: "پنل استاد",
    navStudent: "پنل هنرجو",

    loginTitle: "ورود به سامانه",
    loginSub: "با شماره موبایل و رمز عبور وارد شوید",

    password: "رمز عبور",
    phone: "شماره موبایل",

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

    playedBefore: "آیا قبلاً پیانو زده‌اید؟",
    yes: "بله",
    no: "خیر",

    years: "چند سال سابقه دارید؟",

    level: "سطح نوازندگی",
    beginner: "مبتدی",
    intermediate: "متوسط",
    advanced: "پیشرفته",

    goal: "هدف از یادگیری پیانو",
    style: "سبک مورد علاقه",
    times: "زمان مناسب کلاس",

    classic: "کلاسیک",
    pop: "پاپ",
    jazz: "جاز",
    movie: "موسیقی فیلم",
    iranian: "سنتی ایرانی",

    morning: "صبح",
    noon: "ظهر",
    evening: "عصر",
    night: "شب",
    weekend: "آخر هفته",

    prev: "قبلی",
    next: "مرحله بعد",
    submit: "ثبت درخواست",

    success: "ثبت‌نام با موفقیت انجام شد",
    newRequest: "ثبت‌نام هنرجوی جدید",

    loading: "در حال بارگذاری...",
  },


  en: {
    dir: "ltr",

    brand: "Nuance Piano Academy",
    brandBy: "by Mani Farzaneh",

    home: "Home",
    navRegister: "Enroll",
    navLogin: "Log in",
    navLogout: "Log out",
    navTeacher: "Teacher Panel",
    navStudent: "Student Panel",

    loginTitle: "Sign in",
    loginSub: "Enter your phone number and password",

    password: "Password",
    phone: "Phone number",

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
    email: "Email",

    playedBefore: "Have you played piano before?",
    yes: "Yes",
    no: "No",

    years: "Years of experience",

    level: "Playing level",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",

    goal: "Learning goal",
    style: "Preferred style",
    times: "Preferred class time",

    classic: "Classical",
    pop: "Pop",
    jazz: "Jazz",
    movie: "Film music",
    iranian: "Traditional Persian",

    morning: "Morning",
    noon: "Noon",
    evening: "Evening",
    night: "Night",
    weekend: "Weekend",

    prev: "Back",
    next: "Next",
    submit: "Submit request",

    success: "Registration completed successfully",
    newRequest: "New student registration",

    loading: "Loading...",
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

    setLang((old) =>
      old === "fa"
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
        t: dict[lang],
      }}
    >
      {children}
    </LangContext.Provider>
  );
}



export function useLang(){

  const ctx = useContext(
    LangContext
  );


  if(!ctx){
    throw new Error(
      "useLang must be inside LangProvider"
    );
  }


  return ctx;

}