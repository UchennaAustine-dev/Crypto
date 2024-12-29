"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log(`data`, data);

      if (response.ok) {
        toast.success(
          isLogin ? "Logged in successfully!" : "Registered successfully!"
        );
        router.push("/dashboard");
      } else {
        toast.error(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-20 backdrop-blur-sm bg-white/80">
      <CardHeader>
        <CardTitle className="text-[#20446F] text-2xl">
          {isLogin ? "Welcome Back" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-[#849EC0]">
          {isLogin
            ? "Enter your credentials to access your account"
            : "Join thousands of crypto traders and investors"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.form
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="crypto@example.com"
              className="border-[#849EC0]/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="border-[#849EC0]/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </motion.form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          className="w-full bg-[#186CCC] hover:bg-[#186CCC]/90 text-white"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2" />
              Processing...
            </>
          ) : isLogin ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </Button>
        <Button
          variant="ghost"
          className="text-[#849EC0]"
          onClick={() => setIsLogin(!isLogin)}
          disabled={isLoading}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </CardFooter>
    </Card>
  );
}
