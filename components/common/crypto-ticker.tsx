"use client";

import React, { useState, useEffect } from "react";

const SYMBOLS = {
  BTC: "bitcoin",
  ETH: "ethereum",
  LTC: "litecoin",
  XRP: "ripple",
  ADA: "cardano",
  DOGE: "dogecoin",
  SOL: "solana",
  DOT: "polkadot",
  BNB: "binancecoin",
  SHIB: "shiba-inu",
  AVAX: "avalanche-2",
  MATIC: "matic-network",
  LINK: "chainlink",
  UNI: "uniswap",
} as const;

type SymbolKey = keyof typeof SYMBOLS;
type PriceData = { price: number; change: number };
type Prices = Record<SymbolKey, PriceData>;

const CryptoTicker: React.FC = () => {
  const [prices, setPrices] = useState<Prices>(() =>
    Object.keys(SYMBOLS).reduce(
      (acc, key) => ({
        ...acc,
        [key]: { price: 0, change: 0 },
      }),
      {} as Prices
    )
  );

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = Object.values(SYMBOLS).join(",");
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const newPrices = Object.entries(SYMBOLS).reduce(
          (acc, [key, coinId]) => {
            const coinData = data[coinId];
            if (coinData) {
              acc[key as SymbolKey] = {
                price: coinData.usd,
                change: coinData.usd_24h_change,
              };
            }
            return acc;
          },
          {} as Prices
        );

        setPrices(newPrices);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    // Fetch immediately
    fetchPrices();

    // Then fetch every 30 seconds
    const interval = setInterval(fetchPrices, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number): string => {
    if (price < 1) {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      }).format(price);
    }
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change: number): string =>
    `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;

  return (
    <div className="flex items-center bg-black text-white text-sm font-mono overflow-hidden w-full">
      <div className="flex animate-marquee">
        {Object.entries(prices).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center px-4 py-1 border-r border-gray-700 whitespace-nowrap"
          >
            <span
              className={`mr-2 ${
                value.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {formatChange(value.change)}
            </span>
            <span className="mr-2">{key}/USD</span>
            <span
              className={`${
                value.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {formatPrice(value.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoTicker;
