// "use client";

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";

// // Initial fallback data in case there's no historical data yet
// const INITIAL_FALLBACK_DATA = {
//   bitcoin: { usd: 65000, usd_24h_change: 0 },
//   ethereum: { usd: 3500, usd_24h_change: 0 },
//   // ... minimal initial fallbacks for critical failures on first load
// } as const;

// const SYMBOLS = {
//   // Major Cryptocurrencies
//   BTC: "bitcoin",
//   ETH: "ethereum",
//   USDT: "tether",
//   BNB: "binancecoin",
//   SOL: "solana",
//   XRP: "ripple",
//   USDC: "usd-coin",
//   ADA: "cardano",

//   // DeFi Tokens
//   AVAX: "avalanche-2",
//   LINK: "chainlink",
//   UNI: "uniswap",
//   AAVE: "aave",

//   // Layer 2 & Scaling
//   MATIC: "matic-network",
//   OP: "optimism",
//   ARB: "arbitrum",

//   // Emerging Platforms
//   DOT: "polkadot",
//   ATOM: "cosmos",
//   NEAR: "near",
// } as const;

// type SymbolKey = keyof typeof SYMBOLS;
// type PriceData = {
//   price: number;
//   change: number;
//   lastUpdated: number;
//   isStale?: boolean;
//   confidence: "real" | "cached" | "stale";
// };
// type Prices = Record<SymbolKey, PriceData>;

// // Enhanced cache interface
// interface CacheData {
//   prices: Prices;
//   timestamp: number;
//   historicalPrices: {
//     [key: string]: {
//       price: number;
//       change: number;
//       timestamp: number;
//     }[];
//   };
// }

// const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
// const STALE_DATA_THRESHOLD = 10 * 60 * 1000; // 10 minutes
// const API_RETRY_DELAY = 5000; // 5 seconds
// const MAX_HISTORICAL_ENTRIES = 100; // Keep last 100 price points per symbol

// const CryptoTicker = () => {
//   const [prices, setPrices] = useState<Prices>(() => {
//     // Initialize with empty data
//     return Object.keys(SYMBOLS).reduce(
//       (acc, key) => ({
//         ...acc,
//         [key]: {
//           price: 0,
//           change: 0,
//           lastUpdated: Date.now(),
//           confidence: "stale",
//         },
//       }),
//       {} as Prices
//     );
//   });

//   const [historicalData, setHistoricalData] = useState<
//     CacheData["historicalPrices"]
//   >({});
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const lastFetchRef = useRef<number>(0);
//   const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     // Try to load cached data on initial render
//     try {
//       const cachedPrices = localStorage.getItem("cryptoPrices");
//       if (cachedPrices) {
//         const { prices, timestamp }: CacheData = JSON.parse(cachedPrices);
//         // Mark cached data as stale if it's too old
//         const now = Date.now();
//         setPrices((prevPrices) =>
//           Object.entries(prices).reduce(
//             (acc, [key, value]) => ({
//               ...acc,
//               [key]: {
//                 ...value,
//                 confidence:
//                   now - value.lastUpdated > STALE_DATA_THRESHOLD
//                     ? "stale"
//                     : "cached",
//               },
//             }),
//             prevPrices
//           )
//         );
//       }

//       const cachedHistory = localStorage.getItem("cryptoHistory");
//       if (cachedHistory) {
//         setHistoricalData(JSON.parse(cachedHistory));
//       }
//     } catch (e) {
//       console.warn("Error loading cached data:", e);
//     }
//   }, []);

//   const updateHistoricalData = useCallback((newPrices: Prices) => {
//     setHistoricalData((prev) => {
//       const updated = { ...prev };

//       Object.entries(newPrices).forEach(([symbol, data]) => {
//         if (!updated[symbol]) {
//           updated[symbol] = [];
//         }

//         updated[symbol].push({
//           price: data.price,
//           change: data.change,
//           timestamp: Date.now(),
//         });

//         // Keep only the last MAX_HISTORICAL_ENTRIES entries
//         if (updated[symbol].length > MAX_HISTORICAL_ENTRIES) {
//           updated[symbol] = updated[symbol].slice(-MAX_HISTORICAL_ENTRIES);
//         }
//       });

//       // Save to localStorage
//       try {
//         localStorage.setItem("cryptoHistory", JSON.stringify(updated));
//       } catch (e) {
//         console.warn("Error saving historical data:", e);
//       }

//       return updated;
//     });
//   }, []);

//   const getLastKnownGoodPrice = useCallback(
//     (symbol: string) => {
//       const history = historicalData[symbol];
//       if (!history?.length) {
//         const fallback =
//           INITIAL_FALLBACK_DATA[symbol as keyof typeof INITIAL_FALLBACK_DATA];
//         return fallback
//           ? {
//               price: fallback.usd,
//               change: fallback.usd_24h_change,
//               timestamp: Date.now(),
//             }
//           : null;
//       }

