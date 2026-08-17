import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/russo-one/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "АвтоGM — ремонт и обслуживание автомобилей в Омске",
  description:
    "Автосервис АвтоGM в Омске: диагностика, техническое обслуживание и ремонт легковых автомобилей. Специализация на Chevrolet, Daewoo и Ravon.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
