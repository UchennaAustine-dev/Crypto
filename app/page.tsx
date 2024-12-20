"use client";

import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { ChartSection } from "@/components/chart-section";
import { StepsSection } from "@/components/steps-section";
import { PageTransition } from "@/components/page-transition";
import { TrustedPlatformSection } from "@/components/trusted-platform-section";
import { WhatsNewSection } from "@/components/whats-new-section";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <HeroSection />
        <FeaturesSection />
        <ChartSection />
        <WhatsNewSection />
        <StepsSection />
        <TrustedPlatformSection />
      </main>
    </PageTransition>
  );
}
