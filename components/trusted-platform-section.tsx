"use client";

import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const data = [
  { value: 4000 },
  { value: 3000 },
  { value: 5000 },
  { value: 2780 },
  { value: 1890 },
  { value: 2390 },
  { value: 3490 },
];

export function TrustedPlatformSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#DFEAF8] to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <Card className="bg-white border border-[#849EC0]/20 shadow-lg p-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[#186CCC] text-sm font-medium">
                    Current Value
                  </p>
                  <h3 className="text-2xl font-bold text-[#20446F]">
                    $4,528 USD
                  </h3>
                  <p className="text-emerald-500 text-sm">+45.66%</p>
                </div>
                <div className="text-right">
                  <p className="text-[#849EC0] text-sm">Balance</p>
                  <h3 className="text-xl font-bold text-[#20446F]">
                    1,44.528 BTC
                  </h3>
                </div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <YAxis hide={true} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#186CCC"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-[#20446F]">
              Trusted <span className="text-[#186CCC]">platform</span>
              <br />
              anytime & anywhere.
            </h2>

            <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-[#186CCC]"
                  fill="#186CCC"
                />
              ))}
            </div>

            <p className="text-[#849EC0] max-w-lg">
              Experience the power of our secure and reliable trading platform,
              trusted by thousands of traders worldwide. Access your portfolio
              and execute trades seamlessly from any device.
            </p>

            <p className="text-[#849EC0] max-w-lg">
              Our platform combines cutting-edge technology with an intuitive
              interface, making cryptocurrency trading accessible to everyone.
            </p>

            <div className="flex items-center space-x-4">
              <Button className="bg-[#186CCC] text-white hover:bg-[#186CCC]/90">
                Learn More →
              </Button>
              <button className="text-[#849EC0] hover:text-[#20446F] transition-colors">
                Ask question ?
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
