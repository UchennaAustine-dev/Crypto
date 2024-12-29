"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-context";

interface TradingViewChartProps {
  symbol?: string;
  interval?: string;
}

export function TradingViewChart({
  symbol = "BTCUSDT",
  interval = "1D",
}: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (container.current && window.TradingView) {
        new window.TradingView.widget({
          symbol: `BINANCE:${symbol}`,
          interval: interval,
          timezone: "Etc/UTC",
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: container.current.id,
          width: "100%",
          height: "100%",
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [symbol, interval, theme]);

  return (
    <div
      id={`tradingview_${symbol}`}
      ref={container}
      className="w-full h-full"
    />
  );
}
