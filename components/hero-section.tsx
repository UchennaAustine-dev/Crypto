"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#DFEAF8] to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-[#20446F]">
              Trade Smarter
              <br />
              <span className="text-[#186CCC]">Not Harder</span>
              <br />
              with CryptoFlow
            </h1>

            <p className="text-[#849EC0] text-lg max-w-md">
              Join over <strong>16,000+</strong> traders who&apos;ve discovered
              the power of intelligent crypto trading. Real-time analytics,
              AI-powered insights, and seamless execution.
            </p>

            <div className="flex items-center gap-4">
              <Button
                asChild
                aria-label="Start trading now"
                className="bg-[#186CCC] text-white hover:bg-[#186CCC]/90 px-8 py-6 text-lg"
              >
                <Link href="/auth">Start Trading</Link>
              </Button>
              <Button
                variant="outline"
                aria-label="Watch a demo of CryptoFlow"
                className="border-[#186CCC] text-[#186CCC] hover:bg-[#186CCC]/10 px-8 py-6 text-lg"
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={`User avatar ${i + 1}`}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="text-[#20446F]">
                <span className="font-bold">16K+</span> Active Traders
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[600px]">
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -20, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-64"
              >
                <Image
                  src="/placeholder.svg?height=600&width=300"
                  alt="Illustration of a trading interface"
                  width={300}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 20, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute top-20 right-20 w-64"
              >
                <Image
                  src="/placeholder.svg?height=600&width=300"
                  alt="Analytics dashboard interface"
                  width={300}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
