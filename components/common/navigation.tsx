"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
// import CryptoTicker from "./crypto-ticker";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Importing Lucide icons
import { TickerTape } from "./ticker-tape";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/whats-new", label: "What's new?" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-[#849EC0]/10"
    >
      <div className="w-[90%] mx-auto px-2 py-4 flex items-center justify-between">
        <Link href="/" className="text-[#186CCC] font-bold text-2xl">
          CRYPTO.
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative group">
              <span
                className={`text-[#20446F] hover:text-[#186CCC] transition-colors ${
                  pathname === item.href ? "text-[#186CCC]" : ""
                }`}
              >
                {item.label}
              </span>
              {pathname === item.href && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 top-full h-0.5 w-full bg-[#186CCC]"
                />
              )}
            </Link>
          ))}
        </div>

        <Button
          asChild
          className="bg-[#186CCC] text-white hover:bg-[#186CCC]/90 transition-colors hidden md:block"
        >
          <Link href="/auth">Explore now</Link>
        </Button>

        <button onClick={toggleMenu} className="md:hidden text-[#186CCC]">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/80 backdrop-blur-sm border-t border-[#849EC0]/10"
        >
          <div className="space-y-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-[#20446F] hover:text-[#186CCC] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-[#186CCC] text-white hover:bg-[#186CCC]/90 transition-colors w-full"
            >
              <Link href="/auth">Explore now</Link>
            </Button>
          </div>
        </motion.div>
      )}

      <div className="block">
        {/* <CryptoTicker /> */}
        <TickerTape />
      </div>
    </motion.nav>
  );
}
