import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUiProviders } from "@/providers/NextuiProvider";
import { ToastContainer } from "react-toastify";
// import { NextUiProviders } from "@/providers/NextuiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer autoClose={2000} theme="colored"/>
       <NextUiProviders>
           {children}
        </NextUiProviders>
        </body>
    </html>
  );
}
