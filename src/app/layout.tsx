import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "A Design Confidence Index",
  description:
    "A Design Confidence Index pulls insights from 69 polled undergraduate students from Simon Fraser University’s School of Interactive Arts and Technology (SIAT), asking the sample for insights into their perceptions and practices in visual design, creativity, and AI usage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-r-base antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