//       // Find the most recent price that's not too old
//       const recentPrices = history
//         .filter((entry) => Date.now() - entry.timestamp < STALE_DATA_THRESHOLD)
//         .sort((a, b) => b.timestamp - a.timestamp);

//       return recentPrices[0] || history[history.length - 1] || null;
//     },
//     [historicalData]
//   );

//   const fetchPrices = useCallback(async () => {
//     // Rate limiting
//     const now = Date.now();
//     if (now - lastFetchRef.current < 30000) {
//       return;
//     }
//     lastFetchRef.current = now;

//     try {
//       const ids = Object.values(SYMBOLS).join(",");
//       const response = await axios.get(
//         `https://api.coingecko.com/api/v3/simple/price`,
//         {
//           params: {
//             ids: ids,
//             vs_currencies: "usd",
//             include_24hr_change: true,
//           },
//         }
//       );

//       const data = response.data;

//       const newPrices = Object.entries(SYMBOLS).reduce((acc, [key, coinId]) => {
//         const coinData = data[coinId];
//         if (coinData) {
//           acc[key as SymbolKey] = {
//             price: coinData.usd,
//             change: coinData.usd_24h_change,
//             lastUpdated: now,
//             confidence: "real",
//           };
//         } else {
//           // Use last known good price if available
//           const lastKnownPrice = getLastKnownGoodPrice(coinId);
//           if (lastKnownPrice) {
//             acc[key as SymbolKey] = {
//               price: lastKnownPrice.price,
//               change: lastKnownPrice.change,
//               lastUpdated: lastKnownPrice.timestamp,
//               confidence: "cached",
//             };
//           }
//         }
//         return acc;
//       }, {} as Prices);

//       setPrices(newPrices);
//       updateHistoricalData(newPrices);

//       // Cache the full state
//       try {
//         localStorage.setItem(
//           "cryptoPrices",
//           JSON.stringify({
//             prices: newPrices,
//             timestamp: now,
//             historicalPrices: historicalData,
//           })
//         );
//       } catch (e) {
//         console.warn("Error caching prices:", e);
//       }

//       setError(null);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching prices:", error);

//       // Use last known good prices for all symbols
//       const fallbackPrices = Object.entries(SYMBOLS).reduce(
//         (acc, [key, coinId]) => {
//           const lastKnownPrice = getLastKnownGoodPrice(coinId);
//           if (lastKnownPrice) {
//             acc[key as SymbolKey] = {
//               price: lastKnownPrice.price,
//               change: lastKnownPrice.change,
//               lastUpdated: lastKnownPrice.timestamp,
//               confidence: "stale",
//             };
//           }
//           return acc;
//         },
//         {} as Prices
//       );

//       setPrices(fallbackPrices);
//       setError("Using last known good prices. Unable to fetch latest data.");

//       // Retry after delay
//       retryTimeoutRef.current = setTimeout(() => {
//         fetchPrices();
//       }, API_RETRY_DELAY);
//     }
//   }, [getLastKnownGoodPrice, historicalData, updateHistoricalData]);

//   useEffect(() => {
//     fetchPrices();

//     const interval = setInterval(() => {
//       fetchPrices();
//     }, 60000); // Poll every minute

//     return () => {
//       clearInterval(interval);
//       if (retryTimeoutRef.current) {
//         clearTimeout(retryTimeoutRef.current);
//       }
//     };
//   }, [fetchPrices]);

//   const formatPrice = useCallback((price: number): string => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: price < 1 ? 4 : 2,
//       maximumFractionDigits: price < 1 ? 4 : 2,
//     }).format(price);
//   }, []);

//   const formatChange = useCallback(
//     (change: number): string =>
//       `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
//     []
//   );

//   const getDataAge = useCallback((lastUpdated: number): string => {
//     const minutes = Math.floor((Date.now() - lastUpdated) / 60000);
//     if (minutes < 1) return "Just now";
//     if (minutes === 1) return "1 min ago";
//     return `${minutes} mins ago`;
//   }, []);

