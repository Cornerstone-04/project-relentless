"use client";

import { CallToAction, Hero, HowItWorks, Stats } from "@/components/home";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Hero />
      <Stats />
      <HowItWorks />
      <CallToAction />
    </main>
  );
}
