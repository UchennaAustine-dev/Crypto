"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/whats-new", label: "What's new?" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-[#849EC0]/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
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
            className="bg-[#186CCC] text-white hover:bg-[#186CCC]/90 transition-colors"
          >
            <Link href="/auth">Explore now</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
