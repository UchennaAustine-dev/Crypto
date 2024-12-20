"use client";

import { PageTransition } from "@/components/page-transition";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const services = [
    {
      title: "Advanced Trading Platform",
      description:
        "Execute trades with precision using our state-of-the-art trading interface. Access real-time market data, advanced charting tools, and customizable indicators.",
      icon: <BarChart2 className="w-8 h-8 text-[#186CCC]" />,
    },
    {
      title: "Intelligent Portfolio Management",
      description:
        "Optimize your crypto portfolio with AI-driven insights. Track performance, analyze risk, and receive personalized investment recommendations.",
      icon: <Zap className="w-8 h-8 text-[#186CCC]" />,
    },
    {
      title: "Secure Asset Storage",
      description:
        "Keep your digital assets safe with our industry-leading security measures. Multi-signature wallets, cold storage, and 24/7 monitoring protect your investments.",
      icon: <Shield className="w-8 h-8 text-[#186CCC]" />,
    },
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-20 bg-gradient-to-b from-[#DFEAF8] to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-8 text-[#20446F]">
            Our Services
          </h1>
          <p className="text-xl text-[#849EC0] mb-12 max-w-3xl">
            Discover a suite of powerful tools and services designed to elevate
            your crypto trading experience. From advanced analytics to secure
            storage, we&#39;ve got you covered.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white p-6 rounded-lg shadow-lg border border-[#DFEAF8]"
              >
                <div className="mb-4">{service.icon}</div>
                <h2 className="text-2xl font-semibold mb-4 text-[#20446F]">
                  {service.title}
                </h2>
                <p className="text-[#849EC0] mb-6">{service.description}</p>
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
