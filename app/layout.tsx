"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/bootstrap-icons.css";
import "@/styles/bootstrap.min.css";
import "@/styles/tooplate-crispy-kitchen.css";
import "@/js/bootstrap.min.js";
import "@/js/custom";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
