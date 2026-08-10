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
  Home,
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
      href: "/",
      label: t.home || "خانه",
      icon: Home,
      show: true,
    },
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
    <header>

      {/* Top Brand */}
      <div
        className="flex items-center justify-between p-4 border-b border-line"
        style={{
          background:
            "linear-gradient(135deg,var(--panel-2),var(--panel))",
        }}
      >

        <Link
          href="/"
          className="flex items-center gap-3 min-w-0"
        >

          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center border"
            style={{
              borderColor:"var(--gold)",
              background:"rgba(198,161,91,.12)"
            }}
          >
            <Music2
              size={21}
              style={{
                color:"var(--gold-bright)"
              }}
            />
          </div>


          <div className="min-w-0">

            <div
              className="font-bold text-sm whitespace-nowrap"
            >
              {t.brand || "Nuance Piano Academy"}
            </div>


            <div
              className="text-[11px] text-inkdim whitespace-nowrap"
            >
              {t.brandBy || "by Mani Farzaneh"}
            </div>

          </div>

        </Link>



        <div className="flex items-center gap-1.5">


          <button
            type="button"
            onClick={toggle}
            className="npa-btn-ghost !p-2"
          >
            <Languages size={16}/>
          </button>



          {mounted && (
            <button
              type="button"
              onClick={() =>
                setTheme(
                  theme === "dark"
                  ? "light"
                  : "dark"
                )
              }
              className="npa-btn-ghost !p-2"
            >
              {
                theme === "dark"
                ?
                <Sun size={16}/>
                :
                <Moon size={16}/>
              }
            </button>
          )}



          {session && (
            <button
              type="button"
              className="npa-btn-ghost !p-2"
              onClick={() =>
                signOut({
                  callbackUrl:"/login"
                })
              }
            >
              <LogOut size={16}/>
            </button>
          )}


        </div>

      </div>



      {/* Navigation */}
      <nav
        className="
        flex gap-2 overflow-x-auto
        px-4 py-3
        npa-scroll
        "
      >

        {
          nav
          .filter(item=>item.show)
          .map(item=>{

            const Icon=item.icon;

            return (

              <Link
                key={item.href}
                href={item.href}
                className={`
                npa-tab
                whitespace-nowrap
                flex items-center gap-1.5
                ${pathname===item.href ? "active":""}
                `}
              >

                {
                  Icon &&
                  <Icon size={14}/>
                }

                {item.label}

              </Link>

            );

          })
        }


      </nav>


    </header>
  );
}