"use client";

import { PageTransition } from "@/components/page-transition";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-8 text-[#FA802F]">
            Our Services
          </h1>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#F3E8CA]/5 p-6 rounded-lg border border-[#F3E8CA]/10"
            >
              <h2 className="text-2xl font-semibold mb-4">Trading Platform</h2>
              <p className="text-[#9C8B73]">
                Advanced trading tools and real-time market data to help you
                make informed decisions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#F3E8CA]/5 p-6 rounded-lg border border-[#F3E8CA]/10"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Portfolio Management
              </h2>
              <p className="text-[#9C8B73]">
                Track and manage your crypto investments with our intuitive
                portfolio tools.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
