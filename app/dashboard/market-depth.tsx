"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/lib/theme-context";

interface DepthData {
  price: number;
  bids: number;
  asks: number;
}

export function MarketDepth() {
  const [data, setData] = useState<DepthData[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    // Simulated market depth data
    const generateData = () => {
      const basePrice = 45000;
      const newData = Array.from({ length: 100 }, (_, i) => {
        const price = basePrice + (i - 50) * 100;
        return {
          price,
          bids: i < 50 ? Math.exp(-0.1 * (50 - i)) * 100 : 0,
          asks: i >= 50 ? Math.exp(-0.1 * (i - 50)) * 100 : 0,
        };
      });
      setData(newData);
    };

    generateData();
    const interval = setInterval(generateData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="price"
          type="number"
          domain={["dataMin", "dataMax"]}
          tick={{ fill: theme === "dark" ? "#888" : "#333" }}
        />
        <YAxis tick={{ fill: theme === "dark" ? "#888" : "#333" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
            border: "none",
            borderRadius: "8px",
          }}
        />
        <Area
          type="monotone"
          dataKey="bids"
          stackId="1"
          stroke="#22c55e"
          fill="#22c55e"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="asks"
          stackId="2"
          stroke="#ef4444"
          fill="#ef4444"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
