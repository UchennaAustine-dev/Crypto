"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/lib/theme-context";

interface PortfolioStatsProps {
  data: Array<{
    date: string;
    value: number;
  }>;
}

export function PortfolioStats({ data }: PortfolioStatsProps) {
  const { theme } = useTheme();

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            style={{ fontSize: "12px" }}
            tick={{ fill: theme === "dark" ? "#888" : "#333" }}
          />
          <YAxis
            style={{ fontSize: "12px" }}
            tick={{ fill: theme === "dark" ? "#888" : "#333" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0088FE"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
