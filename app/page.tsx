"use client";

import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { StepsSection } from "@/components/steps-section";
import { PageTransition } from "@/components/page-transition";
import { TrustedPlatformSection } from "@/components/trusted-platform-section";
import { WhatsNewSection } from "@/components/whats-new-section";
import ChartSection from "@/components/chart-section";
import { Footer } from "@/components/common/footer";
import { Navigation } from "@/components/common/navigation";

export default function Home() {
  return (
    <PageTransition>
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ChartSection />
        <WhatsNewSection />
        <StepsSection />
        <TrustedPlatformSection />
      </main>
      <Footer />
    </PageTransition>
  );
}
