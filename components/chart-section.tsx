// "use client";

// import React, { useState, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Bitcoin, Wallet, DollarSign } from "lucide-react";

// // Type definitions
// type PortfolioStats = {
//   btcPrice: number;
//   ethPrice: number;
//   totalValue: number;
//   btcChange: number;
//   ethChange: number;
//   totalChange: number;
// };

// const ChartSection = () => {
//   const [portfolioStats, setPortfolioStats] = useState<PortfolioStats>({
//     btcPrice: 0,
//     ethPrice: 0,
//     totalValue: 0,
//     btcChange: 0,
//     ethChange: 0,
//     totalChange: 0,
//   });

//   useEffect(() => {
//     // Load TradingView widget script
//     const script = document.createElement("script");
//     script.src =
//       "https://cdnjs.cloudflare.com/ajax/libs/tradingview/1.0.0/tv.js";
//     script.async = true;
//     document.body.appendChild(script);

//     const fetchCryptoData = async () => {
//       try {
//         const response = await fetch(
//           "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
//         );
//         const data = await response.json();

//         setPortfolioStats({
//           btcPrice: data.bitcoin.usd,
//           ethPrice: data.ethereum.usd,
//           totalValue: data.bitcoin.usd * 0.5 + data.ethereum.usd * 2,
//           btcChange: data.bitcoin.usd_24h_change,
//           ethChange: data.ethereum.usd_24h_change,
//           totalChange:
//             (data.bitcoin.usd_24h_change + data.ethereum.usd_24h_change) / 2,
//         });
//       } catch (error) {
//         console.error("Error fetching crypto data:", error);
//       }
//     };

//     fetchCryptoData();
//     const interval = setInterval(fetchCryptoData, 60000);

//     return () => {
//       clearInterval(interval);
//       document.body.removeChild(script);
//     };
//   }, []);

//   useEffect(() => {
//     // Initialize TradingView widgets after the script loads
//     if (window.TradingView) {
//       new window.TradingView.widget({
//         container_id: "tradingview-btc",
//         symbol: "BINANCE:BTCUSDT",
//         interval: "1D",
//         theme: "light",
//         style: "1",
//         width: "100%",
//         height: "400",
//         save_image: false,
//         hide_side_toolbar: false,
//         allow_symbol_change: true,
//         details: true,
//         hotlist: true,
//         calendar: true,
//       });

//       new window.TradingView.widget({
//         container_id: "tradingview-eth",
//         symbol: "BINANCE:ETHUSDT",
//         interval: "1D",
//         theme: "light",
//         style: "1",
//         width: "100%",
//         height: "400",
//         save_image: false,
//         hide_side_toolbar: false,
//         allow_symbol_change: true,
//         details: true,
//         hotlist: true,
//         calendar: true,
//       });
//     }
//   }, []);

//   const formatCurrency = (value: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(value);
//   };

//   const formatChange = (value: number) => {
//     return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
//   };

//   return (
//     <section className="py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="max-w-6xl mx-auto">
//           <Card className="bg-white border border-gray-200 shadow-xl p-6 mb-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <Bitcoin className="w-6 h-6 text-orange-500" />
//                   <span className="text-gray-800 font-medium">Bitcoin</span>
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(portfolioStats.btcPrice)}
//                 </p>
//                 <p
//                   className={`text-sm font-medium ${
//                     portfolioStats.btcChange >= 0
//                       ? "text-emerald-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {formatChange(portfolioStats.btcChange)}
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <Wallet className="w-6 h-6 text-blue-500" />
//                   <span className="text-gray-800 font-medium">Ethereum</span>
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(portfolioStats.ethPrice)}
//                 </p>
//                 <p
//                   className={`text-sm font-medium ${
//                     portfolioStats.ethChange >= 0
//                       ? "text-emerald-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {formatChange(portfolioStats.ethChange)}
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <DollarSign className="w-6 h-6 text-green-500" />
//                   <span className="text-gray-800 font-medium">
//                     Portfolio Value
//                   </span>
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(portfolioStats.totalValue)}
//                 </p>
//                 <p
//                   className={`text-sm font-medium ${
//                     portfolioStats.totalChange >= 0
//                       ? "text-emerald-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {formatChange(portfolioStats.totalChange)}
//                 </p>
//               </div>
//             </div>
//           </Card>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <Card className="p-4">
//               <h3 className="text-lg font-semibold mb-4">Bitcoin Chart</h3>
//               <div id="tradingview-btc" className="w-full h-96"></div>
//             </Card>
//             <Card className="p-4">
//               <h3 className="text-lg font-semibold mb-4">Ethereum Chart</h3>
//               <div id="tradingview-eth" className="w-full h-96"></div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ChartSection;

// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   LineChart,
//   Line,
//   ResponsiveContainer,
//   YAxis,
//   Tooltip,
//   XAxis,
// } from "recharts";
// import { Card } from "@/components/ui/card";
// import { Bitcoin, Wallet, DollarSign } from "lucide-react";

// // Type definitions
// type ChartDataPoint = {
//   timestamp: string;
//   BTC: number;
//   ETH: number;
//   TOTAL: number;
// };

// const ChartSection = () => {
//   const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
//   const [portfolioStats, setPortfolioStats] = useState({
//     btcPrice: 0,
//     ethPrice: 0,
//     totalValue: 0,
//     btcChange: 0,
//     ethChange: 0,
//     totalChange: 0,
//   });

//   useEffect(() => {
//     const fetchCryptoData = async () => {
//       try {
//         const response = await fetch(
//           "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
//         );
//         const data = await response.json();

//         // Update portfolio stats
//         setPortfolioStats({
//           btcPrice: data.bitcoin.usd,
//           ethPrice: data.ethereum.usd,
//           totalValue: data.bitcoin.usd * 0.5 + data.ethereum.usd * 2, // Example portfolio
//           btcChange: data.bitcoin.usd_24h_change,
//           ethChange: data.ethereum.usd_24h_change,
//           totalChange:
//             (data.bitcoin.usd_24h_change + data.ethereum.usd_24h_change) / 2,
//         });

//         // Add new data point
//         setChartData((prevData) => {
//           const newPoint = {
//             timestamp: new Date().toLocaleTimeString(),
//             BTC: data.bitcoin.usd,
//             ETH: data.ethereum.usd,
//             TOTAL: data.bitcoin.usd * 0.5 + data.ethereum.usd * 2,
//           };

//           // Keep last 24 data points
//           const updatedData = [...prevData, newPoint].slice(-24);
//           return updatedData;
//         });
//       } catch (error) {
//         console.error("Error fetching crypto data:", error);
//       }
//     };

//     fetchCryptoData();
//     const interval = setInterval(fetchCryptoData, 60000); // Update every minute

//     return () => clearInterval(interval);
//   }, []);

//   const formatCurrency = (value: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(value);
//   };

//   const formatChange = (value: number) => {
//     return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
//   };

//   return (
//     <section className="py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-4xl mx-auto"
//         >
//           <Card className="bg-white border border-gray-200 shadow-xl p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <Bitcoin className="w-6 h-6 text-orange-500" />
//                   <span className="text-gray-800 font-medium">Bitcoin</span>
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(portfolioStats.btcPrice)}
//                 </p>
//                 <p
//                   className={`text-sm font-medium ${
//                     portfolioStats.btcChange >= 0
//                       ? "text-emerald-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {formatChange(portfolioStats.btcChange)}
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <Wallet className="w-6 h-6 text-blue-500" />
//                   <span className="text-gray-800 font-medium">Ethereum</span>
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(portfolioStats.ethPrice)}
//                 </p>
//                 <p
//                   className={`text-sm font-medium ${
//                     portfolioStats.ethChange >= 0
//                       ? "text-emerald-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {formatChange(portfolioStats.ethChange)}
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <DollarSign className="w-6 h-6 text-green-500" />
//                   <span className="text-gray-800 font-medium">
//                     Portfolio Value
//                   </span>
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(portfolioStats.totalValue)}
//                 </p>
//                 <p
//                   className={`text-sm font-medium ${
//                     portfolioStats.totalChange >= 0
//                       ? "text-emerald-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {formatChange(portfolioStats.totalChange)}
//                 </p>
//               </div>
//             </div>

