"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon, ShieldCheckIcon, TrendingUpIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function StepsSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const router = useRouter();

  const handleNavigationClick = () => {
    router.push("/auth");
  };

  return (
    <section className="py-20 bg-[#DFEAF8]">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-[#20446F]"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
        >
          Build your <span className="text-[#186CCC]">crypto</span> portfolio
        </motion.h2>
        <motion.p
          className="text-[#849EC0] text-center mb-12 max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeInUp}
        >
          CryptoFlow unites and secures a growing ecosystem of specialized
          blockchain technologies, empowering you to build a diverse portfolio.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div variants={fadeInUp}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#DFEAF8] flex items-center justify-center mx-auto mb-6">
                  <UserIcon className="w-8 h-8 text-[#186CCC]" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#20446F]">
                  Fund your account
                </h3>
                <p className="text-[#849EC0] text-sm mb-6">
                  Add funds to your crypto account to start trading crypto.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-[#186CCC] text-white hover:bg-[#155bb5] transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Verify your identity
                </h3>
                <p className="text-white/80 text-sm mb-6">
                  Complete the identity verification process to secure your
                  account.
                </p>
                <Button
                  variant="secondary"
                  className="bg-white text-[#186CCC] hover:bg-white/90"
                  aria-label="Learn more about identity verification"
                  onClick={handleNavigationClick}
                >
                  Learn More →
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#DFEAF8] flex items-center justify-center mx-auto mb-6">
                  <TrendingUpIcon className="w-8 h-8 text-[#186CCC]" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#20446F]">
                  Start trading
                </h3>
                <p className="text-[#849EC0] text-sm mb-6">
                  You&apos;re good to go! Buy/sell crypto, set up recurring buys
                  for your investments.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
