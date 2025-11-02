import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BariBondhu",
  description: "Your Complete Rental Management Solution!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-slate-50 to-slate-200`}
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
