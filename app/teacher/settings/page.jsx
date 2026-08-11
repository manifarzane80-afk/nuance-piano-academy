"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Palette,
  Type,
  Layout,
  Image as ImageIcon,
  Globe,
  Phone,
  Save,
  RotateCcw,
  Eye,
  Check,
  Sparkles,
  Navigation,
  FileText,
  Settings2,
  Upload,
  Video,
  User,
  Award,
  Plus,
  Trash2,
  ExternalLink,
  Instagram,
  Youtube,
  Send,
} from "lucide-react";

/* =========================================================
   DEFAULT SETTINGS
========================================================= */

const DEFAULT_SETTINGS = {
  site: {
    name: "Nuance Piano Academy",
    title: "آکادمی پیانو نوانس",
    description:
      "آموزش تخصصی پیانو با رویکردی حرفه‌ای، خلاقانه و متناسب با استعداد هر هنرجو.",

    logo: "",
    heroImage: "",
    introVideo: "",
    resumeFile: "",
    teacherPhoto: "",

    phone: "",
    instagram: "",
    telegram: "",
    youtube: "",
    email: "",
    address: "",

    teacherName: "مانی فرزانه",
    teacherTitle: "نوازنده، آهنگساز و مدرس پیانو",
    teacherBio:
      "مانی فرزانه، نوازنده، آهنگساز و مدرس پیانو است و در زمینه آموزش تخصصی پیانو فعالیت می‌کند.",

    awards: [],
    experiences: [],
  },

  colors: {
    primary: "#C6A15B",
    primaryBright: "#E2C47A",
    background: "#0B0B0C",
    surface: "#141416",
    surfaceLight: "#1B1B1E",
    text: "#F5F1E8",
    textDim: "#A9A49A",
    border: "rgba(198,161,91,.25)",
  },

  typography: {
    fontFamily: "Vazirmatn",
    headingSize: "32",
    bodySize: "15",
    radius: "16",
  },

  header: {
    showLogo: true,
    showNavigation: true,
    showRegisterButton: true,
    sticky: true,
  },

  hero: {
    enabled: true,
    title: "موسیقی را زندگی کن",
    subtitle:
      "آموزش پیانو برای کودکان، نوجوانان و بزرگسالان",
    buttonText: "ثبت‌نام هنرجو",
    showButton: true,
  },

  sections: {
    about: true,
    teachers: true,
    courses: true,
    gallery: true,
    contact: true,
    video: true,
    resume: true,
    achievements: true,
  },

  footer: {
    enabled: true,
    text: "Nuance Piano Academy",
    showSocials: true,
  },

  advanced: {
    customCss: "",
    customHead: "",
  },
};

/* =========================================================
   COMPONENTS
========================================================= */

function Section({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="npa-card p-5">
      <div className="flex items-start gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: "rgba(198,161,91,.12)",
            border: "1px solid rgba(198,161,91,.25)",
          }}
        >
          <Icon
            size={19}
            style={{ color: "var(--gold-bright)" }}
          />
        </div>

        <div>
          <h2 className="font-bold text-[16px]">
            {title}
          </h2>

          {description && (
            <p className="text-xs text-inkdim mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <label className="block">
      <div className="text-xs text-inkdim mb-2">
        {label}
      </div>

      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="npa-input w-full"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
}) {
  return (
    <label className="block">
      <div className="text-xs text-inkdim mb-2">
        {label}
      </div>

      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="npa-input w-full resize-y"
      />
    </label>
  );
}

