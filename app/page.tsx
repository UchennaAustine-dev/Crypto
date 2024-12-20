"use client";

import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { ChartSection } from "@/components/chart-section";
import { StepsSection } from "@/components/steps-section";
import { PageTransition } from "@/components/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <HeroSection />
        <FeaturesSection />
        <ChartSection />
        <StepsSection />
      </main>
    </PageTransition>
  );
}
