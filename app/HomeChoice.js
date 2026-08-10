"use client";

import Link from "next/link";
import {
  Piano,
  LogIn,
  Sparkles,
  GraduationCap,
  Music2,
  Trophy,
} from "lucide-react";

import { useLang } from "@/lib/i18n";

export default function HomeChoice() {
  const { t } = useLang();

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">

      <div className="max-w-5xl text-center">

        <div
          className="
          npa-glow w-32 h-32 rounded-full mx-auto mb-8
          flex items-center justify-center
          border border-gold
          bg-[rgba(198,161,91,.12)]
          npa-float
          "
        >
          <Piano size={55} className="text-goldbright" />
        </div>


        <div className="flex justify-center items-center gap-2 text-goldbright mb-5">
          <Sparkles size={18} />
          <span className="tracking-widest text-sm">
            NUANCE PIANO ACADEMY
          </span>
        </div>


        <h1 className="npa-title text-5xl md:text-7xl font-bold mb-6">
          {t.brand || "آکادمی پیانو نوانس"}
        </h1>


        <p className="
          text-inkdim
          text-lg md:text-xl
          leading-10
          max-w-3xl
          mx-auto
          mb-5
        ">
          آموزش تخصصی پیانو با تمرکز بر تکنیک،
          احساس و ساختن مسیر هنری هر نوازنده
        </p>


        <p className="text-goldbright mb-12">
          مانی فرزانه
          <br />
          مدرس پیانو و بنیان‌گذار آکادمی نوانس
        </p>


        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12">


          <div className="npa-card p-6">
            <GraduationCap
              className="mx-auto mb-3 text-goldbright"
              size={30}
            />
            <h3 className="font-bold mb-2">
              آموزش اصولی
            </h3>
            <p className="text-sm text-inkdim">
              برنامه آموزشی متناسب با سطح و هدف هر هنرجو
            </p>
          </div>


          <div className="npa-card p-6">
            <Music2
              className="mx-auto mb-3 text-goldbright"
              size={30}
            />
            <h3 className="font-bold mb-2">
              تکنیک و احساس
            </h3>
            <p className="text-sm text-inkdim">
              ترکیب مهارت نوازندگی و بیان موسیقایی
            </p>
          </div>


          <div className="npa-card p-6">
            <Trophy
              className="mx-auto mb-3 text-goldbright"
              size={30}
            />
            <h3 className="font-bold mb-2">
              مسیر پیشرفت
            </h3>
            <p className="text-sm text-inkdim">
              همراهی قدم به قدم تا اجرای بهتر
            </p>
          </div>


        </div>


        <div className="flex flex-col sm:flex-row justify-center gap-5">

          <Link
            href="/register"
            className="
            npa-btn-gold
            justify-center
            px-10 py-4
            "
          >
            ثبت‌نام هنرجو
          </Link>


          <Link
            href="/login"
            className="
            npa-btn-ghost
            flex items-center justify-center gap-2
            px-10 py-4
            "
          >
            <LogIn size={18} />
            ورود
          </Link>

        </div>


        <div className="mt-10 text-inkdim text-sm">
          Nuance Piano Academy © Mani Farzaneh
        </div>


      </div>

    </main>
  );
}