"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  BarChart2,
  Wallet,
  RefreshCcw,
  Settings,
  HelpCircle,
  ChevronLeft,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Overview", href: "/dashboard" },
  { icon: BarChart2, label: "Trading", href: "/dashboard/trading" },
  { icon: Wallet, label: "Portfolio", href: "/dashboard/portfolio" },
  { icon: RefreshCcw, label: "Transactions", href: "/dashboard/transactions" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative h-screen bg-card dark:bg-gray-800 border-r border-border dark:border-gray-700",
        "flex flex-col z-20"
      )}
    >
      <div className="flex items-center justify-between p-6">
        <Link
          href="/"
          className={cn(
            "text-primary font-bold text-2xl transition-opacity duration-200",
            isCollapsed && "opacity-0"
          )}
        >
          CRYPTO.
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-accent"
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isCollapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 my-1 rounded-lg transition-colors",
              "hover:bg-accent/50 dark:hover:bg-gray-700/50",
              pathname === item.href &&
                "bg-accent dark:bg-gray-700 text-primary"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span
              className={cn(
                "transition-opacity duration-200",
                isCollapsed && "opacity-0"
              )}
            >
              {item.label}
            </span>
            {pathname === item.href && (
              <motion.div
                layoutId="activeNav"
                className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
              />
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg",
            "hover:bg-accent/50 dark:hover:bg-gray-700/50"
          )}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span
            className={cn(
              "transition-opacity duration-200",
              isCollapsed && "opacity-0"
            )}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>
    </motion.div>
  );
}
