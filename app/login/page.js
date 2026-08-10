"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  LogIn,
  AlertCircle,
  GraduationCap,
  Piano,
  ArrowRight,
} from "lucide-react";

import { useLang } from "@/lib/i18n";

export default function LoginPage() {
  const { t, lang } = useLang();
  const router = useRouter();

  const [loginType, setLoginType] = useState(null);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });

      if (!res || res.error) {
        setError(t.loginError);
        return;
      }

      const sessionRes = await fetch("/api/auth/session", {
        cache: "no-store",
      });

      const session = await sessionRes.json();

      if (session?.user?.role === "teacher") {
        router.push("/teacher");
      } else if (session?.user?.role === "student") {
        router.push("/student");
      } else {
        setError(
          lang === "fa"
            ? "نقش کاربر مشخص نیست."
            : "User role is not defined."
        );
      }

      router.refresh();
    } catch (err) {
      console.error(err);

      setError(
        lang === "fa"
          ? "خطایی هنگام ورود رخ داد."
          : "Login error occurred."
      );
    } finally {
      setLoading(false);
    }
  };


  if (!loginType) {
    return (
      <div className="npa-card p-6">

        <div
          className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center border"
          style={{
            background: "rgba(198,161,91,.1)",
            borderColor: "var(--gold)",
          }}
        >
          <LogIn
            size={21}
            style={{ color: "var(--gold-bright)" }}
          />
        </div>


        <h1 className="text-xl font-bold text-center">
          {t.loginTitle}
        </h1>

        <p className="text-[12.5px] text-inkdim text-center mt-2 mb-6">
          {t.loginSub}
        </p>


        <div className="flex flex-col gap-3">

          <button
            type="button"
            onClick={() => setLoginType("student")}
            className="npa-card p-4 flex items-center gap-3 text-right"
          >

            <GraduationCap
              size={22}
              style={{ color: "var(--gold-bright)" }}
            />

            <div className="flex-1">
              <div className="font-bold text-[14px]">
                {t.navStudent}
              </div>

              <div className="text-[11.5px] text-inkdim mt-1">
                {lang === "fa"
                  ? "ورود به پنل شخصی هنرجو"
                  : "Access student dashboard"}
              </div>
            </div>

            <ArrowRight size={17} />

          </button>



          <button
            type="button"
            onClick={() => setLoginType("teacher")}
            className="npa-card p-4 flex items-center gap-3 text-right"
          >

            <Piano
              size={22}
              style={{ color: "var(--gold-bright)" }}
            />

            <div className="flex-1">

              <div className="font-bold text-[14px]">
                {t.navTeacher}
              </div>

              <div className="text-[11.5px] text-inkdim mt-1">
                {lang === "fa"
                  ? "ورود به پنل مدیریت استاد"
                  : "Access teacher dashboard"}
              </div>

            </div>

            <ArrowRight size={17} />

          </button>


        </div>

      </div>
    );
  }  return (
    <div className="npa-card p-6">

      <button
        type="button"
        onClick={() => {
          setLoginType(null);
          setIdentifier("");
          setPassword("");
          setError("");
        }}
        className="text-[12px] text-inkdim mb-5"
      >
        ← {lang === "fa" ? "بازگشت به انتخاب نوع ورود" : "Back to login type"}
      </button>


      <div
        className="w-10 h-10 rounded-[10px] flex items-center justify-center border mb-4"
        style={{
          background: "rgba(198,161,91,.1)",
          borderColor: "var(--gold)",
        }}
      >
        {loginType === "teacher" ? (
          <Piano
            size={19}
            style={{ color: "var(--gold-bright)" }}
          />
        ) : (
          <GraduationCap
            size={19}
            style={{ color: "var(--gold-bright)" }}
          />
        )}
      </div>


      <h1 className="text-xl font-bold">
        {loginType === "teacher"
          ? t.navTeacher
          : t.navStudent}
      </h1>


      <p className="text-[12.5px] text-inkdim mt-1">
        {loginType === "teacher"
          ? lang === "fa"
            ? "برای ورود به پنل استاد اطلاعات حساب خود را وارد کنید."
            : "Enter your teacher account details."
          : lang === "fa"
            ? "برای ورود به پنل هنرجو اطلاعات حساب خود را وارد کنید."
            : "Enter your student account details."}
      </p>



      <form
        onSubmit={submit}
        className="flex flex-col gap-4 mt-5"
      >

        <div>

          <label className="text-[12.5px] text-inkdim mb-1.5 block">
            {loginType === "teacher"
              ? lang === "fa"
                ? "شماره موبایل استاد"
                : "Teacher phone number"
              : lang === "fa"
                ? "شماره موبایل یا ایمیل"
                : "Phone number or email"}
          </label>


          <input
            className="npa-input"
            value={identifier}
            onChange={(e) =>
              setIdentifier(e.target.value)
            }
            placeholder={
              loginType === "teacher"
                ? "0912..."
                : "0912... or email@example.com"
            }
            autoComplete="username"
          />

        </div>



        <div>

          <label className="text-[12.5px] text-inkdim mb-1.5 block">
            {t.password}
          </label>


          <input
            className="npa-input"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            autoComplete="current-password"
          />

        </div>



        {error && (
          <div
            className="flex items-center gap-2 text-[13px]"
            style={{
              color: "var(--clay)",
            }}
          >
            <AlertCircle size={15} />
            {error}
          </div>
        )}



        <button
          type="submit"
          className="npa-btn-gold justify-center"
          disabled={
            loading ||
            !identifier ||
            !password
          }
        >

          {loading
            ? t.loading
            : loginType === "teacher"
              ? t.navTeacher
              : t.navStudent}

        </button>


      </form>


    </div>
  );
}