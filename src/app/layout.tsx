import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "$s | tildesu",
    default: "tildesu"
  },
  description: "Добро пожаловать на Tildesu — социальную сеть для студентов, преподавателей и сотрудников университета. Общайтесь, делитесь новостями, участвуйте в событиях и находите новых друзей в удобной и современной платформе, разработанной специально для университетской жизни!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
