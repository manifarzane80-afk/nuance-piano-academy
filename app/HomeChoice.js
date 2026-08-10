"use client";

import Link from "next/link";
import { Piano, LogIn, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function HomeChoice() {
  const { t } = useLang();

  return (
    <main className="min-h-screen flex items-center justify-center px-6 npa-hero">

      <div className="max-w-4xl text-center">

        <div
          className="npa-glow w-28 h-28 rounded-full mx-auto mb-10 flex items-center justify-center border border-gold bg-[rgba(198,161,91,.1)] npa-float"
        >
          <Piano
            size={48}
            className="text-goldbright"
          />
        </div>

        <div className="flex justify-center items-center gap-2 text-goldbright mb-6">
          <Sparkles size={18} />
          <span className="tracking-wide text-sm">
            Premium Piano Education
          </span>
        </div>

        <h1 className="npa-title text-5xl md:text-7xl font-bold mb-8">
          {t.brand || "آکادمی پیانو نوانس"}
        </h1>

        <p className="text-inkdim text-lg md:text-xl leading-10 max-w-2xl mx-auto mb-12">
          آموزش پیانو با تمرکز بر تکنیک، احساس و ظرافت موسیقی
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">

          <Link
            href="/register"
            className="npa-btn-gold justify-center text-base px-10 py-4"
          >
            {t.navRegister || "ثبت‌نام هنرجو"}
          </Link>

          <Link
            href="/login"
            className="npa-btn-ghost justify-center text-base px-10 py-4"
          >
            <LogIn size={18} />
            {t.navLogin || "ورود"}
          </Link>

        </div>

        <div className="mt-12 text-inkdim text-sm">
          {t.brandBy || "by Mani Farzaneh"}
        </div>

      </div>

    </main>
  );
}