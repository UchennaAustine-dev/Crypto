"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-[#186CCC]" />,
      title: "Lightning-Fast Trades",
      description:
        "Execute trades at the speed of light with our cutting-edge infrastructure.",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#186CCC]" />,
      title: "Bank-Grade Security",
      description:
        "Your assets are protected by state-of-the-art security measures and insurance.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#186CCC]" />,
      title: "Community-Driven",
      description:
        "Join a thriving community of traders and investors sharing insights.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#DFEAF8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#20446F]">
            Your <span className="text-[#186CCC]">trusted</span> partner in
            <br />
            cryptocurrency trading.
          </h2>
          <p className="text-[#849EC0] text-lg">
            CryptoFlow unites cutting-edge technology with user-friendly
            interfaces, creating a secure and efficient trading ecosystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-[#20446F]">
                    {feature.title}
                  </h3>
                  <p className="text-[#849EC0] text-sm mb-4">
                    {feature.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-[#186CCC] hover:text-[#186CCC]/80 p-0 flex items-center"
                  >
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
