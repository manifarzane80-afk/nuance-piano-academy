"use client";

import Link from "next/link";
import {
  LogIn,
  Sparkles,
  GraduationCap,
  Music2,
  Trophy,
  ArrowLeft,
  Play,
  Quote,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

function NuanceLogo({ large = false }) {
  return (
    <div
      className={`flex items-center gap-3 ${
        large ? "scale-110" : ""
      }`}
    >
      <div
        className="w-11 h-11 rounded-full border flex items-center justify-center"
        style={{
          borderColor: "var(--gold)",
          background: "rgba(198,161,91,0.08)",
        }}
      >
        <span
          className="text-2xl font-serif font-bold"
          style={{ color: "var(--gold-bright)" }}
        >
          N
        </span>
      </div>

      <div className="text-right">
        <div className="font-bold tracking-[0.18em] text-sm">
          NUANCE
        </div>

        <div className="text-[10px] text-inkdim tracking-[0.12em]">
          PIANO ACADEMY
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, text }) {
  return (
    <div className="npa-card p-7 text-center">
      <div className="text-goldbright flex justify-center mb-5">
        {icon}
      </div>

      <h3 className="font-bold text-lg mb-3">
        {title}
      </h3>

      <p className="text-sm text-inkdim leading-8">
        {text}
      </p>
    </div>
  );
}

export default function HomeChoice() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{
            background: "rgba(198,161,91,0.10)",
          }}
        />

        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{
            background: "rgba(198,161,91,0.07)",
          }}
        />
      </div>

      {/* HEADER */}
      <header className="relative z-20 px-6 py-6 border-b border-[var(--line)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NuanceLogo />

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="npa-btn-ghost px-5 py-2.5 flex items-center gap-2"
            >
              <LogIn size={16} />
              ورود
            </Link>

            <Link
              href="/register"
              className="npa-btn-gold px-5 py-2.5"
            >
              ثبت‌نام
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[calc(100vh-90px)] flex items-center px-6 py-20">
        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          {/* TEXT */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            <div className="flex justify-center lg:justify-start items-center gap-3 text-goldbright mb-7">
              <Sparkles size={18} />

              <span
                dir="ltr"
                className="tracking-[0.25em] text-xs"
              >
                NUANCE PIANO ACADEMY
              </span>
            </div>

            <h1 className="npa-title text-5xl md:text-7xl font-bold leading-[1.25] mb-7">
              آکادمی پیانو
              <br />

              <span className="text-goldbright">
                نوانس
              </span>
            </h1>

            <p className="text-inkdim text-lg md:text-xl leading-10 max-w-xl mx-auto lg:mr-0 lg:ml-0 mb-7">
              جایی برای یادگیری پیانو،
              ساختن تکنیک،
              پرورش احساس
              و پیدا کردن صدای شخصی هر نوازنده.
            </p>

            <div className="mb-9">
              <div className="text-goldbright font-bold text-lg">
                مانی فرزانه
              </div>

              <div className="text-sm text-inkdim mt-1">
                نوازنده، آهنگساز و مدرس پیانو
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                href="/register"
                className="npa-btn-gold px-9 py-4 flex justify-center items-center gap-2"
              >
                شروع یادگیری
                <ArrowLeft size={18} />
              </Link>

              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="npa-btn-ghost px-9 py-4 flex justify-center items-center gap-2"
              >
                <Play size={17} />
                آشنایی با نوانس
              </button>
            </div>
          </div>

          {/* LOGO / VISUAL */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[520px] aspect-square flex items-center justify-center">

              <div className="absolute inset-4 rounded-full border border-[rgba(198,161,91,0.12)]" />

              <div className="absolute inset-12 rounded-full border border-[rgba(198,161,91,0.18)]" />

              <div className="absolute inset-24 rounded-full border border-[rgba(198,161,91,0.28)]" />

              <div className="absolute inset-[30%] rounded-full bg-[rgba(198,161,91,0.07)] blur-2xl" />

              <div className="relative flex flex-col items-center justify-center text-center">
                <div className="text-[110px] md:text-[150px] font-serif font-bold leading-none text-goldbright">
                  N
                </div>

                <div
                  dir="ltr"
                  className="text-xl md:text-2xl tracking-[0.45em] font-bold mt-2"
                >
                  NUANCE
                </div>

                <div
                  dir="ltr"
                  className="text-xs md:text-sm tracking-[0.3em] text-inkdim mt-3"
                >
                  PIANO ACADEMY
                </div>

                <div className="mt-7 flex items-center gap-3 text-xs text-goldbright">
                  <span className="w-10 h-px bg-[var(--gold)]" />

                  <span>
                    ظرافت در موسیقی
                  </span>

                  <span className="w-10 h-px bg-[var(--gold)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEANING */}
      <section className="relative px-6 py-24 border-t border-[var(--line)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-goldbright mb-5">
            <Quote size={28} className="mx-auto" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-7">
            نوانس یعنی چه؟
          </h2>

          <p className="text-inkdim leading-9 text-base md:text-lg">
            Nuance در موسیقی به معنای{" "}
            <span className="text-goldbright font-bold">
              ظرافت، تفاوت‌های ظریف و کیفیت بیان
            </span>{" "}
            در اجرای موسیقی است؛ همان جزئیاتی که یک اجرای درست را
            به یک اجرای شخصی و ماندگار تبدیل می‌کند.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative px-6 py-24">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <div
              dir="ltr"
              className="text-xs tracking-[0.25em] text-goldbright mb-4"
            >
              THE NUANCE METHOD
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              آموزش فراتر از نت‌ها
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Card
              icon={<GraduationCap size={30} />}
              title="آموزش اصولی"
              text="برنامه آموزشی متناسب با سطح، سن، استعداد و هدف هر هنرجو."
            />

            <Card
              icon={<Music2 size={30} />}
              title="تکنیک و احساس"
              text="ترکیب تکنیک نوازندگی با موسیقیایی بودن، بیان و احساس."
            />

            <Card
              icon={<Trophy size={30} />}
              title="مسیر پیشرفت"
              text="پیگیری تمرین‌ها و همراهی مرحله‌به‌مرحله برای رسیدن به اجرای بهتر."
            />

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24">
        <div className="max-w-5xl mx-auto npa-card p-10 md:p-16 text-center">

          <div className="flex justify-center">
            <NuanceLogo large />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mt-10 mb-5">
            صدای خودت را پیدا کن.
          </h2>

          <p className="text-inkdim leading-8 max-w-2xl mx-auto mb-9">
            نوانس فقط یک کلاس پیانو نیست؛ مسیری است برای ساختن
            نوازنده‌ای که تکنیک، احساس و شخصیت خودش را دارد.
          </p>

          <Link
            href="/register"
            className="npa-btn-gold inline-flex items-center gap-2 px-10 py-4"
          >
            ورود به مسیر نوانس
            <ArrowLeft size={18} />
          </Link>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-[var(--line)] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

          <NuanceLogo />

          <div
            dir="ltr"
            className="text-sm text-inkdim text-center"
          >
            Nuance Piano Academy © {new Date().getFullYear()} Mani Farzaneh
          </div>

        </div>
      </footer>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="w-full max-w-4xl npa-card p-3"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="aspect-video rounded-2xl bg-black flex items-center justify-center">

              <div className="text-center text-inkdim">

                <Play
                  size={50}
                  className="mx-auto mb-4 text-goldbright"
                />

                <p>
                  ویدیوی معرفی نوانس
                </p>

                <p className="text-xs mt-2">
                  ویدیوی معرفی را می‌توان از پنل مدیریت سایت اضافه کرد.
                </p>

              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowVideo(false)}
              className="npa-btn-ghost w-full justify-center mt-3"
            >
              بستن
            </button>

          </div>
        </div>
      )}

      {/* SCROLL INDICATOR */}
      <div className="fixed bottom-5 right-5 z-30 pointer-events-none">
        <ChevronDown
          size={20}
          className="text-goldbright animate-bounce"
        />
      </div>

    </main>
  );
}