"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Music2,
  Sun,
  Moon,
  Languages,
  LogOut,
} from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { toggle, t } = useLang();
  const { data: session } = useSession();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nav = [
    {
      href: "/register",
      label: t.navRegister || "ثبت‌نام",
      show: true,
    },
    {
      href: "/login",
      label: t.navLogin || "ورود",
      show: !session,
    },
    {
      href: "/student",
      label: t.navStudent || "پنل هنرجو",
      show: session?.user?.role === "student",
    },
    {
      href: "/teacher",
      label: t.navTeacher || "پنل استاد",
      show: session?.user?.role === "teacher",
    },
  ];

  return (
    <div className="w-full">

      {/* Header */}
      <div
        className="flex items-center justify-between gap-3 p-4 border-b border-line"
        style={{
          background:
            "linear-gradient(160deg, var(--panel-2), var(--panel))",
        }}
      >

        <div className="flex items-center gap-2 min-w-0">

          <div
            className="w-10 h-10 rounded-[10px] flex items-center justify-center border border-gold shrink-0"
            style={{
              background:
                "rgba(198,161,91,.1)",
            }}
          >
            <Music2
              size={19}
              style={{
                color: "var(--gold-bright)",
              }}
            />
          </div>

          <div className="min-w-0">
            <div className="font-bold text-[13px] truncate">
              {t.brand || "Nuance Piano Academy"}
            </div>

            <div className="text-[10.5px] text-inkdim truncate">
              {t.brandBy || "by Mani Farzaneh"}
            </div>
          </div>

        </div>

        <div className="flex items-center gap-1.5">

          <button
            onClick={toggle}
            className="npa-btn-ghost !p-2"
            title="FA / EN"
            type="button"
          >
            <Languages size={16} />
          </button>

          {mounted && (
            <button
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
              className="npa-btn-ghost !p-2"
              title="theme"
              type="button"
            >
              {theme === "dark" ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>
          )}

          {session && (
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
              className="npa-btn-ghost !p-2"
              title={
                t.navLogout || "خروج"
              }
              type="button"
            >
              <LogOut size={16} />
            </button>
          )}

        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-1.5 overflow-x-auto npa-scroll px-4 py-2">

        {nav
          .filter((item) => item.show)
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`npa-tab whitespace-nowrap ${
                pathname?.startsWith(item.href)
                  ? "active"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

      </div>

    </div>
  );
}