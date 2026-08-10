"use client";

import Link from "next/link";
import { Piano, LogIn, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function HomeChoice() {
  const { t } = useLang();

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[#08090b]">

      <div className="max-w-3xl text-center">

        <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center border border-[#c6a15b] bg-[#c6a15b]/10">
          <Piano size={40} className="text-[#c6a15b]" />
        </div>

        <div className="flex justify-center items-center gap-2 text-[#c6a15b] mb-5">
          <Sparkles size={18}/>
          <span className="text-sm">
            Premium Piano Education
          </span>
        </div>

        <h1 className="text-5xl font-bold text-white mb-6">
          Nuance Piano Academy
        </h1>

        <p className="text-gray-300 text-lg leading-8 mb-10">
          آموزش پیانو با تمرکز بر تکنیک، احساس و ظرافت موسیقی
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            href="/register"
            className="npa-btn-gold justify-center px-10 py-4"
          >
            {t.navRegister || "ثبت‌نام هنرجو"}
          </Link>

          <Link
            href="/login"
            className="npa-btn-ghost justify-center px-10 py-4 flex items-center gap-2"
          >
            <LogIn size={18}/>
            ورود به حساب
          </Link>

        </div>

        <p className="text-gray-500 mt-10 text-sm">
          by Mani Farzaneh
        </p>

      </div>

    </main>
  );
}