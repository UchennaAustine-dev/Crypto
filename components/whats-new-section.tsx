"use client";

import { motion } from "framer-motion";
import { Shield, RefreshCw, ArrowRightLeft, Code } from "lucide-react";
import Image from "next/image";
import actualImage from "@/public/images/device.png";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Advanced Security",
    description:
      "We use state-of-the-art storage technology to protect your assets",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Recurring Buys",
    description: "Automate your investment strategy with scheduled purchases",
  },
  {
    icon: <ArrowRightLeft className="w-6 h-6" />,
    title: "More On-Ramps",
    description: "Multiple payment methods and fiat currency support",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Trading API",
    description: "Build custom trading solutions with our robust API",
  },
];

export function WhatsNewSection() {
  return (
    <section className="py-20 bg-[#20446F]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-[#DFEAF8]">
              What's <span className="text-[#186CCC]">new</span> we
              <br />
              provide for you?
            </h2>
            <p className="text-[#849EC0] mb-12 max-w-lg">
              Discover our latest features and improvements designed to enhance
              your trading experience and maximize your investment potential.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#186CCC]/10 flex items-center justify-center text-[#186CCC]">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-[#DFEAF8] font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#849EC0] text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Image
                src={actualImage}
                alt="Mobile app"
                width={300}
                height={600}
                className="mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#186CCC]/20 to-transparent blur-xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
