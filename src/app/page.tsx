import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { BuiltFor } from "@/components/sections/built-for";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { Roadmap } from "@/components/sections/roadmap";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsStrip />
        <Features />
        <HowItWorks />
        <BuiltFor />
        <ManifestoSection />
        <Roadmap />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
