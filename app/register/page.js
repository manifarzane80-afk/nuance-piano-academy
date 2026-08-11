"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle2,
  Check,
} from "lucide-react";
import { useLang } from "@/lib/i18n";

function KeyProgress({ step, total }) {
  return (
    <div className="flex gap-2 mb-6">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className="h-1.5 flex-1 rounded-full transition-all"
          style={{
            background:
              index <= step ? "var(--gold)" : "var(--line)",
          }}
        />
      ))}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] text-inkdim">
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
        color: active
          ? "var(--gold-bright)"
          : "var(--ink-dim)",
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
      className="npa-chip flex items-center gap-1.5"
      style={{
        cursor: "pointer",
        borderColor: active
          ? "var(--gold)"
          : "var(--line)",
        color: active
          ? "var(--gold-bright)"
          : "var(--ink-dim)",
        backgroundColor: active
          ? "rgba(198,161,91,.12)"
          : "transparent",
      }}
    >
      {children}
    </button>
  );
}

export default function RegisterPage() {
  const { t, lang } = useLang();

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
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

  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const toggleTime = (time) => {
    setForm((current) => ({
      ...current,
      times: current.times.includes(time)
        ? current.times.filter((item) => item !== time)
        : [...current.times, time],
    }));
  };

  const steps = [
    t.stepPersonal,
    t.stepMusic,
    t.stepGoal,
    t.stepConfirm,
  ];

  const levels = [
    t.beginner,
    t.intermediate,
    t.advanced,
  ];

  const styles = [
    t.classical,
    t.pop,
    t.jazz,
    t.filmMusic,
    t.iranianTraditional,
  ];

  const timeOptions = [
    t.morning,
    t.noon,
    t.evening,
    t.night,
    t.weekend,
  ];

  const canNext = () => {
    if (step === 0) {
      return Boolean(
        form.fullName.trim() &&
          (form.phone.trim() || form.email.trim()) &&
          form.password.length >= 6 &&
          form.age &&
          form.city.trim()
      );
    }

    if (step === 1) {
      return Boolean(form.played && form.level);
    }

    if (step === 2) {
      return Boolean(
        form.goal.trim() &&
          form.style &&
          form.times.length > 0
      );
    }

    return true;
  };

  const submit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error ||
            t.submitError ||
            "ثبت اطلاعات انجام نشد."
        );
      }

      setDone(true);
    } catch (err) {
      setError(
        err && err.message
          ? err.message
          : t.genericError || "خطایی رخ داد."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setDone(false);
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
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-xl text-center">
          <CheckCircle2
            size={56}
            className="mx-auto mb-5"
            style={{
              color: "var(--gold)",
            }}
          />

          <h2 className="text-2xl font-semibold mb-3">
            {t.success}
          </h2>

          <p className="text-inkdim">
            {t.successSub}
          </p>

          <button
            type="button"
            className="npa-btn-ghost mt-6"
            onClick={resetForm}
          >
            {t.newRequest}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <KeyProgress
          step={step}
          total={steps.length}
        />

        <div className="mb-7">
          <div className="text-[12px] text-inkdim mb-2">
            {t.step} {step + 1} {t.of} {steps.length}
          </div>

          <h1 className="text-2xl font-semibold">
            {steps[step]}
          </h1>
        </div>

        {/* STEP 1 — Personal Information */}
        {step === 0 && (
          <div className="fade-in flex flex-col gap-3.5">
            <Field label={t.fullName}>
              <input
                className="npa-input"
                value={form.fullName}
                onChange={(event) =>
                  updateField(
                    "fullName",
                    event.target.value
                  )
                }
              />
            </Field>

            <Field label={t.phone}>
              <input
                className="npa-input"
                type="tel"
                inputMode="tel"
                placeholder="09xxxxxxxxx"
                value={form.phone}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value
                  )
                }
              />
            </Field>

            <Field label={t.email}>
              <input
                className="npa-input"
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
                }
              />
            </Field>

            <Field label={t.password}>
              <input
                className="npa-input"
                type="password"
                placeholder={t.passwordHint}
                value={form.password}
                onChange={(event) =>
                  updateField(
                    "password",
                    event.target.value
                  )
                }
              />
            </Field>

            <div className="text-[11px] text-inkdim -mt-1">
              {t.phoneOrEmailRequired}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label={t.age}>
                <input
                  className="npa-input"
                  type="number"
                  min="1"
                  value={form.age}
                  onChange={(event) =>
                    updateField(
                      "age",
                      event.target.value
                    )
                  }
                />
              </Field>

              <Field label={t.city}>
                <input
                  className="npa-input"
                  value={form.city}
                  onChange={(event) =>
                    updateField(
                      "city",
                      event.target.value
                    )
                  }
                />
              </Field>
            </div>
          </div>
        )}

        {/* STEP 2 — Music Experience */}
        {step === 1 && (
          <div className="fade-in flex flex-col gap-4">
            <div>
              <label className="text-[12.5px] text-inkdim mb-1.5 block">
                {t.playedBefore}
              </label>

              <div className="flex gap-2.5">
                {[t.yes, t.no].map((option) => (
                  <PillButton
                    key={option}
                    active={form.played === option}
                    onClick={() =>
                      updateField(
                        "played",
                        option
                      )
                    }
                  >
                    {option}
                  </PillButton>
                ))}
              </div>
            </div>

            {form.played === t.yes && (
              <Field label={t.years}>
                <input
                  className="npa-input"
                  type="number"
                  min="0"
                  value={form.years}
                  onChange={(event) =>
                    updateField(
                      "years",
                      event.target.value
                    )
                  }
                />
              </Field>
            )}

            <div>
              <label className="text-[12.5px] text-inkdim mb-1.5 block">
                {t.level}
              </label>

              <div className="flex gap-2.5">
                {levels.map((level) => (
                  <PillButton
                    key={level}
                    active={form.level === level}
                    onClick={() =>
                      updateField(
                        "level",
                        level
                      )
                    }
                  >
                    {level}
                  </PillButton>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — Goals */}
        {step === 2 && (
          <div className="fade-in flex flex-col gap-4">
            <Field label={t.goal}>
              <textarea
                className="npa-input"
                rows={3}
                value={form.goal}
                onChange={(event) =>
                  updateField(
                    "goal",
                    event.target.value
                  )
                }
              />
            </Field>

            <div>
              <label className="text-[12.5px] text-inkdim mb-1.5 block">
                {t.style}
              </label>

              <div className="flex flex-wrap gap-2">
                {styles.map((style) => (
                  <Chip
                    key={style}
                    active={form.style === style}
                    onClick={() =>
                      updateField(
                        "style",
                        style
                      )
                    }
                  >
                    {style}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[12.5px] text-inkdim mb-1.5 block">
                {t.times}
              </label>

              <div className="flex flex-wrap gap-2">
                {timeOptions.map((time) => (
                  <Chip
                    key={time}
                    active={form.times.includes(time)}
                    onClick={() =>
                      toggleTime(time)
                    }
                  >
                    {form.times.includes(time) && (
                      <Check size={12} />
                    )}

                    {time}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 — Confirmation */}
        {step === 3 && (
          <div className="fade-in flex flex-col">
            {[
              [t.fullName, form.fullName],
              [t.phone, form.phone || "—"],
              [t.email, form.email || "—"],
              [t.password, "••••••••"],
              [t.age, form.age || "—"],
              [t.city, form.city || "—"],
              [
                t.playedBefore,
                form.played || "—",
              ],
              [
                t.level,
                form.level || "—",
              ],
              [
                t.goal,
                form.goal || "—",
              ],
              [
                t.style,
                form.style || "—",
              ],
              [
                t.times,
                form.times.length
                  ? form.times.join(
                      lang === "fa"
                        ? "، "
                        : ", "
                    )
                  : "—",
              ],
            ].map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between gap-4 py-2.5 border-b border-dashed border-line text-[13.5px]"
              >
                <span className="text-inkdim">
                  {key}
                </span>

                <span className="font-semibold text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="text-[13px] mt-3"
            style={{
              color: "var(--clay)",
            }}
          >
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-2.5 mt-5">
          {step > 0 && (
            <button
              type="button"
              className="npa-btn-ghost"
              onClick={() =>
                setStep(
                  (current) => current - 1
                )
              }
              disabled={submitting}
            >
              <ArrowRight size={16} />
              {t.prev}
            </button>
          )}

          {step < steps.length - 1 ? (
            <button
              type="button"
              className="npa-btn-gold flex-1 justify-center"
              disabled={!canNext()}
              onClick={() =>
                setStep(
                  (current) => current + 1
                )
              }
            >
              {t.next}
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
                t.loading
              ) : (
                <>
                  {t.submit}
                  <Send size={15} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}