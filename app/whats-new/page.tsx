"use client";

import { PageTransition } from "@/components/page-transition";
import { motion, useReducedMotion } from "framer-motion";

export default function WhatsNewPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageTransition>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1
            className="text-5xl font-bold mb-8 text-[#FA802F]"
            aria-label="What's New Page Title"
          >
            What’s New
          </h1>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : i * 0.1,
                  duration: 0.5,
                }}
                className="bg-[#F3E8CA]/5 p-6 rounded-lg border border-[#F3E8CA]/10"
                aria-label={`Feature Card ${i}`}
              >
                <div
                  className="text-sm text-[#9C8B73] mb-2"
                  aria-label="Release Date"
                >
                  January 2024
                </div>
                <h2
                  className="text-xl font-semibold mb-4"
                  aria-label="Feature Title"
                >
                  New Feature Release
                </h2>
                <p className="text-[#9C8B73]" aria-label="Feature Description">
                  Enhanced security features and improved trading interface for
                  better user experience.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
