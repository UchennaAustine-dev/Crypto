import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon, ShieldCheckIcon, TrendingUpIcon } from "lucide-react";

export function StepsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Build your <span className="text-[#CCFF00]">crypto</span> portfolio
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Pekaboo unites and secures a growing ecosystem of specialized
          blockchain called parachains.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-6">
                <UserIcon className="w-8 h-8 text-[#CCFF00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fund your account</h3>
              <p className="text-gray-400 text-sm mb-6">
                Add funds to your crypto account to start trading crypto.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#CCFF00] text-black">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Verify your identity
              </h3>
              <p className="text-black/70 text-sm mb-6">
                Complete the identity verification process to secure your
                account.
              </p>
              <Button
                variant="secondary"
                aria-label="Learn more about identity verification"
              >
                Learn More →
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-6">
                <TrendingUpIcon className="w-8 h-8 text-[#CCFF00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Start trading</h3>
              <p className="text-gray-400 text-sm mb-6">
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
