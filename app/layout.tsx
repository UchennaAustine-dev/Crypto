import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
// import { Navigation } from "@/components/common/navigation";
import { Toaster } from "react-hot-toast";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Trading Platform",
  description: "Best crypto investing platform for your future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navigation /> */}
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
