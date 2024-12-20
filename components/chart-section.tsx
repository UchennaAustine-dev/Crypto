"use client";

import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import { Bitcoin, BitcoinIcon as Litecoin, DollarSign } from "lucide-react";

const data = [
  { name: "Jan", btc: 4000, ltc: 3000, usd: 2400 },
  { name: "Feb", btc: 3000, ltc: 2780, usd: 3908 },
  { name: "Mar", btc: 5000, ltc: 1890, usd: 4800 },
  { name: "Apr", btc: 2780, ltc: 2390, usd: 3800 },
  { name: "May", btc: 1890, ltc: 3490, usd: 4300 },
  { name: "Jun", btc: 2390, ltc: 3490, usd: 4300 },
];

export function ChartSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white border border-[#849EC0]/20 shadow-lg p-6">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Bitcoin className="w-5 h-5 text-[#186CCC]" />
                  <span className="text-[#20446F] font-medium">Bitcoin</span>
                </div>
                <p className="text-2xl font-bold text-[#20446F]">$45,282</p>
                <p className="text-emerald-500 text-sm">+5.7%</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Litecoin className="w-5 h-5 text-[#186CCC]" />
                  <span className="text-[#20446F] font-medium">Litecoin</span>
                </div>
                <p className="text-2xl font-bold text-[#20446F]">$142.35</p>
                <p className="text-emerald-500 text-sm">+3.2%</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#186CCC]" />
                  <span className="text-[#20446F] font-medium">
                    Portfolio Value
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#20446F]">$86,429</p>
                <p className="text-emerald-500 text-sm">+12.8%</p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <YAxis hide={true} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="btc"
                    stroke="#186CCC"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="ltc"
                    stroke="#20446F"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="usd"
                    stroke="#849EC0"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
