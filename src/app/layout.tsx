import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CGPA Calculator | B.E. Mechanical Engineering - Reg. 2022",
  description:
    "Calculate your GPA and CGPA for B.E. Mechanical Engineering (Regulation 2022, Anna University, ACGCET). All 58 curriculum subjects pre-loaded with accurate grade point computation.",
  keywords:
    "CGPA calculator, GPA calculator, Anna University, Mechanical Engineering, Regulation 2022, ACGCET",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
