import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">
            Your <span className="text-[#CCFF00]">trusted</span> partner of
            <br />
            cryptocurrency.
          </h2>
          <p className="text-gray-400">
            Pekaboo unites and secures a growing ecosystem of specialized
            blockchain called parachains.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">01.</h3>
              <h4 className="text-lg font-medium mb-4">
                Service for Any Level of Expertise.
              </h4>
              <p className="text-gray-400 text-sm">
                No matter your experience level, we provide the tools you need.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#CCFF00] text-black">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">02.</h3>
              <h4 className="text-lg font-medium mb-4">
                Industry best practices.
              </h4>
              <p className="text-black/70 text-sm">
                We follow and implement the highest security standards.
              </p>
              <Button variant="outline" className="mt-4">
                Learn More →
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">03.</h3>
              <h4 className="text-lg font-medium mb-4">
                Protected by Insurance.
              </h4>
              <p className="text-gray-400 text-sm">
                Your investments are protected by our comprehensive insurance
                coverage.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
