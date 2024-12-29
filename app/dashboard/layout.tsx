"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { toast } from "react-hot-toast";
import { ThemeProvider } from "@/lib/theme-context";
import { motion, AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/route/protected-route";

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const userData: User = await response.json();
          setUser(userData);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        toast.error("Failed to load user data. Please log in again.");
        router.push("/auth");
      }
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <ThemeProvider>
        <div className="flex h-screen bg-background transition-colors duration-200 dark:bg-gray-900">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header user={user} />
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname} // Use pathname as key
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-x-hidden overflow-y-auto bg-background dark:bg-gray-900"
              >
                {children}
              </motion.main>
            </AnimatePresence>
          </div>
        </div>
      </ThemeProvider>
    </ProtectedRoute>
  );
}
