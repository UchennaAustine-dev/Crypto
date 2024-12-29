"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { TradingViewChart } from "../trading-view-chart";
import { MarketDepth } from "../market-depth";
import { OrderBook } from "../order-book";
import { TradeHistory } from "../trade-history";

export default function TradingPage() {
  const [orderType, setOrderType] = useState("limit");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTrade = async (type: "buy" | "sell") => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          orderType,
          amount,
          price,
          pair: "BTC/USDT",
        }),
      });

      if (!response.ok) throw new Error("Trade failed");

      toast.success(`${type.toUpperCase()} order placed successfully`);
      setAmount("");
      setPrice("");
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-4 gap-8"
      >
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>BTC/USDT</CardTitle>
            </CardHeader>
            <CardContent className="h-[600px]">
              <TradingViewChart symbol="BTCUSDT" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="limit" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="limit">Limit</TabsTrigger>
                  <TabsTrigger value="market">Market</TabsTrigger>
                </TabsList>
                <TabsContent value="limit" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USDT)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (BTC)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleTrade("buy")}
                      disabled={isSubmitting}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Buy BTC
                    </Button>
                    <Button
                      onClick={() => handleTrade("sell")}
                      disabled={isSubmitting}
                      variant="destructive"
                    >
                      Sell BTC
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="market" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="market-amount">Amount (BTC)</Label>
                    <Input
                      id="market-amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleTrade("buy")}
                      disabled={isSubmitting}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Buy BTC
                    </Button>
                    <Button
                      onClick={() => handleTrade("sell")}
                      disabled={isSubmitting}
                      variant="destructive"
                    >
                      Sell BTC
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Book</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderBook />
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Market Depth</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <MarketDepth />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trade History</CardTitle>
          </CardHeader>
          <CardContent>
            <TradeHistory />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
