"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Star,
  HelpCircle,
  ExternalLink,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function TrustedPlatformSection() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showMoreIndicators, setShowMoreIndicators] = useState(false);

  React.useEffect(() => {
    const loadTradingViewWidgets = () => {
      // Load Mini Chart Widget
      const miniChartScript = document.createElement("script");
      miniChartScript.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      miniChartScript.async = true;
      miniChartScript.innerHTML = JSON.stringify({
        symbol: "BINANCE:BTCUSDT",
        width: "100%",
        height: "150",
        locale: "en",
        dateRange: "12M",
        colorTheme: "light",
        trendLineColor: "rgba(37, 99, 235, 1)",
        underLineColor: "rgba(37, 99, 235, 0.15)",
        underLineBottomColor: "rgba(41, 98, 255, 0)",
        isTransparent: false,
        autosize: true,
        largeChartUrl: "",
      });
      document.getElementById("tradingview-mini")?.appendChild(miniChartScript);

      // Load Technical Analysis Widget
      const technicalScript = document.createElement("script");
      technicalScript.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
      technicalScript.async = true;
      technicalScript.innerHTML = JSON.stringify({
        interval: "1m",
        width: "100%",
        isTransparent: false,
        height: "400",
        symbol: "BINANCE:BTCUSDT",
        showIntervalTabs: true,
        locale: "en",
        colorTheme: "light",
      });
      document
        .getElementById("tradingview-technical")
        ?.appendChild(technicalScript);
    };

    loadTradingViewWidgets();

    return () => {
      ["tradingview-mini", "tradingview-technical"].forEach((id) => {
        const container = document.getElementById(id);
        if (container) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
      });
    };
  }, []);

  return (
    <section className="py-8 md:py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="bg-white border border-gray-200 shadow-xl p-4 md:p-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                    Bitcoin Price Overview
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    onClick={() => setShowMoreIndicators(!showMoreIndicators)}
                  >
                    {showMoreIndicators ? (
                      <ChevronUp className="w-4 h-4 mr-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 mr-2" />
                    )}
                    {showMoreIndicators ? "Less Details" : "More Details"}
                  </Button>
                </div>

                <div id="tradingview-mini" className="w-full"></div>

                <AnimatePresence>
                  {showMoreIndicators && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        id="tradingview-technical"
                        className="w-full mt-4"
                      ></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 lg:sticky lg:top-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Trusted <span className="text-blue-600">platform</span>
              <br className="hidden md:block" />
              anytime & anywhere
            </h2>

            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star
                    className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
                    fill="#2563eb"
                  />
                </motion.div>
              ))}
              <span className="ml-2 text-gray-600">4.9/5</span>
            </div>

            <p className="text-gray-600 text-sm md:text-base max-w-lg">
              Experience real-time market analysis with our integrated
              TradingView charts and indicators. Make informed decisions with
              professional-grade tools trusted by millions of traders worldwide.
            </p>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                onClick={() => window.open("#", "_blank")}
              >
                Start Trading <ExternalLink className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
                onClick={() => setShowQuestion(!showQuestion)}
              >
                <HelpCircle className="w-4 h-4" />
                Ask a Question
              </Button>
            </div>

            <AnimatePresence>
              {showQuestion && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <Card className="p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Need help getting started?
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Our expert support team is available 24/7 to help you
                      navigate the platform and make the most of your trading
                      experience.
                    </p>
                    <Button
                      variant="link"
                      className="text-blue-600 p-0 h-auto font-normal flex items-center gap-1 hover:gap-2 transition-all"
                      onClick={() => window.open("mailto:support@example.com")}
                    >
                      Contact Support <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
