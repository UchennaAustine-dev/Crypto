"use client";

import { PageTransition } from "@/components/page-transition";
import { motion, useReducedMotion } from "framer-motion";
import { Users, TrendingUp, Shield, Globe } from "lucide-react";

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    {
      label: "Active Users",
      value: "500K+",
      icon: <Users className="w-6 h-6 text-[#186CCC]" />,
    },
    {
      label: "Daily Transactions",
      value: "$1B+",
      icon: <TrendingUp className="w-6 h-6 text-[#186CCC]" />,
    },
    {
      label: "Security Rating",
      value: "A+",
      icon: <Shield className="w-6 h-6 text-[#186CCC]" />,
    },
    {
      label: "Countries Served",
      value: "180+",
      icon: <Globe className="w-6 h-6 text-[#186CCC]" />,
    },
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-20 bg-gradient-to-b from-[#DFEAF8] to-white">
        <div className="container mx-auto px-4">
          <h1
            className="text-5xl font-bold mb-8 text-[#20446F]"
            aria-label="About Us Page Title"
          >
            About CryptoFlow
          </h1>
          <div className="max-w-3xl mb-12">
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#849EC0] mb-6"
            >
              At CryptoFlow, we&#39;re not just building a platform; we&#39;re
              shaping the future of finance. Our mission is to democratize
              access to cryptocurrency investments and provide the most secure,
              efficient, and user-friendly trading experience in the market.
            </motion.p>
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-[#849EC0] mb-6"
            >
              Founded in 2020 by a team of blockchain enthusiasts and fintech
              experts, CryptoFlow has quickly grown to become a trusted name in
              the crypto space. We combine cutting-edge technology with
              intuitive design to make crypto trading accessible to everyone,
              from beginners to seasoned professionals.
            </motion.p>
          </div>
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-lg shadow-lg border border-[#DFEAF8] mb-12"
            aria-label="Our Vision Section"
          >
            <h2
              className="text-3xl font-semibold mb-4 text-[#20446F]"
              aria-label="Our Vision Heading"
            >
              Our Vision
            </h2>
            <p className="text-[#849EC0] text-lg">
              We envision a world where digital assets are seamlessly integrated
              into everyday financial transactions. CryptoFlow aims to be at the
              forefront of this revolution, providing the tools and
              infrastructure needed to make crypto as easy to use as traditional
              currencies.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white p-6 rounded-lg shadow-lg border border-[#DFEAF8] text-center"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#20446F] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#849EC0]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
