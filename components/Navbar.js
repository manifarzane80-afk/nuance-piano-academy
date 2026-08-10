"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";

import {
  Music2,
  Sun,
  Moon,
  Languages,
  LogOut,
  Home,
} from "lucide-react";

import { useLang } from "@/lib/i18n";


export default function Navbar(){

  const { t, toggle } = useLang();

  const { theme, setTheme } = useTheme();

  const { data: session } = useSession();

  const pathname = usePathname();

  const [mounted,setMounted] = useState(false);


  useEffect(()=>{
    setMounted(true);
  },[]);



  const nav = [

    {
      href:"/",
      label:t.home,
      icon:<Home size={14}/>,
      show:true,
    },


    {
      href:"/register",
      label:t.navRegister,
      show:true,
    },


    {
      href:"/login",
      label:t.navLogin,
      show:!session,
    },


    {
      href:"/student",
      label:t.navStudent,
      show:
        session?.user?.role==="student",
    },


    {
      href:"/teacher",
      label:t.navTeacher,
      show:
        session?.user?.role==="teacher",
    },

  ];



  return (

    <header>


      <div
        className="
        flex items-center justify-between
        gap-3 p-4
        border-b border-line
        "
        style={{
          background:
          "linear-gradient(160deg,var(--panel-2),var(--panel))"
        }}
      >


        <Link
          href="/"
          className="flex items-center gap-2"
        >

          <div
            className="
            w-10 h-10 rounded-[10px]
            flex items-center justify-center
            border border-gold
            "
            style={{
              background:
              "rgba(198,161,91,.1)"
            }}
          >

            <Music2
              size={19}
              style={{
                color:
                "var(--gold-bright)"
              }}
            />

          </div>


          <div>

            <div
              className="
              font-bold text-[13px]
              "
            >
              {t.brand}
            </div>


            <div
              className="
              text-[10.5px]
              text-inkdim
              "
            >
              {t.brandBy}
            </div>


          </div>


        </Link>



        <div
          className="
          flex items-center gap-1.5
          "
        >


          <button
            onClick={toggle}
            className="npa-btn-ghost !p-2"
            type="button"
          >

            <Languages size={16}/>

          </button>



          {
            mounted &&
            <button
              onClick={()=>{

                setTheme(
                  theme==="dark"
                  ?"light"
                  :"dark"
                )

              }}
              className="npa-btn-ghost !p-2"
              type="button"
            >

              {
                theme==="dark"
                ?
                <Sun size={16}/>
                :
                <Moon size={16}/>
              }


            </button>
          }



          {
            session &&
            <button

              onClick={()=>
                signOut({
                  callbackUrl:"/login"
                })
              }

              className="npa-btn-ghost !p-2"
              type="button"
            >

              <LogOut size={16}/>

            </button>
          }


        </div>


      </div>



      <nav
        className="
        flex gap-2
        overflow-x-auto
        px-4 py-2
        npa-scroll
        "
      >

        {
          nav
          .filter(x=>x.show)
          .map(item=>(


            <Link

              key={item.href}

              href={item.href}

              className={`
              npa-tab
              whitespace-nowrap
              flex items-center gap-1

              ${
                pathname===item.href
                ?
                "active"
                :
                ""
              }

              `}

            >

              {item.icon}

              {item.label}


            </Link>


          ))
        }


      </nav>


    </header>

  );

}