//   if (isLoading && Object.values(prices).every((p) => p.price === 0)) {
//     return (
//       <div className="bg-gray-900 text-white p-2 text-center">
//         <div className="animate-pulse">Loading cryptocurrency data...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-900 text-white overflow-hidden w-full">
//       {error && (
//         <div className="bg-yellow-900/20 text-yellow-200 text-xs p-1 text-center">
//           {error}
//         </div>
//       )}
//       <div className="flex animate-marquee">
//         {Object.entries(prices).map(([key, value]) => (
//           <div
//             key={key}
//             className={`flex items-center px-4 py-2 border-r border-gray-700 whitespace-nowrap hover:bg-gray-800 transition-colors ${
//               value.confidence !== "real" ? "opacity-75" : ""
//             }`}
//           >
//             <div className="flex flex-col">
//               <div className="flex items-center">
//                 <span className="font-medium mr-2">{key}</span>
//                 <span className="mr-2">{formatPrice(value.price)}</span>
//                 <span
//                   className={`text-sm ${
//                     value.change >= 0 ? "text-green-400" : "text-red-400"
//                   }`}
//                 >
//                   {formatChange(value.change)}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 text-xs text-gray-400">
//                 <span>{getDataAge(value.lastUpdated)}</span>
//                 {value.confidence !== "real" && (
//                   <span className="text-yellow-400">
//                     ({value.confidence === "cached" ? "Cached" : "Stale"})
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CryptoTicker;
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const SYMBOLS = {
  // Major Cryptocurrencies
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
  BNB: "binancecoin",
  SOL: "solana",
  XRP: "ripple",
  USDC: "usd-coin",
  ADA: "cardano",

  // DeFi Tokens
  AVAX: "avalanche-2",
  LINK: "chainlink",
  UNI: "uniswap",
  AAVE: "aave",

  // Layer 2 & Scaling
  MATIC: "matic-network",
  OP: "optimism",
  ARB: "arbitrum",

  // Emerging Platforms
  DOT: "polkadot",
  ATOM: "cosmos",
  NEAR: "near",
} as const;

type SymbolKey = keyof typeof SYMBOLS;
type PriceData = {
  price: number;
  change: number;
  lastUpdated: number;
  confidence: "real" | "cached" | "stale";
};
type Prices = Record<SymbolKey, PriceData>;

