"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export function OrderBook() {
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);

  useEffect(() => {
    // Simulated order book data
    const mockOrderBook = () => {
      const basePrice = 45000;
      const newAsks = Array.from({ length: 10 }, (_, i) => ({
        price: basePrice + (i + 1) * 10 + Math.random() * 5,
        amount: Math.random() * 2,
        total: 0,
      }));
      const newBids = Array.from({ length: 10 }, (_, i) => ({
        price: basePrice - (i + 1) * 10 - Math.random() * 5,
        amount: Math.random() * 2,
        total: 0,
      }));

      // Calculate totals
      let askTotal = 0;
      let bidTotal = 0;
      newAsks.forEach((ask) => {
        askTotal += ask.amount;
        ask.total = askTotal;
      });
      newBids.forEach((bid) => {
        bidTotal += bid.amount;
        bid.total = bidTotal;
      });

      setAsks(newAsks);
      setBids(newBids);
    };

    mockOrderBook();
    const interval = setInterval(mockOrderBook, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm">
      <div className="grid grid-cols-3 gap-4 mb-2 text-muted-foreground">
        <div>Price (USDT)</div>
        <div>Amount (BTC)</div>
        <div>Total</div>
      </div>

      <div className="space-y-1">
        <AnimatePresence>
          {asks.map((ask, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 gap-4 text-red-500"
            >
              <div>{ask.price.toFixed(2)}</div>
              <div>{ask.amount.toFixed(8)}</div>
              <div>{ask.total.toFixed(8)}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="my-2 text-xl font-bold text-center">45,123.45</div>

      <div className="space-y-1">
        <AnimatePresence>
          {bids.map((bid, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 gap-4 text-green-500"
            >
              <div>{bid.price.toFixed(2)}</div>
              <div>{bid.amount.toFixed(8)}</div>
              <div>{bid.total.toFixed(8)}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
