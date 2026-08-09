"use client";

import Link from "next/link";
import { Piano, LogIn } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function HomeChoice() {
  const { t } = useLang();

  return (
    <div className="fade-in flex flex-col gap-4">

      <div className="npa-card p-6 text-center">

        <div
          className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center border border-gold"
          style={{
            background: "rgba(198,161,91,.1)",
          }}
        >
          <Piano
            size={24}
            className="text-goldbright"
          />
        </div>

        <div className="font-bold text-[17px] mb-2">
          {t.brand || "Nuance Piano Academy"}
        </div>

        <div className="text-[13px] text-inkdim mb-6">
          {t.brandBy || "by Mani Farzaneh"}
        </div>

        <div className="flex flex-col gap-3">

          <Link
            href="/register"
            className="npa-btn-gold justify-center"
          >
            {t.navRegister || "ثبت‌نام هنرجو"}
          </Link>

          <Link
            href="/login"
            className="npa-btn-ghost justify-center"
          >
            <LogIn size={16} />
            ورود به حساب
          </Link>

        </div>

        <div className="text-[11.5px] text-inkdim mt-4 leading-6">
          هنرجو و استاد از همین بخش وارد حساب خود می‌شوند.
        </div>

      </div>

    </div>
  );
}