//             <div className="h-72">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={chartData}>
//                   <XAxis
//                     dataKey="timestamp"
//                     tick={{ fontSize: 12 }}
//                     interval="preserveStartEnd"
//                   />
//                   <YAxis
//                     width={80}
//                     tick={{ fontSize: 12 }}
//                     tickFormatter={(value) => `$${value.toLocaleString()}`}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "white",
//                       border: "1px solid #e2e8f0",
//                       borderRadius: "0.5rem",
//                       padding: "8px",
//                     }}
//                     formatter={(value: number) => [
//                       `$${value.toLocaleString()}`,
//                       "",
//                     ]}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="BTC"
//                     stroke="#f59e0b"
//                     strokeWidth={2}
//                     dot={false}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="ETH"
//                     stroke="#3b82f6"
//                     strokeWidth={2}
//                     dot={false}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="TOTAL"
//                     stroke="#10b981"
//                     strokeWidth={2}
//                     dot={false}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </Card>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ChartSection;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Card } from "@/components/ui/card";
// import { Bitcoin, Wallet, DollarSign } from "lucide-react";

// const ChartSection = () => {
//   React.useEffect(() => {
//     const loadTradingViewScript = () => {
//       const script = document.createElement("script");
//       script.src =
//         "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
//       script.async = true;
//       script.innerHTML = JSON.stringify({
//         symbol: "BINANCE:BTCUSDT",
//         width: "100%",
//         colorTheme: "light",
//         isTransparent: false,
//         locale: "en",
//       });
//       document.getElementById("tv-price-btc")?.appendChild(script);

//       const scriptEth = document.createElement("script");
//       scriptEth.src =
//         "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
//       scriptEth.async = true;
//       scriptEth.innerHTML = JSON.stringify({
//         symbol: "BINANCE:ETHUSDT",
//         width: "100%",
//         colorTheme: "light",
//         isTransparent: false,
//         locale: "en",
//       });
//       document.getElementById("tv-price-eth")?.appendChild(scriptEth);

//       const scriptChart = document.createElement("script");
//       scriptChart.src =
//         "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
//       scriptChart.async = true;
//       scriptChart.innerHTML = JSON.stringify({
//         width: "100%",
//         height: 500,
//         symbol: "BINANCE:BTCUSDT",
//         interval: "D",
//         timezone: "Etc/UTC",
//         theme: "light",
//         style: "1",
//         locale: "en",
//         enable_publishing: false,
//         allow_symbol_change: true,
//         calendar: false,
//         support_host: "https://www.tradingview.com",
//         studies: ["RSI@tv-basicstudies", "MASimple@tv-basicstudies"],
//       });
//       document.getElementById("tv-chart-advanced")?.appendChild(scriptChart);
//     };

//     loadTradingViewScript();

//     // Cleanup function
//     return () => {
//       const containers = ["tv-price-btc", "tv-price-eth", "tv-chart-advanced"];
//       containers.forEach((id) => {
//         const container = document.getElementById(id);
//         if (container) {
//           while (container.firstChild) {
//             container.removeChild(container.firstChild);
//           }
//         }
//       });
//     };
//   }, []);

//   return (
//     <section className="py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-6xl mx-auto"
//         >
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             <Card className="p-6 border border-gray-200 shadow-xl">
//               <div className="flex items-center gap-2 mb-4">
//                 <Bitcoin className="w-6 h-6 text-orange-500" />
//                 <span className="text-gray-800 font-medium">
//                   Bitcoin (BTCUSDT)
//                 </span>
//               </div>
//               <div id="tv-price-btc" className="w-full h-20"></div>
//             </Card>

//             <Card className="p-6 border border-gray-200 shadow-xl">
//               <div className="flex items-center gap-2 mb-4">
//                 <Wallet className="w-6 h-6 text-blue-500" />
//                 <span className="text-gray-800 font-medium">
//                   Ethereum (ETHUSDT)
//                 </span>
//               </div>
//               <div id="tv-price-eth" className="w-full h-20"></div>
//             </Card>
//           </div>