function Toggle({
  label,
  description,
  value,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <div className="text-sm font-bold">
          {label}
        </div>

        {description && (
          <div className="text-[11px] text-inkdim mt-1">
            {description}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative w-12 h-6 rounded-full shrink-0 transition-colors"
        style={{
          background: value
            ? "var(--gold-bright)"
            : "rgba(255,255,255,.12)",
        }}
      >
        <span
          className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
          style={{
            left: value ? "26px" : "4px",
          }}
        />
      </button>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-sm">
        {label}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="color"
          value={
            value && value.startsWith("#")
              ? value
              : "#000000"
          }
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-10 h-10 rounded-lg overflow-hidden cursor-pointer"
        />

        <input
          value={value ?? ""}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="npa-input w-[140px] text-left"
        />
      </div>
    </div>
  );
}

/* =========================================================
   CLOUDINARY UPLOAD
========================================================= */

function UploadBox({
  label,
  description,
  accept,
  value,
  onUploaded,
  type = "image",
}) {
  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [preview, setPreview] =
    useState(value || "");

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const uploadFile = async (file) => {
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      /*
       * Cloudinary
       * Cloud Name: zksttsns
       * Upload Preset: nuance_upload
       */

      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "upload_preset",
        "nuance_upload"
      );

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/zksttsns/auto/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            "آپلود انجام نشد."
        );
      }

      if (!data?.secure_url) {
        throw new Error(
          "آدرس فایل از Cloudinary دریافت نشد."
        );
      }

      setPreview(data.secure_url);
      onUploaded(data.secure_url);
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "آپلود فایل انجام نشد."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-bold">
          {label}
        </div>

        {description && (
          <div className="text-[11px] text-inkdim mt-1">
            {description}
          </div>
        )}
      </div>

      <label
        className="block cursor-pointer rounded-2xl border border-dashed p-6 text-center transition hover:bg-white/[.03]"
        style={{
          borderColor:
            "rgba(198,161,91,.35)",
        }}
      >
        <input
          type="file"
          accept={accept}
          className="hidden"
          disabled={uploading}
          onChange={(e) =>
            uploadFile(
              e.target.files?.[0]
            )
          }
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin">
              <Upload size={27} />
            </div>

            <span className="text-xs">
              در حال آپلود فایل...
            </span>

            <span className="text-[10px] text-inkdim">
              لطفاً صفحه را نبندید
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {type === "video" ? (
              <Video size={30} />
            ) : type === "file" ? (
              <FileText size={30} />
            ) : (
              <Upload size={30} />
            )}

            <span className="font-bold text-sm">
              انتخاب فایل از کامپیوتر یا گوشی
            </span>

            <span className="text-[10px] text-inkdim">
              برای انتخاب فایل کلیک کنید
            </span>
          </div>
        )}
      </label>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
          {error}
        </div>
      )}

      {preview && (
        <div className="rounded-xl overflow-hidden border border-white/10">
          {type === "image" ? (
            <img
              src={preview}
              alt=""
              className="w-full max-h-[350px] object-cover"
            />
          ) : type === "video" ? (
            <video
              src={preview}
              controls
              className="w-full max-h-[400px]"
            />
          ) : (
            <div className="p-4 flex items-center gap-3">
              <FileText size={25} />

              <div className="flex-1 text-sm">
                فایل با موفقیت آپلود شده
              </div>

              <a
                href={preview}
                target="_blank"
                rel="noreferrer"
                className="npa-btn-ghost !p-2"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function TeacherSettingsPage() {
  const [settings, setSettings] =
    useState(DEFAULT_SETTINGS);

  const [saved, setSaved] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("site");

  /* =====================================================
     LOAD SETTINGS
  ===================================================== */

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(
          "nuance-site-settings"
        );

      if (!stored) return;

      const parsed =
        JSON.parse(stored);

      setSettings({
        ...DEFAULT_SETTINGS,
        ...parsed,

        site: {
          ...DEFAULT_SETTINGS.site,
          ...parsed.site,
        },

        colors: {
          ...DEFAULT_SETTINGS.colors,
          ...parsed.colors,
        },

        typography: {
          ...DEFAULT_SETTINGS.typography,
          ...parsed.typography,
        },

        header: {
          ...DEFAULT_SETTINGS.header,
          ...parsed.header,
        },

        hero: {
          ...DEFAULT_SETTINGS.hero,
          ...parsed.hero,
        },

        sections: {
          ...DEFAULT_SETTINGS.sections,
          ...parsed.sections,
        },

        footer: {
          ...DEFAULT_SETTINGS.footer,
          ...parsed.footer,
        },

        advanced: {
          ...DEFAULT_SETTINGS.advanced,
          ...parsed.advanced,
        },
      });
    } catch (error) {
      console.error(
        "Settings load error:",
        error
      );
    }
  }, []);

  /* =====================================================
     UPDATE
  ===================================================== */

  const update = (
    section,
    key,
    value
  ) => {
    setSettings((prev) => ({
      ...prev,

      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  /* =====================================================
     SAVE
  ===================================================== */

  const saveSettings = () => {
    localStorage.setItem(
      "nuance-site-settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  /* =====================================================
     RESET
  ===================================================== */

  const resetSettings = () => {
    const confirmed =
      window.confirm(
        "همه تنظیمات به حالت اولیه برگردد؟"
      );

    if (!confirmed) return;

    setSettings({
      ...DEFAULT_SETTINGS,
      site: {
        ...DEFAULT_SETTINGS.site,
        awards: [],
        experiences: [],
      },
    });

    localStorage.removeItem(
      "nuance-site-settings"
    );
  };

  /* =====================================================
     AWARDS
  ===================================================== */

  const addAward = () => {
    const item = {
      id: Date.now(),
      title: "",
      year: "",
      description: "",
    };

    update(
      "site",
      "awards",
      [
        ...(settings.site.awards || []),
        item,
      ]
    );
  };

  const removeAward = (id) => {
    update(
      "site",
      "awards",
      (
        settings.site.awards || []
      ).filter(
        (item) => item.id !== id
      )
    );
  };

  const updateAward = (
    id,
    key,
    value
  ) => {
    update(
      "site",
      "awards",
      (
        settings.site.awards || []
      ).map((item) =>
        item.id === id
          ? {
              ...item,
              [key]: value,
            }
          : item
      )
    );
  };

  /* =====================================================
     EXPERIENCES
  ===================================================== */

  const addExperience = () => {
    const item = {
      id: Date.now(),
      title: "",
      description: "",
    };

    update(
      "site",
      "experiences",
      [
        ...(settings.site.experiences ||
          []),
        item,
      ]
    );
  };

  const removeExperience = (id) => {
    update(
      "site",
      "experiences",
      (
        settings.site.experiences ||
        []
      ).filter(
        (item) => item.id !== id
      )
    );
  };

  const updateExperience = (
    id,
    key,
    value
  ) => {
    update(
      "site",
      "experiences",
      (
        settings.site.experiences ||
        []
      ).map((item) =>
        item.id === id
          ? {
              ...item,
              [key]: value,
            }
          : item
      )
    );
  };

  /* =====================================================
     TABS
  ===================================================== */

  const tabs = [
    {
      id: "site",
      label: "اطلاعات سایت",
      icon: Globe,
    },
    {
      id: "media",
      label: "عکس و ویدیو",
      icon: ImageIcon,
    },
    {
      id: "resume",
      label: "رزومه من",
      icon: User,
    },
    {
      id: "colors",
      label: "رنگ‌ها",
      icon: Palette,
    },
    {
      id: "typography",
      label: "فونت و اندازه",
      icon: Type,
    },
    {
      id: "header",
      label: "هدر و منو",
      icon: Navigation,
    },
    {
      id: "hero",
      label: "صفحه اصلی",
      icon: Sparkles,
    },
    {
      id: "sections",
      label: "بخش‌های سایت",
      icon: Layout,
    },
    {
      id: "footer",
      label: "فوتر",
      icon: FileText,
    },
    {
      id: "advanced",
      label: "پیشرفته",
      icon: Settings2,
    },
  ];

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <div
      className="space-y-5 pb-10"
      dir="rtl"
    >
      {/* HEADER */}

      <div className="npa-card p-5">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background:
                "rgba(198,161,91,.12)",
              border:
                "1px solid rgba(198,161,91,.3)",
            }}
          >
            <Settings2
              size={21}
              style={{
                color:
                  "var(--gold-bright)",
              }}
            />
          </div>

          <div className="flex-1">
            <h1 className="text-lg font-bold">
              مدیریت کامل سایت
            </h1>

            <p className="text-xs text-inkdim mt-1">
              ظاهر، محتوا، تصاویر،
              ویدیو، رزومه، رنگ‌ها،
              منوها و تنظیمات سایت را
              از اینجا کنترل کنید.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="npa-btn-ghost !p-2"
          >
            <Eye size={17} />
          </Link>
        </div>
      </div>

      {/* TABS */}

      <div className="npa-card p-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab(
                    tab.id
                  )
                }
                className="px-3 py-2.5 rounded-xl text-xs flex items-center gap-2 transition"
                style={{
                  background:
                    activeTab === tab.id
                      ? "rgba(198,161,91,.16)"
                      : "transparent",

                  color:
                    activeTab === tab.id
                      ? "var(--gold-bright)"
                      : "inherit",
                }}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================
          SITE
      ================================================= */}

      {activeTab === "site" && (
        <div className="space-y-4">
          <Section
            icon={Globe}
            title="اطلاعات اصلی"
            description="اطلاعات عمومی آموزشگاه"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="نام انگلیسی سایت"
                value={
                  settings.site.name
                }
                onChange={(v) =>
                  update(
                    "site",
                    "name",
                    v
                  )
                }
              />

              <Field
                label="نام فارسی آموزشگاه"
                value={
                  settings.site.title
                }
                onChange={(v) =>
                  update(
                    "site",
                    "title",
                    v
                  )
                }
              />

              <div className="md:col-span-2">
                <Textarea
                  label="توضیحات آموزشگاه"
                  value={
                    settings.site
                      .description
                  }
                  onChange={(v) =>
                    update(
                      "site",
                      "description",
                      v
                    )
                  }
                />
              </div>
            </div>
          </Section>

          <Section
            icon={Phone}
            title="اطلاعات تماس"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="شماره تماس"
                value={
                  settings.site.phone
                }
                onChange={(v) =>
                  update(
                    "site",
                    "phone",
                    v
                  )
                }
              />

              <Field
                label="ایمیل"
                value={
                  settings.site.email
                }
                onChange={(v) =>
                  update(
                    "site",
                    "email",
                    v
                  )
                }
              />

              <Field
                label="Instagram"
                value={
                  settings.site
                    .instagram
                }
                onChange={(v) =>
                  update(
                    "site",
                    "instagram",
                    v
                  )
                }
              />

              <Field
                label="Telegram"
                value={
                  settings.site
                    .telegram
                }
                onChange={(v) =>
                  update(
                    "site",
                    "telegram",
                    v
                  )
                }
              />

              <Field
                label="YouTube"
                value={
                  settings.site.youtube
                }
                onChange={(v) =>
                  update(
                    "site",
                    "youtube",
                    v
                  )
                }
              />

              <div className="md:col-span-2">
                <Field
                  label="آدرس آموزشگاه"
                  value={
                    settings.site
                      .address
                  }
                  onChange={(v) =>
                    update(
                      "site",
                      "address",
                      v
                    )
                  }
                />
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* =================================================
          MEDIA
      ================================================= */}

      {activeTab === "media" && (
        <div className="space-y-4">
          <Section
            icon={ImageIcon}
            title="تصاویر و برند"
            description="فایل‌ها مستقیماً در Cloudinary ذخیره می‌شوند."
          >
            <div className="space-y-6">
              <UploadBox
                label="لوگوی آموزشگاه"
                description="PNG / JPG / WebP / SVG"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                value={
                  settings.site.logo
                }
                onUploaded={(url) =>
                  update(
                    "site",
                    "logo",
                    url
                  )
                }
                type="image"
              />

              <UploadBox
                label="تصویر اصلی صفحه"
                description="تصویر Hero صفحه اصلی"
                accept="image/*"
                value={
                  settings.site
                    .heroImage
                }
                onUploaded={(url) =>
                  update(
                    "site",
                    "heroImage",
                    url
                  )
                }
                type="image"
              />

              <UploadBox
                label="عکس شخصی استاد"
                description="عکس حرفه‌ای برای پروفایل شما"
                accept="image/*"
                value={
                  settings.site
                    .teacherPhoto
                }
                onUploaded={(url) =>
                  update(
                    "site",
                    "teacherPhoto",
                    url
                  )
                }
                type="image"
              />
            </div>
          </Section>

          <Section
            icon={Video}
            title="ویدیوی معرفی"
            description="ویدیوی معرفی خودتان یا آکادمی"
          >
            <UploadBox
              label="ویدیوی معرفی استاد"
              description="MP4 / MOV / WebM"
              accept="video/mp4,video/webm,video/quicktime"
              value={
                settings.site
                  .introVideo
              }
              onUploaded={(url) =>
                update(
                  "site",
                  "introVideo",
                  url
                )
              }
              type="video"
            />
          </Section>
        </div>
      )}

      {/* =================================================
          RESUME
      ================================================= */}

      {activeTab === "resume" && (
        <div className="space-y-4">
          <Section
            icon={User}
            title="پروفایل استاد"
            description="اطلاعاتی که در سایت درباره شما نمایش داده می‌شود."
          >
            <div className="space-y-4">
              <Field
                label="نام و نام خانوادگی"
                value={
                  settings.site
                    .teacherName
                }
                onChange={(v) =>
                  update(
                    "site",
                    "teacherName",
                    v
                  )
                }
              />

              <Field
                label="عنوان حرفه‌ای"
                value={
                  settings.site
                    .teacherTitle
                }
                onChange={(v) =>
                  update(
                    "site",
                    "teacherTitle",
                    v
                  )
                }
              />

              <Textarea
                label="بیوگرافی کامل"
                value={
                  settings.site
                    .teacherBio
                }
                onChange={(v) =>
                  update(
                    "site",
                    "teacherBio",
                    v
                  )
                }
                rows={7}
              />
            </div>
          </Section>

          <Section
            icon={FileText}
            title="رزومه / CV"
            description="فایل PDF رزومه شخصی شما"
          >
            <UploadBox
              label="آپلود رزومه PDF"
              description="PDF"
              accept=".pdf,application/pdf"
              value={
                settings.site
                  .resumeFile
              }
              onUploaded={(url) =>
                update(
                  "site",
                  "resumeFile",
                  url
                )
              }
              type="file"
            />
          </Section>

          <Section
            icon={Award}
            title="افتخارات و دستاوردها"
            description="جوایز، اجراها، همکاری‌ها و دستاوردهای مهم"
          >
            <div className="space-y-3">
              {(
                settings.site.awards ||
                []
              ).map((award) => (
                <div
                  key={award.id}
                  className="p-4 rounded-xl border border-white/10"
                >
                  <div className="grid md:grid-cols-2 gap-3">
                    <Field
                      label="عنوان افتخار"
                      value={
                        award.title
                      }
                      onChange={(v) =>
                        updateAward(
                          award.id,
                          "title",
                          v
                        )
                      }
                    />

                    <Field
                      label="سال"
                      value={
                        award.year
                      }
                      onChange={(v) =>
                        updateAward(
                          award.id,
                          "year",
                          v
                        )
                      }
                    />

                    <div className="md:col-span-2">
                      <Textarea
                        label="توضیحات"
                        value={
                          award.description
                        }
                        onChange={(v) =>
                          updateAward(
                            award.id,
                            "description",
                            v
                          )
                        }
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeAward(
                        award.id
                      )
                    }
                    className="npa-btn-ghost mt-3 text-red-400"
                  >
                    <Trash2 size={15} />
                    حذف
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addAward}
                className="npa-btn-ghost w-full justify-center"
              >
                <Plus size={16} />
                افزودن افتخار
              </button>
            </div>
          </Section>

          <Section
            icon={Navigation}
            title="سوابق حرفه‌ای"
            description="تجربه‌های کاری، اجراها، پروژه‌ها و همکاری‌ها"
          >
            <div className="space-y-3">
              {(
                settings.site
                  .experiences || []
              ).map((experience) => (
                <div
                  key={experience.id}
                  className="p-4 rounded-xl border border-white/10"
                >
                  <Field
                    label="عنوان سابقه"
                    value={
                      experience.title
                    }
                    onChange={(v) =>
                      updateExperience(
                        experience.id,
                        "title",
                        v
                      )
                    }
                  />

                  <div className="mt-3">
                    <Textarea
                      label="توضیحات"
                      value={
                        experience.description
                      }
                      onChange={(v) =>
                        updateExperience(
                          experience.id,
                          "description",
                          v
                        )
                      }
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeExperience(
                        experience.id
                      )
                    }
                    className="npa-btn-ghost mt-3 text-red-400"
                  >
                    <Trash2 size={15} />
                    حذف
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={
                  addExperience
                }
                className="npa-btn-ghost w-full justify-center"
              >
                <Plus size={16} />
                افزودن سابقه حرفه‌ای
              </button>
            </div>
          </Section>
        </div>
      )}

      {/* =================================================
          COLORS
      ================================================= */}

      {activeTab === "colors" && (
        <Section
          icon={Palette}
          title="مدیریت کامل رنگ‌بندی"
          description="تمام رنگ‌های اصلی رابط کاربری"
        >
          <div className="space-y-4">
            {Object.entries(
              settings.colors
            ).map(([key, value]) => (
              <ColorField
                key={key}
                label={key}
                value={value}
                onChange={(v) =>
                  update(
                    "colors",
                    key,
                    v
                  )
                }
              />
            ))}
          </div>
        </Section>
      )}

      {/* =================================================
          TYPOGRAPHY
      ================================================= */}

      {activeTab === "typography" && (
        <Section
          icon={Type}
          title="فونت و اندازه‌ها"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Field
              label="نام فونت"
              value={
                settings.typography
                  .fontFamily
              }
              onChange={(v) =>
                update(
                  "typography",
                  "fontFamily",
                  v
                )
              }
            />

            <Field
              label="اندازه تیتر"
              type="number"
              value={
                settings.typography
                  .headingSize
              }
              onChange={(v) =>
                update(
                  "typography",
                  "headingSize",
                  v
                )
              }
            />

            <Field
              label="اندازه متن"
              type="number"
              value={
                settings.typography
                  .bodySize
              }
              onChange={(v) =>
                update(
                  "typography",
                  "bodySize",
                  v
                )
              }
            />

            <Field
              label="گردی گوشه‌ها"
              type="number"
              value={
                settings.typography
                  .radius
              }
              onChange={(v) =>
                update(
                  "typography",
                  "radius",
                  v
                )
              }
            />
          </div>
        </Section>
      )}

      {/* =================================================
          HEADER
      ================================================= */}

      {activeTab === "header" && (
        <Section
          icon={Navigation}
          title="هدر و منوی سایت"
        >
          <div className="divide-y divide-white/10">
            <Toggle
              label="نمایش لوگو"
              value={
                settings.header
                  .showLogo
              }
              onChange={(v) =>
                update(
                  "header",
                  "showLogo",
                  v
                )
              }
            />

            <Toggle
              label="نمایش منوی سایت"
              value={
                settings.header
                  .showNavigation
              }
              onChange={(v) =>
                update(
                  "header",
                  "showNavigation",
                  v
                )
              }
            />

            <Toggle
              label="نمایش دکمه ثبت‌نام"
              value={
                settings.header
                  .showRegisterButton
              }
              onChange={(v) =>
                update(
                  "header",
                  "showRegisterButton",
                  v
                )
              }
            />

            <Toggle
              label="هدر چسبان"
              description="هدر هنگام اسکرول بالای صفحه باقی بماند."
              value={
                settings.header
                  .sticky
              }
              onChange={(v) =>
                update(
                  "header",
                  "sticky",
                  v
                )
              }
            />
          </div>
        </Section>
      )}

      {/* =================================================
          HERO
      ================================================= */}

      {activeTab === "hero" && (
        <Section
          icon={Sparkles}
          title="صفحه اصلی"
          description="محتوای بخش اصلی صفحه اول"
        >
          <div className="space-y-4">
            <Toggle
              label="فعال بودن Hero"
              value={
                settings.hero
                  .enabled
              }
              onChange={(v) =>
                update(
                  "hero",
                  "enabled",
                  v
                )
              }
            />

            <Field
              label="تیتر اصلی"
              value={
                settings.hero.title
              }
              onChange={(v) =>
                update(
                  "hero",
                  "title",
                  v
                )
              }
            />

            <Textarea
              label="زیرتیتر"
              value={
                settings.hero
                  .subtitle
              }
              onChange={(v) =>
                update(
                  "hero",
                  "subtitle",
                  v
                )
              }
            />

            <Field
              label="متن دکمه"
              value={
                settings.hero
                  .buttonText
              }
              onChange={(v) =>
                update(
                  "hero",
                  "buttonText",
                  v
                )
              }
            />

            <Toggle
              label="نمایش دکمه"
              value={
                settings.hero
                  .showButton
              }
              onChange={(v) =>
                update(
                  "hero",
                  "showButton",
                  v
                )
              }
            />
          </div>
        </Section>
      )}

      {/* =================================================
          SECTIONS
      ================================================= */}

      {activeTab === "sections" && (
        <Section
          icon={Layout}
          title="بخش‌های سایت"
          description="بخش‌های مختلف صفحه اصلی"
        >
          <div className="divide-y divide-white/10">
            {Object.entries(
              settings.sections
            ).map(
              ([key, value]) => (
                <Toggle
                  key={key}
                  label={key}
                  value={value}
                  onChange={(v) =>
                    update(
                      "sections",
                      key,
                      v
                    )
                  }
                />
              )
            )}
          </div>
        </Section>
      )}

      {/* =================================================
          FOOTER
      ================================================= */}

      {activeTab === "footer" && (
        <Section
          icon={FileText}
          title="فوتر سایت"
        >
          <div className="space-y-4">
            <Toggle
              label="فعال بودن فوتر"
              value={
                settings.footer
                  .enabled
              }
              onChange={(v) =>
                update(
                  "footer",
                  "enabled",
                  v
                )
              }
            />

            <Field
              label="متن فوتر"
              value={
                settings.footer.text
              }
              onChange={(v) =>
                update(
                  "footer",
                  "text",
                  v
                )
              }
            />

            <Toggle
              label="نمایش شبکه‌های اجتماعی"
              value={
                settings.footer
                  .showSocials
              }
              onChange={(v) =>
                update(
                  "footer",
                  "showSocials",
                  v
                )
              }
            />
          </div>
        </Section>
      )}

      {/* =================================================
          ADVANCED
      ================================================= */}

      {activeTab === "advanced" && (
        <Section
          icon={Settings2}
          title="تنظیمات پیشرفته"
          description="کنترل دقیق‌تر ظاهر سایت"
        >
          <div className="space-y-4">
            <Textarea
              label="CSS اختصاصی"
              value={
                settings.advanced
                  .customCss
              }
              onChange={(v) =>
                update(
                  "advanced",
                  "customCss",
                  v
                )
              }
              placeholder="/* CSS */"
              rows={10}
            />

            <Textarea
              label="کد Head"
              value={
                settings.advanced
                  .customHead
              }
              onChange={(v) =>
                update(
                  "advanced",
                  "customHead",
                  v
                )
              }
              placeholder="<!-- HTML -->"
              rows={10}
            />
          </div>
        </Section>
      )}

      {/* =================================================
          SAVE
      ================================================= */}

      <div
        className="npa-card p-4 sticky bottom-4 z-20"
        style={{
          backdropFilter:
            "blur(18px)",
          background:
            "rgba(15,15,17,.92)",
        }}
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={saveSettings}
            className="npa-btn-gold flex-1 justify-center"
          >
            {saved ? (
              <>
                <Check size={17} />
                ذخیره شد
              </>
            ) : (
              <>
                <Save size={17} />
                ذخیره تنظیمات
              </>
            )}
          </button>

          <button
            type="button"
            onClick={resetSettings}
            className="npa-btn-ghost px-4"
            title="بازگردانی تنظیمات"
          >
            <RotateCcw size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}