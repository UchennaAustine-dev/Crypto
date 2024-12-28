"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import actualimage from "@/public/images/device.png";
import { TickerTape } from "./common/ticker-tape";

export function HeroSection() {
  const MotionImage = motion(Image);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#DFEAF8] to-white">
      <div className="w-[90%] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#20446F]">
              Trade Smarter
              <br />
              <span className="text-[#186CCC]">Not Harder</span>
              <br />
              with CryptoFlow
            </h1>

            <p className="text-[#849EC0] text-base sm:text-lg max-w-md">
              Join over <strong>16,000+</strong> traders who&apos;ve discovered
              the power of intelligent crypto trading. Real-time analytics,
              AI-powered insights, and seamless execution.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                asChild
                aria-label="Start trading now"
                className="bg-[#186CCC] text-white hover:bg-[#186CCC]/90 px-6 py-4 text-base sm:text-lg w-full sm:w-auto"
              >
                <Link href="/auth">Start Trading</Link>
              </Button>
              <Button
                variant="outline"
                aria-label="Watch a demo of CryptoFlow"
                className="border-[#186CCC] text-[#186CCC] hover:bg-[#186CCC]/10 px-6 py-4 text-base sm:text-lg w-full sm:w-auto"
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
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden"
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

          <MotionImage
            src={actualimage}
            alt="Trading interface"
            width={500}
            height={600}
            animate={shouldReduceMotion ? {} : { y: [0, -20, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-2xl shadow-2xl ml-auto w-full max-w-md sm:max-w-lg lg:max-w-xl"
          />
        </div>
      </div>
      <div className="my-6">
        <TickerTape />
      </div>
    </section>
  );
}
