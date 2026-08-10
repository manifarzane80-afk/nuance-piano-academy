"use client";

import Link from "next/link";
import {
  Piano,
  LogIn,
  Sparkles,
  GraduationCap,
  Music2,
  Trophy,
  ArrowLeft,
} from "lucide-react";

import { useLang } from "@/lib/i18n";

export default function HomeChoice() {
  const { t } = useLang();

  return (
    <main className="min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="min-h-screen flex items-center relative px-6 py-16">

        {/* glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="
            absolute top-0 right-0
            w-96 h-96
            bg-[rgba(198,161,91,.12)]
            blur-3xl
            rounded-full
          "/>

          <div className="
            absolute bottom-0 left-0
            w-80 h-80
            bg-[rgba(198,161,91,.08)]
            blur-3xl
            rounded-full
          "/>
        </div>


        <div className="
          relative
          max-w-7xl
          w-full
          mx-auto
          grid
          lg:grid-cols-2
          gap-10
          items-center
        ">


          {/* TEXT */}

          <div className="text-center lg:text-right order-2 lg:order-1">


            <div className="
              flex
              justify-center
              lg:justify-start
              items-center
              gap-3
              text-goldbright
              mb-6
            ">

              <Sparkles size={18}/>

              <span className="tracking-[0.25em] text-xs">
                NUANCE PIANO ACADEMY
              </span>

            </div>



            <h1 className="
              npa-title
              text-5xl
              md:text-7xl
              font-bold
              leading-tight
              mb-7
            ">

              آکادمی پیانو
              <br/>

              <span className="text-goldbright">
                نوانس
              </span>

            </h1>



            <p className="
              text-inkdim
              text-lg
              md:text-xl
              leading-10
              max-w-xl
              mx-auto
              lg:mx-0
              mb-6
            ">

              آموزش تخصصی پیانو با تمرکز بر تکنیک،
              احساس و ساختن مسیر هنری هر نوازنده

            </p>



            <div className="
              text-goldbright
              mb-10
            ">

              مانی فرزانه
              <br/>

              <span className="text-sm text-inkdim">
                مدرس پیانو و بنیان‌گذار آکادمی نوانس
              </span>

            </div>



            <div className="
              flex
              flex-col
              sm:flex-row
              justify-center
              lg:justify-start
              gap-5
            ">


              <Link
                href="/register"
                className="
                  npa-btn-gold
                  px-10
                  py-4
                  flex
                  justify-center
                  items-center
                  gap-2
                "
              >

                شروع یادگیری

                <ArrowLeft size={18}/>

              </Link>



              <Link
                href="/login"
                className="
                  npa-btn-ghost
                  px-10
                  py-4
                  flex
                  justify-center
                  items-center
                  gap-2
                "
              >

                <LogIn size={18}/>

                ورود هنرجو

              </Link>


            </div>


          </div>




          {/* VISUAL */}

          <div className="
            order-1
            lg:order-2
            flex
            justify-center
          ">


            <div className="
              relative
              w-full
              max-w-lg
              aspect-square
              rounded-[40px]
              border
              border-[var(--line)]
              bg-[var(--panel)]
              flex
              items-center
              justify-center
            ">


              <div className="
                absolute
                inset-10
                rounded-full
                border
                border-[rgba(198,161,91,.25)]
              "/>


              <div className="
                absolute
                inset-20
                rounded-full
                border
                border-[rgba(198,161,91,.15)]
              "/>



              <div className="
                w-56
                h-56
                rounded-full
                border
                border-gold
                flex
                items-center
                justify-center
                bg-[rgba(198,161,91,.08)]
              ">

                <Piano
                  size={90}
                  className="text-goldbright"
                  strokeWidth={1}
                />

              </div>



              <div className="
                absolute
                bottom-8
                left-8
                right-8
                rounded-2xl
                border
                border-[var(--line)]
                bg-black/40
                backdrop-blur-xl
                p-5
                text-center
              ">

                <div className="
                  text-xs
                  text-goldbright
                  mb-2
                ">
                  THE NUANCE METHOD
                </div>


                <div>
                  تکنیک + احساس + شخصیت هنری
                </div>


              </div>



            </div>


          </div>


        </div>

      </section>





      {/* FEATURES */}

      <section className="px-6 py-24">

        <div className="
          max-w-6xl
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        ">


          <Card
            icon={<GraduationCap/>}
            title="آموزش اصولی"
            text="برنامه آموزشی متناسب با سطح و هدف هر هنرجو"
          />


          <Card
            icon={<Music2/>}
            title="تکنیک و احساس"
            text="ترکیب مهارت نوازندگی با بیان موسیقایی"
          />


          <Card
            icon={<Trophy/>}
            title="مسیر پیشرفت"
            text="همراهی قدم به قدم تا اجرای بهتر"
          />


        </div>

      </section>



      <footer className="
        border-t
        border-[var(--line)]
        py-8
        text-center
        text-sm
        text-inkdim
      ">

        Nuance Piano Academy © Mani Farzaneh

      </footer>


    </main>
  );
}




function Card({icon,title,text}){

  return (

    <div className="
      npa-card
      p-7
      text-center
    ">

      <div className="
        text-goldbright
        flex
        justify-center
        mb-4
      ">
        {icon}
      </div>


      <h3 className="font-bold mb-3">
        {title}
      </h3>


      <p className="text-sm text-inkdim leading-7">
        {text}
      </p>


    </div>

  );

}