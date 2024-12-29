"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

interface Trade {
  id: string;
  price: number;
  amount: number;
  type: "buy" | "sell";
  time: Date;
}

export function TradeHistory() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Simulated trade history
    const generateTrade = () => {
      const basePrice = 45000;
      const newTrade: Trade = {
        id: Math.random().toString(36).substr(2, 9),
        price: basePrice + (Math.random() - 0.5) * 100,
        amount: Math.random() * 2,
        type: Math.random() > 0.5 ? "buy" : "sell",
        time: new Date(),
      };

      setTrades((prev) => [newTrade, ...prev].slice(0, 20));
    };

    generateTrade();
    const interval = setInterval(generateTrade, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground">
        <div>Price (USDT)</div>
        <div>Amount (BTC)</div>
        <div>Type</div>
        <div>Time</div>
      </div>
      <div className="space-y-1">
        <AnimatePresence>
          {trades.map((trade) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-4 gap-4 text-sm"
            >
              <div
                className={
                  trade.type === "buy" ? "text-green-500" : "text-red-500"
                }
              >
                {trade.price.toFixed(2)}
              </div>
              <div>{trade.amount.toFixed(8)}</div>
              <div
                className={
                  trade.type === "buy" ? "text-green-500" : "text-red-500"
                }
              >
                {trade.type.toUpperCase()}
              </div>
              <div>{format(trade.time, "HH:mm:ss")}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
