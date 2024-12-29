// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Overview } from "@/components/dashboard/overview";
// import { MarketTrends } from "@/components/dashboard/market-trends";
// import toast from "react-hot-toast";
// import { RecentTransactions } from "@/components/dashboard/recent-transactons";
// import { Spinner } from "@/components/ui/spinner";

// interface DashboardData {
//   totalBalance: number;
//   change24h: number;
//   totalAssets: number;
//   portfolioHistory: Array<{ date: string; value: number }>;
//   recentTransactions: Array<{ id: string; amount: number; date: string }>;
// }

// export default function DashboardPage() {
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(
//     null
//   );

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await fetch("/api/dashboard");
//         if (response.ok) {
//           const data: DashboardData = await response.json();
//           setDashboardData(data);
//         } else {
//           const errorData = await response.json();
//           throw new Error(
//             errorData.message || "Failed to fetch dashboard data"
//           );
//         }
//       } catch (error: unknown) {
//         const errorMessage =
//           error instanceof Error ? error.message : "Unknown error";
//         console.error("Error fetching dashboard data:", errorMessage);
//         toast.error("Failed to load dashboard data. Please try again.");
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (!dashboardData) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spinner />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         Dashboard Overview
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Balance</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">
//               ${dashboardData.totalBalance.toFixed(2)}
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>24h Change</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p
//               className={`text-2xl font-bold ${
//                 dashboardData.change24h >= 0 ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {dashboardData.change24h >= 0 ? "+" : ""}
//               {dashboardData.change24h.toFixed(2)}%
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Assets</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">{dashboardData.totalAssets}</p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <Overview data={dashboardData.portfolioHistory} />
//         <RecentTransactions
//           transactions={dashboardData.recentTransactions.map((transaction) => ({
//             ...transaction,
//             type: "Transaction", // Add a default value for type
//           }))}
//         />
//       </div>
//       <div className="mt-8">
//         <MarketTrends />
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Overview } from "@/components/dashboard/overview";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download } from "lucide-react";
import { toast } from "react-hot-toast";
import { PortfolioStats } from "@/components/dashboard/portfolio-stats";
import { RecentTransactions } from "@/components/dashboard/recent-transactons";
import { TokenAllocation } from "@/components/dashboard/token-allocation";
import { TradingViewWidget } from "@/components/dashboard/trading-view-widget";

interface DashboardData {
  totalBalance: number;
  change24h: number;
  totalAssets: number;
  portfolioHistory: Array<{ date: string; value: number }>;
  recentTransactions: Array<{ id: string; amount: number; date: string }>;
  tokenAllocation: any;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        } else {
          throw new Error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Track your portfolio performance and market trends
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Total Balance
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${dashboardData.totalBalance.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                +{dashboardData.change24h}% (24h)
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold">75</p>
                <p className="text-sm text-muted-foreground mb-1">/100</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Excellent Performance
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Active Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{dashboardData.totalAssets}</p>
              <p className="text-sm text-muted-foreground">
                Across {dashboardData.totalAssets} assets
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <TradingViewWidget />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Token Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <TokenAllocation data={dashboardData.tokenAllocation} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <PortfolioStats data={dashboardData.portfolioHistory} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions
              transactions={dashboardData.recentTransactions.map(
                (transaction) => ({
                  ...transaction,
                  type: "Transaction", // Add a default value for type
                })
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