// Enhanced cache interface
interface CacheData {
  prices: Prices;
  timestamp: number;
  historicalPrices: {
    [key: string]: {
      price: number;
      change: number;
      timestamp: number;
    }[];
  };
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const STALE_DATA_THRESHOLD = 10 * 60 * 1000; // 10 minutes
const API_RETRY_DELAY = 5000; // 5 seconds
const MAX_HISTORICAL_ENTRIES = 100; // Keep last 100 price points per symbol

const CryptoTicker = () => {
  const [prices, setPrices] = useState<Prices>(() => {
    // Initialize with empty data
    return Object.keys(SYMBOLS).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          price: 0,
          change: 0,
          lastUpdated: Date.now(),
          confidence: "stale",
        },
      }),
      {} as Prices
    );
  });

  const [historicalData, setHistoricalData] = useState<
    CacheData["historicalPrices"]
  >({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastKnownGoodPrices, setLastKnownGoodPrices] = useState<Prices | any>(
    {}
  );
  const lastFetchRef = useRef<number>(0);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Try to load cached data on initial render
    try {
      const cachedPrices = localStorage.getItem("cryptoPrices");
      if (cachedPrices) {
        const { prices, timestamp }: CacheData = JSON.parse(cachedPrices);
        // Mark cached data as stale if it's too old
        const now = Date.now();
        setPrices((prevPrices) =>
          Object.entries(prices).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: {
                ...value,
                confidence:
                  now - value.lastUpdated > STALE_DATA_THRESHOLD
                    ? "stale"
                    : "cached",
              },
            }),
            prevPrices
          )
        );
        setLastKnownGoodPrices(prices);
      }

      const cachedHistory = localStorage.getItem("cryptoHistory");
      if (cachedHistory) {
        setHistoricalData(JSON.parse(cachedHistory));
      }
    } catch (e) {
      console.warn("Error loading cached data:", e);
    }
  }, []);

  const updateHistoricalData = useCallback((newPrices: Prices) => {
    setHistoricalData((prev) => {
      const updated = { ...prev };

      Object.entries(newPrices).forEach(([symbol, data]) => {
        if (!updated[symbol]) {
          updated[symbol] = [];
        }

        updated[symbol].push({
          price: data.price,
          change: data.change,
          timestamp: Date.now(),
        });

        // Keep only the last MAX_HISTORICAL_ENTRIES entries
        if (updated[symbol].length > MAX_HISTORICAL_ENTRIES) {
          updated[symbol] = updated[symbol].slice(-MAX_HISTORICAL_ENTRIES);
        }
      });

      // Save to localStorage
      try {
        localStorage.setItem("cryptoHistory", JSON.stringify(updated));
      } catch (e) {
        console.warn("Error saving historical data:", e);
      }

      return updated;
    });
  }, []);

  const getLastKnownGoodPrice = useCallback(
    (symbol: string) => {
      const history = historicalData[symbol];
      if (!history?.length) {
        const fallback = lastKnownGoodPrices[symbol as SymbolKey];
        return fallback
          ? {
              price: fallback.price,
              change: fallback.change,
              timestamp: fallback.lastUpdated,
            }
          : null;
      }

      // Find the most recent price that's not too old
      const recentPrices = history
        .filter((entry) => Date.now() - entry.timestamp < STALE_DATA_THRESHOLD)
        .sort((a, b) => b.timestamp - a.timestamp);

      return recentPrices[0] || history[history.length - 1] || null;
    },
    [historicalData, lastKnownGoodPrices]
  );

  const fetchPrices = useCallback(async () => {
    // Rate limiting
    const now = Date.now();
    if (now - lastFetchRef.current < 30000) {
      return;
    }
    lastFetchRef.current = now;

    try {
      const ids = Object.values(SYMBOLS).join(",");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price`,
        {
          params: {
            ids: ids,
            vs_currencies: "usd",
            include_24hr_change: true,
          },
        }
      );

      const data = response.data;

      const newPrices = Object.entries(SYMBOLS).reduce((acc, [key, coinId]) => {
        const coinData = data[coinId];
        if (coinData) {
          acc[key as SymbolKey] = {
            price: coinData.usd,
            change: coinData.usd_24h_change,
            lastUpdated: now,
            confidence: "real",
          };
        } else {
          // Use last known good price if available
          const lastKnownPrice = getLastKnownGoodPrice(coinId);
          if (lastKnownPrice) {
            acc[key as SymbolKey] = {
              price: lastKnownPrice.price,
              change: lastKnownPrice.change,
              lastUpdated: lastKnownPrice.timestamp,
              confidence: "cached",
            };
          }
        }
        return acc;
      }, {} as Prices);

      setPrices(newPrices);
      setLastKnownGoodPrices(newPrices);
      updateHistoricalData(newPrices);

      // Cache the full state
      try {
        localStorage.setItem(
          "cryptoPrices",
          JSON.stringify({
            prices: newPrices,
            timestamp: now,
            historicalPrices: historicalData,
          })
        );
      } catch (e) {
        console.warn("Error caching prices:", e);
      }

      setError(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching prices:", error);

      // Use last known good prices for all symbols
      const fallbackPrices = Object.entries(SYMBOLS).reduce(
        (acc, [key, coinId]) => {
          const lastKnownPrice = getLastKnownGoodPrice(coinId);
          if (lastKnownPrice) {
            acc[key as SymbolKey] = {
              price: lastKnownPrice.price,
              change: lastKnownPrice.change,
              lastUpdated: lastKnownPrice.timestamp,
              confidence: "stale",
            };
          }
          return acc;
        },
        {} as Prices
      );

      setPrices(fallbackPrices);
      setError("Using last known good prices. Unable to fetch latest data.");

      // Retry after delay
      retryTimeoutRef.current = setTimeout(() => {
        fetchPrices();
      }, API_RETRY_DELAY);
    }
  }, [
    getLastKnownGoodPrice,
    historicalData,
    updateHistoricalData,
    lastKnownGoodPrices,
  ]);

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(() => {
      fetchPrices();
    }, 60000); // Poll every minute

    return () => {
      clearInterval(interval);
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [fetchPrices]);

  const formatPrice = useCallback((price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 4 : 2,
    }).format(price);
  }, []);

  const formatChange = useCallback(
    (change: number): string =>
      `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
    []
  );

  const getDataAge = useCallback((lastUpdated: number): string => {
    const minutes = Math.floor((Date.now() - lastUpdated) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1 min ago";
    return `${minutes} mins ago`;
  }, []);

  if (isLoading && Object.values(prices).every((p) => p.price === 0)) {
    return (
      <div className="bg-gray-900 text-white p-2 text-center">
        <div className="animate-pulse">Loading cryptocurrency data...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white overflow-hidden w-full">
      {error && (
        <div className="bg-yellow-900/20 text-yellow-200 text-xs p-1 text-center">
          {error}
        </div>
      )}
      <div className="flex animate-marquee">
        {Object.entries(prices).map(([key, value]) => (
          <div
            key={key}
            className={`flex items-center px-4 py-2 border-r border-gray-700 whitespace-nowrap hover:bg-gray-800 transition-colors ${
              value.confidence !== "real" ? "opacity-75" : ""
            }`}
          >
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-medium mr-2">{key}</span>
                <span className="mr-2">{formatPrice(value.price)}</span>
                <span
                  className={`text-sm ${
                    value.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {formatChange(value.change)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{getDataAge(value.lastUpdated)}</span>
                {value.confidence !== "real" && (
                  <span className="text-yellow-400">
                    ({value.confidence === "cached" ? "Cached" : "Stale"})
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoTicker;
