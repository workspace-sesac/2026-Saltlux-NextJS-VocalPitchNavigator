// Path: /vpn-app/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/src/common/components/QueryProvider"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vocal Pitch Note",
  description: "실시간 음성 트래킹 및 연습 다이어리",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-gray-900 dark:text-gray-100">
        <header className="bg-white dark:bg-zinc-900 shadow-sm p-4 w-full border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto font-bold text-xl text-blue-600 dark:text-blue-400">
            🎙️ Vocal Pitch Note
          </div>
        </header>
        <QueryProvider>
          <main className="flex-1 w-full max-w-3xl mx-auto p-4 flex flex-col">
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
