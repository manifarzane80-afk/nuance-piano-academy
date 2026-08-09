import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Nuance Piano Academy",
  description: "Student management system for Nuance Piano Academy — by Mani Farzaneh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="lang-fa" suppressHydrationWarning>
        <Providers>
          <div className="max-w-[480px] mx-auto min-h-screen pb-10 bg-bg text-ink">
            <Navbar />
            <div className="px-4 py-5">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
