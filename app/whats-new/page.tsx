"use client";

import { PageTransition } from "@/components/page-transition";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Zap, Shield, Coins, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsNewPage() {
  const shouldReduceMotion = useReducedMotion();

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-[#186CCC]" />,
      title: "Lightning-Fast Trades",
      description:
        "Our new trade execution engine processes orders up to 10x faster, ensuring you never miss a market opportunity.",
      date: "March 2024",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#186CCC]" />,
      title: "Enhanced Security Measures",
      description:
        "We&#39;ve implemented advanced biometric authentication and real-time fraud detection to keep your assets safer than ever.",
      date: "February 2024",
    },
    {
      icon: <Coins className="w-8 h-8 text-[#186CCC]" />,
      title: "Multi-Chain Support",
      description:
        "Trade assets across multiple blockchains seamlessly with our new cross-chain integration feature.",
      date: "January 2024",
    },
    {
      icon: <Users className="w-8 h-8 text-[#186CCC]" />,
      title: "Social Trading",
      description:
        "Follow top traders, share strategies, and learn from the community with our new social trading platform.",
      date: "December 2023",
    },
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-20 bg-gradient-to-b from-[#DFEAF8] to-white">
        <div className="container mx-auto px-4">
          <h1
            className="text-5xl font-bold mb-8 text-[#20446F]"
            aria-label="What&#39;s New Page Title"
          >
            What&#39;s New at CryptoFlow
          </h1>
          <p className="text-xl text-[#849EC0] mb-12 max-w-3xl">
            We&#39;re constantly innovating to provide you with the best crypto
            trading experience. Check out our latest features and improvements
            designed to enhance your trading journey.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : i * 0.1,
                  duration: 0.5,
                }}
                className="bg-white p-6 rounded-lg shadow-lg border border-[#DFEAF8]"
                aria-label={`Feature Card ${i + 1}`}
              >
                <div className="mb-4">{feature.icon}</div>
                <div
                  className="text-sm text-[#849EC0] mb-2"
                  aria-label="Release Date"
                >
                  {feature.date}
                </div>
                <h2
                  className="text-xl font-semibold mb-4 text-[#20446F]"
                  aria-label="Feature Title"
                >
                  {feature.title}
                </h2>
                <p
                  className="text-[#849EC0] mb-6"
                  aria-label="Feature Description"
                >
                  {feature.description}
                </p>
                <Button
                  variant="ghost"
                  className="text-[#186CCC] hover:text-[#186CCC]/80 p-0"
                >
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