//           <Card className="p-6 border border-gray-200 shadow-xl">
//             <div className="flex items-center gap-2 mb-4">
//               <DollarSign className="w-6 h-6 text-green-500" />
//               <span className="text-gray-800 font-medium">
//                 Advanced Chart Analysis
//               </span>
//             </div>
//             <div id="tv-chart-advanced" className="w-full"></div>
//           </Card>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ChartSection;

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Bitcoin, Wallet, DollarSign, Coins } from "lucide-react";

// Trading pairs configuration
const TRADING_PAIRS = [
  {
    symbol: "BTCUSDT",
    name: "Bitcoin",
    icon: Bitcoin,
    color: "text-orange-500",
  },
  { symbol: "ETHUSDT", name: "Ethereum", icon: Wallet, color: "text-blue-500" },
  { symbol: "SOLUSDT", name: "Solana", icon: Coins, color: "text-purple-500" },
  { symbol: "BNBUSDT", name: "BNB", icon: Coins, color: "text-yellow-500" },
];

const ChartSection = () => {
  const [selectedPair, setSelectedPair] = useState("BTCUSDT");

  React.useEffect(() => {
    const loadTradingViewWidgets = () => {
      // Load price widgets for all trading pairs
      TRADING_PAIRS.forEach((pair) => {
        const script = document.createElement("script");
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
          symbol: `BINANCE:${pair.symbol}`,
          width: "100%",
          colorTheme: "light",
          isTransparent: false,
          locale: "en",
        });
        document.getElementById(`tv-price-${pair.symbol}`)?.appendChild(script);
      });

      // Load advanced chart with multiple technical indicators
      const scriptChart = document.createElement("script");
      scriptChart.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      scriptChart.async = true;
      scriptChart.innerHTML = JSON.stringify({
        width: "100%",
        height: 600,
        symbol: `BINANCE:${selectedPair}`,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: true,
        calendar: false,
        support_host: "https://www.tradingview.com",
        studies: [
          "RSI@tv-basicstudies",
          "MASimple@tv-basicstudies",
          "MACD@tv-basicstudies",
          "AwesomeOscillator@tv-basicstudies",
          "BollingerBandsR@tv-basicstudies",
          "IchimokuCloud@tv-basicstudies",
          "PivotPointsHighLow@tv-basicstudies",
          "VolumeProfile@tv-basicstudies",
        ],
        studies_overrides: {
          "volume.volume.transparency": 50,
          "volume.volume ma.transparency": 50,
          "volume.volume ma.visible": true,
          "volume.volume ma.color": "#FF0000",
          "volume.volume ma.linewidth": 1,
          "volume.volume ma.length": 20,
        },
      });
      document.getElementById("tv-chart-advanced")?.appendChild(scriptChart);
    };

    loadTradingViewWidgets();

    // Cleanup function
    return () => {
      const containers = [
        ...TRADING_PAIRS.map((pair) => `tv-price-${pair.symbol}`),
        "tv-chart-advanced",
      ];
      containers.forEach((id) => {
        const container = document.getElementById(id);
        if (container) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
      });
    };
  }, [selectedPair]);

  return (
    <section className="py-6 md:py-12 bg-white">
      <div className="container mx-auto px-2 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Price Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            {TRADING_PAIRS.map((pair) => (
              <Card
                key={pair.symbol}
                className={`p-4 md:p-6 border border-gray-200 shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                  selectedPair === pair.symbol ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedPair(pair.symbol)}
              >
                <div className="flex items-center gap-2 mb-4">
                  <pair.icon
                    className={`w-5 h-5 md:w-6 md:h-6 ${pair.color}`}
                  />
                  <span className="text-gray-800 font-medium text-sm md:text-base">
                    {pair.name}
                  </span>
                </div>
                <div
                  id={`tv-price-${pair.symbol}`}
                  className="w-full h-16 md:h-20"
                ></div>
              </Card>
            ))}
          </div>

          {/* Advanced Chart Card */}
          <Card className="p-4 md:p-6 border border-gray-200 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                <span className="text-gray-800 font-medium text-sm md:text-base">
                  Advanced Technical Analysis
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Selected Pair:</span>
                <span className="font-semibold">{selectedPair}</span>
              </div>
            </div>
            <div id="tv-chart-advanced" className="w-full"></div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ChartSection;
