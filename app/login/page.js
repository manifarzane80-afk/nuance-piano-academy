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
  const { t } = useLang();
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
        setError(
          t.loginError ||
            "شماره موبایل یا رمز عبور اشتباه است"
        );
        setLoading(false);
        return;
      }

      const sessionRes = await fetch(
        "/api/auth/session",
        {
          cache: "no-store",
        }
      );

      const session = await sessionRes.json();

      if (session?.user?.role === "teacher") {
        router.push("/teacher");
      } else if (
        session?.user?.role === "student"
      ) {
        router.push("/student");
      } else {
        setError(
          "ورود انجام شد اما نقش کاربر مشخص نیست."
        );
        setLoading(false);
        return;
      }

      router.refresh();
    } catch (err) {
      console.error("Login error:", err);

      setError(
        "خطایی هنگام ورود به حساب رخ داد."
      );
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     انتخاب نوع ورود
  ----------------------------- */

  if (!loginType) {
    return (
      <div className="fade-in">

        <div className="npa-card p-6">

          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center border border-gold"
            style={{
              background:
                "rgba(198,161,91,.1)",
            }}
          >
            <LogIn
              size={21}
              style={{
                color:
                  "var(--gold-bright)",
              }}
            />
          </div>

          <h1 className="text-xl font-bold text-center">
            انتخاب نوع ورود
          </h1>

          <p className="text-[12.5px] text-inkdim text-center mt-2 mb-6">
            وارد حساب کاربری خود شوید
          </p>

          <div className="flex flex-col gap-3">

            {/* Student */}

            <button
              type="button"
              onClick={() => {
                setLoginType("student");
                setError("");
              }}
              className="npa-card p-4 flex items-center gap-3 text-right"
            >
              <div
                className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                style={{
                  background:
                    "rgba(198,161,91,.12)",
                  border:
                    "1px solid rgba(198,161,91,.35)",
                }}
              >
                <GraduationCap
                  size={20}
                  style={{
                    color:
                      "var(--gold-bright)",
                  }}
                />
              </div>

              <div className="flex-1">
                <div className="font-bold text-[14px]">
                  ورود هنرجو
                </div>

                <div className="text-[11.5px] text-inkdim mt-1">
                  ورود به پنل شخصی هنرجو
                </div>
              </div>

              <ArrowRight
                size={17}
                className="text-inkdim"
              />
            </button>

            {/* Teacher */}

            <button
              type="button"
              onClick={() => {
                setLoginType("teacher");
                setError("");
              }}
              className="npa-card p-4 flex items-center gap-3 text-right"
            >
              <div
                className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                style={{
                  background:
                    "rgba(198,161,91,.12)",
                  border:
                    "1px solid rgba(198,161,91,.35)",
                }}
              >
                <Piano
                  size={20}
                  style={{
                    color:
                      "var(--gold-bright)",
                  }}
                />
              </div>

              <div className="flex-1">
                <div className="font-bold text-[14px]">
                  ورود استاد
                </div>

                <div className="text-[11.5px] text-inkdim mt-1">
                  ورود به پنل مدیریت استاد
                </div>
              </div>

              <ArrowRight
                size={17}
                className="text-inkdim"
              />
            </button>

          </div>

        </div>

      </div>
    );
  }

  /* -----------------------------
     فرم ورود
  ----------------------------- */

  return (
    <div className="fade-in">

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
          ← بازگشت به انتخاب نوع ورود
        </button>

        <div
          className="w-10 h-10 rounded-[10px] flex items-center justify-center border border-gold mb-4"
          style={{
            background:
              "rgba(198,161,91,.1)",
          }}
        >
          {loginType === "teacher" ? (
            <Piano
              size={19}
              style={{
                color:
                  "var(--gold-bright)",
              }}
            />
          ) : (
            <GraduationCap
              size={19}
              style={{
                color:
                  "var(--gold-bright)",
              }}
            />
          )}
        </div>

        <h1 className="text-xl font-bold">
          {loginType === "teacher"
            ? "ورود استاد"
            : "ورود هنرجو"}
        </h1>

        <p className="text-[12.5px] text-inkdim mt-1">
          {loginType === "teacher"
            ? "برای ورود به پنل استاد اطلاعات حساب خود را وارد کنید."
            : "برای ورود به پنل هنرجو اطلاعات حساب خود را وارد کنید."}
        </p>

        <form
          onSubmit={submit}
          className="flex flex-col gap-4 mt-5"
        >

          <div>
            <label className="text-[12.5px] text-inkdim mb-1.5 block">
              {loginType === "teacher"
                ? "شماره موبایل استاد"
                : "شماره موبایل یا ایمیل"}
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
                  : "0912... یا email@example.com"
              }
              autoComplete="username"
            />
          </div>

          <div>
            <label className="text-[12.5px] text-inkdim mb-1.5 block">
              {t.password || "رمز عبور"}
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
              ? "در حال ورود..."
              : loginType === "teacher"
              ? "ورود به پنل استاد"
              : "ورود به پنل هنرجو"}
          </button>

        </form>

      </div>

    </div>
  );
}