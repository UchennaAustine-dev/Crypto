"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
  { value: 4000 },
  { value: 3000 },
  { value: 5000 },
  { value: 2780 },
  { value: 1890 },
  { value: 2390 },
  { value: 3490 },
];

export function ChartSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <Card className="bg-gray-900/50 border-gray-800 p-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm text-gray-400">Average Rate</p>
              <h3 className="text-2xl font-bold">$4,528 USD</h3>
              <p className="text-sm text-[#CCFF00]">+2.34%</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Current Balance</p>
              <h3 className="text-2xl font-bold">1.444328 BTC</h3>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#CCFF00"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
}
