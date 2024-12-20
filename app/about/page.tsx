"use client";

import { PageTransition } from "@/components/page-transition";
import { motion, useReducedMotion } from "framer-motion";

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageTransition>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1
            className="text-5xl font-bold mb-8 text-[#FA802F]"
            aria-label="About Us Page Title"
          >
            About Us
          </h1>
          <div className="max-w-3xl">
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#9C8B73] mb-6"
            >
              We’re building the future of cryptocurrency trading and
              investment. Our platform combines cutting-edge technology with
              user-friendly interfaces to make crypto accessible to everyone.
            </motion.p>
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#F3E8CA]/5 p-6 rounded-lg border border-[#F3E8CA]/10"
              aria-label="Our Mission Section"
            >
              <h2
                className="text-2xl font-semibold mb-4"
                aria-label="Our Mission Heading"
              >
                Our Mission
              </h2>
              <p className="text-[#9C8B73]">
                To democratize access to cryptocurrency investments and provide
                the most secure and efficient trading platform in the market.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
