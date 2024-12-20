import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon, ShieldCheckIcon, TrendingUpIcon } from "lucide-react";

export function StepsSection() {
  return (
    <section className="py-20 bg-[#DFEAF8]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-[#20446F]">
          Build your <span className="text-[#186CCC]">crypto</span> portfolio
        </h2>
        <p className="text-[#849EC0] text-center mb-12 max-w-2xl mx-auto">
          CryptoFlow unites and secures a growing ecosystem of specialized
          blockchain technologies, empowering you to build a diverse portfolio.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#DFEAF8] flex items-center justify-center mx-auto mb-6">
                <UserIcon className="w-8 h-8 text-[#186CCC]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#20446F]">
                Fund your account
              </h3>
              <p className="text-[#849EC0] text-sm mb-6">
                Add funds to your crypto account to start trading crypto.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#186CCC] text-white">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Verify your identity
              </h3>
              <p className="text-white/80 text-sm mb-6">
                Complete the identity verification process to secure your
                account.
              </p>
              <Button
                variant="secondary"
                className="bg-white text-[#186CCC] hover:bg-white/90"
                aria-label="Learn more about identity verification"
              >
                Learn More →
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#DFEAF8] flex items-center justify-center mx-auto mb-6">
                <TrendingUpIcon className="w-8 h-8 text-[#186CCC]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#20446F]">
                Start trading
              </h3>
              <p className="text-[#849EC0] text-sm mb-6">
                You&apos;re good to go! Buy/sell crypto, set up recurring buys
                for your investments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
