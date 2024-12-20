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

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80">
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
        >
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="border-[#849EC0]/30"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="crypto@example.com"
              className="border-[#849EC0]/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="border-[#849EC0]/30"
            />
          </div>
        </motion.form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full bg-[#186CCC] hover:bg-[#186CCC]/90 text-white">
          {isLogin ? "Sign In" : "Create Account"}
        </Button>
        <Button
          variant="ghost"
          className="text-[#849EC0]"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </CardFooter>
    </Card>
  );
}
