import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/global.css";
import LogoutButton from "./_components/LogoutButton";
import { checkAuthStatus } from "@/lib/actions/auth.actions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BariBondhon",
  description: "Your Complete Rental Management Solution!",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = await checkAuthStatus();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-slate-50 to-slate-200 safe-area-all`}
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        }}
      >
        <div className="w-full max-w-md mx-auto bg-white rounded-[30px] shadow-[0_25px_80px_rgba(0,0,0,0.15)] overflow-hidden relative min-h-[calc(100vh-2.5rem)] flex flex-col">
          <div className="safe-area-top">
            {children}
          </div>
          <LogoutButton isLoggedIn={isLoggedIn} />
        </div>
      </body>
    </html>
  );
}
