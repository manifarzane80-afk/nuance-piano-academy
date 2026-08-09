"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Send, CheckCircle2, Check } from "lucide-react";
import { useLang } from "@/lib/i18n";

function KeyProgress({ step, total }) {
  return (
    <div className="flex gap-1.5 mb-5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`k ${i < step ? "done" : ""} ${i === step ? "now" : ""}`}
        />
      ))}
    </div>
  );
}

export default function RegisterPage() {
  const { t } = useLang();

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    age: "",
    city: "",
    played: "",
    years: "",
    level: "",
    goal: "",
    style: "",
    times: [],
  });

  const set = (key, value) => {
    setForm((f) => ({
      ...f,
      [key]: value,
    }));
  };

  const toggleTime = (time) => {
    setForm((f) => ({
      ...f,
      times: f.times.includes(time)
        ? f.times.filter((x) => x !== time)
        : [...f.times, time],
    }));
  };

  const steps = [
    t.stepPersonal || "اطلاعات حساب",
    t.stepMusic || "موسیقی",
    t.stepGoal || "هدف",
    t.stepConfirm || "تأیید",
  ];

  const levels = [
    t.beginner || "مبتدی",
    t.intermediate || "متوسط",
    t.advanced || "پیشرفته",
  ];

  const styles = ["کلاسیک", "پاپ", "جاز", "فیلم", "سنتی ایرانی"];

  const timeOptions = ["صبح", "ظهر", "عصر", "شب", "آخر هفته"];

  const canNext = () => {
    if (step === 0) {
      const hasPhoneOrEmail =
        form.phone.trim() !== "" || form.email.trim() !== "";

      return (
        form.fullName.trim() &&
        hasPhoneOrEmail &&
        form.password.trim().length >= 6 &&
        form.age &&
        form.city
      );
    }

    if (step === 1) {
      return form.played && form.level;
    }

    if (step === 2) {
      return form.goal && form.style && form.times.length > 0;
    }

    return true;
  };

  const submit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطا در ثبت‌نام");
      }

      setDone(data);
    } catch (e) {
      setError(e.message || "خطایی رخ داد");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setDone(null);
    setStep(0);
    setError("");

    setForm({
      fullName: "",
      phone: "",
      email: "",
      password: "",
      age: "",
      city: "",
      played: "",
      years: "",
      level: "",
      goal: "",
      style: "",
      times: [],
    });
  };

  if (done) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="text-center py-10">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border"
            style={{
              background: "rgba(124,150,131,.15)",
              borderColor: "var(--sage)",
            }}
          >
            <CheckCircle2 size={30} style={{ color: "var(--sage)" }} />
          </div>

          <h2 className="text-2xl font-semibold mb-3">
            ثبت‌نام با موفقیت انجام شد
          </h2>

          <p className="text-inkdim">
            حساب هنرجو ایجاد شد. از این پس می‌تواند با شماره تلفن یا ایمیل و
            رمز عبوری که انتخاب کرده وارد شود.
          </p>

          <button
            className="npa-btn-ghost mt-6"
            onClick={resetForm}
          >
            ثبت‌نام هنرجوی جدید
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <KeyProgress step={step} total={steps.length} />

      <div className="text-center mb-6">
        <div className="text-[12px] text-inkdim mb-2">
          {t.step || "مرحله"} {step + 1} {t.of || "از"} {steps.length}
        </div>

        <h1 className="text-2xl font-semibold">
          {steps[step]}
        </h1>
      </div>

      {step === 0 && (
        <div className="fade-in flex flex-col gap-3.5">
          <Field label="نام و نام خانوادگی">
            <input
              className="npa-input"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
            />
          </Field>

          <Field label="شماره تلفن">
            <input
              className="npa-input"
              placeholder="09xxxxxxxxx"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>

          <Field label="ایمیل">
            <input
              className="npa-input"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>

          <Field label="رمز عبور">
            <input
              className="npa-input"
              type="password"
              placeholder="حداقل ۶ کاراکتر"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
            />
          </Field>

          <div className="text-[11px] text-inkdim -mt-1">
            حداقل یکی از شماره تلفن یا ایمیل باید وارد شود.
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label={t.age || "سن"}>
              <input
                className="npa-input"
                type="number"
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
              />
            </Field>

            <Field label={t.city || "شهر"}>
              <input
                className="npa-input"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </Field>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="fade-in flex flex-col gap-4">
          <div>
            <label className="text-[12.5px] text-inkdim mb-1.5 block">
              {t.playedBefore || "قبلاً پیانو زده‌اید؟"}
            </label>

            <div className="flex gap-2.5">
              {[t.yes || "بله", t.no || "خیر"].map((option) => (
                <PillButton
                  key={option}
                  active={form.played === option}
                  onClick={() => set("played", option)}
                >
                  {option}
                </PillButton>
              ))}
            </div>
          </div>

          {form.played === (t.yes || "بله") && (
            <Field label={t.years || "چند سال؟"}>
              <input
                className="npa-input"
                type="number"
                value={form.years}
                onChange={(e) => set("years", e.target.value)}
              />
            </Field>
          )}

          <div>
            <label className="text-[12.5px] text-inkdim mb-1.5 block">
              {t.level || "سطح"}
            </label>

            <div className="flex gap-2.5">
              {levels.map((level) => (
                <PillButton
                  key={level}
                  active={form.level === level}
                  onClick={() => set("level", level)}
                >
                  {level}
                </PillButton>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="fade-in flex flex-col gap-4">
          <Field label={t.goal || "هدف شما از یادگیری چیست؟"}>
            <textarea
              className="npa-input"
              rows={3}
              value={form.goal}
              onChange={(e) => set("goal", e.target.value)}
            />
          </Field>

          <div>
            <label className="text-[12.5px] text-inkdim mb-1.5 block">
              {t.style || "سبک مورد علاقه"}
            </label>

            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <Chip
                  key={style}
                  active={form.style === style}
                  onClick={() => set("style", style)}
                >
                  {style}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[12.5px] text-inkdim mb-1.5 block">
              {t.times || "زمان مناسب کلاس"}
            </label>

            <div className="flex flex-wrap gap-2">
              {timeOptions.map((time) => (
                <Chip
                  key={time}
                  active={form.times.includes(time)}
                  onClick={() => toggleTime(time)}
                >
                  {form.times.includes(time) && <Check size={12} />}
                  {time}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="fade-in flex flex-col gap-1">
          {[
            ["نام و نام خانوادگی", form.fullName],
            ["شماره تلفن", form.phone || "—"],
            ["ایمیل", form.email || "—"],
            ["رمز عبور", "••••••••"],
            [t.age || "سن", form.age],
            [t.city || "شهر", form.city],
            [
              t.playedBefore || "سابقه نوازندگی",
              form.played === (t.yes || "بله")
                ? `${form.years || "—"} سال`
                : t.no || "خیر",
            ],
            [t.level || "سطح", form.level],
            [t.goal || "هدف", form.goal],
            [t.style || "سبک", form.style],
            [t.times || "زمان کلاس", form.times.join("، ") || "—"],
          ].map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between gap-4 py-2.5 border-b border-dashed border-line text-[13.5px]"
            >
              <span className="text-inkdim">{key}</span>
              <span className="font-semibold text-right">
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div
          className="text-[13px] mt-3"
          style={{ color: "var(--clay)" }}
        >
          {error}
        </div>
      )}

      <div className="flex gap-2.5 mt-5">
        {step > 0 && (
          <button
            type="button"
            className="npa-btn-ghost"
            onClick={() => setStep((s) => s - 1)}
          >
            <ArrowRight size={16} />
            {t.prev || "قبلی"}
          </button>
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            className="npa-btn-gold flex-1 justify-center"
            disabled={!canNext()}
            onClick={() => setStep((s) => s + 1)}
          >
            {t.next || "بعدی"}
            <ArrowLeft size={16} />
          </button>
        ) : (
          <button
            type="button"
            className="npa-btn-gold flex-1 justify-center"
            disabled={submitting}
            onClick={submit}
          >
            {submitting ? (
              t.loading || "در حال ثبت..."
            ) : (
              <>
                {t.submit || "ثبت‌نام"}
                <Send size={15} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-[12.5px] text-inkdim mb-1.5 block">
        {label}
      </label>
      {children}
    </div>
  );
}

function PillButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="npa-btn-ghost flex-1 justify-center"
      style={{
        borderColor: active ? "var(--gold)" : "var(--line)",
        color: active ? "var(--gold-bright)" : "var(--ink-dim)",
      }}
    >
      {children}
    </button>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="npa-chip"
      style={{
        cursor: "pointer",
        borderColor: active ? "var(--gold)" : "var(--line)",
        color: active ? "var(--gold-bright)" : "var(--ink-dim)",
        background: active
          ? "rgba(198,161,91,.12)"
          : "transparent",
      }}
    >
      {children}
    </button>
  );
}
