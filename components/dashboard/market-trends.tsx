"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

declare global {
  interface Window {
    TradingView: any;
  }
}

export function MarketTrends() {
  const containerRef: any = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: "100%",
      height: "500",
      plotLineColorGrowing: "rgba(41, 98, 255, 1)",
      plotLineColorFalling: "rgba(41, 98, 255, 1)",
      gridLineColor: "rgba(240, 243, 250, 0)",
      scaleFontColor: "rgba(106, 109, 120, 1)",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: [
        {
          title: "Indices",
          symbols: [
            {
              s: "FOREXCOM:SPXUSD",
              d: "S&P 500",
            },
            {
              s: "FOREXCOM:NSXUSD",
              d: "US 100",
            },
            {
              s: "FOREXCOM:DJI",
              d: "Dow 30",
            },
            {
              s: "INDEX:NKY",
              d: "Nikkei 225",
            },
            {
              s: "INDEX:DEU40",
              d: "DAX Index",
            },
            {
              s: "FOREXCOM:UKXGBP",
              d: "UK 100",
            },
          ],
          originalTitle: "Indices",
        },
        {
          title: "Futures",
          symbols: [
            {
              s: "CME_MINI:ES1!",
              d: "S&P 500",
            },
            {
              s: "CME:6E1!",
              d: "Euro",
            },
            {
              s: "COMEX:GC1!",
              d: "Gold",
            },
            {
              s: "NYMEX:CL1!",
              d: "Crude Oil",
            },
            {
              s: "COMEX:SI1!",
              d: "Silver",
            },
          ],
          originalTitle: "Futures",
        },
        {
          title: "Crypto",
          symbols: [
            {
              s: "BINANCE:BTCUSDT",
              d: "Bitcoin",
            },
            {
              s: "BINANCE:ETHUSDT",
              d: "Ethereum",
            },
            {
              s: "BINANCE:XRPUSDT",
              d: "Ripple",
            },
            {
              s: "BINANCE:DOGEUSDT",
              d: "Dogecoin",
            },
            {
              s: "BINANCE:ADAUSDT",
              d: "Cardano",
            },
          ],
          originalTitle: "Crypto",
        },
      ],
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} />
      </CardContent>
    </Card>
  );
}
