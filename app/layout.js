import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Nuance Piano Academy",
  description:
    "Nuance Piano Academy — Piano education and student management system by Mani Farzaneh",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
    >
      <body
        className="lang-fa"
        suppressHydrationWarning
      >
        <Providers>
          <div className="max-w-[480px] mx-auto min-h-screen bg-bg text-ink flex flex-col">

            <Navbar />

            <main className="px-4 py-5 flex-1">
              {children}
            </main>

          </div>
        </Providers>
      </body>
    </html>
  );
}