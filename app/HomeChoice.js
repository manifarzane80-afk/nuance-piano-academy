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
    <main className="min-h-screen flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-6xl text-center">

        <div
          className="
          npa-glow w-28 h-28 rounded-full mx-auto mb-6
          flex items-center justify-center
          border border-gold
          bg-[rgba(198,161,91,.12)]
          npa-float
          "
        >
          <Piano size={48} className="text-goldbright" />
        </div>


        <div className="flex justify-center items-center gap-2 text-goldbright mb-4">
          <Sparkles size={18} />
          <span className="tracking-widest text-sm">
            NUANCE PIANO ACADEMY
          </span>
        </div>


        <h1 className="npa-title text-5xl md:text-6xl font-bold mb-5">
          {t.brand || "آکادمی پیانو نوانس"}
        </h1>


        <p className="text-inkdim text-lg leading-9 max-w-3xl mx-auto mb-4">
          آموزش تخصصی پیانو با تمرکز بر تکنیک، احساس و ساختن مسیر هنری هر نوازنده
        </p>


        <p className="text-goldbright mb-8">
          مانی فرزانه
          <br />
          مدرس پیانو و بنیان‌گذار آکادمی نوانس
        </p>



        {/* سه کارت کنار هم */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
          max-w-5xl
          mx-auto
          mb-10
        ">


          <div className="npa-card p-5">
            <GraduationCap
              size={30}
              className="mx-auto mb-3 text-goldbright"
            />
            <h3 className="font-bold mb-2">
              آموزش اصولی
            </h3>
            <p className="text-sm text-inkdim">
              برنامه آموزشی متناسب با سطح و هدف هر هنرجو
            </p>
          </div>



          <div className="npa-card p-5">
            <Music2
              size={30}
              className="mx-auto mb-3 text-goldbright"
            />
            <h3 className="font-bold mb-2">
              تکنیک و احساس
            </h3>
            <p className="text-sm text-inkdim">
              ترکیب مهارت نوازندگی و بیان موسیقایی
            </p>
          </div>



          <div className="npa-card p-5">
            <Trophy
              size={30}
              className="mx-auto mb-3 text-goldbright"
            />
            <h3 className="font-bold mb-2">
              مسیر پیشرفت
            </h3>
            <p className="text-sm text-inkdim">
              همراهی قدم به قدم تا اجرای بهتر
            </p>
          </div>


        </div>



        <div className="
          flex
          flex-col
          md:flex-row
          justify-center
          gap-5
        ">

          <Link
            href="/register"
            className="npa-btn-gold justify-center px-10 py-4"
          >
            ثبت‌نام هنرجو
          </Link>


          <Link
            href="/login"
            className="
            npa-btn-ghost
            flex
            items-center
            justify-center
            gap-2
            px-10
            py-4
            "
          >
            <LogIn size={18}/>
            ورود
          </Link>


        </div>


        <div className="mt-8 text-inkdim text-sm">
          Nuance Piano Academy © Mani Farzaneh
        </div>


      </div>

    </main>
  );
}