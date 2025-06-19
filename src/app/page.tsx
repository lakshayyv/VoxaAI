"use client";

import HeroSection from "@/components/landing/hero-section";
import HowItWorks from "@/components/landing/how-it-works";
import VoxaSteps from "@/components/landing/voxa-steps";
import FAQs from "@/components/landing/faqs";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/footer";
import AppNavbar from "@/components/navbar";

export default function Page() {
  return (
    <div className="overflow-x-hidden md:overflow-x-auto w-full">
      <AppNavbar />
      <section id="home">
        <HeroSection />
      </section>
      <section id="features">
        <HowItWorks />
      </section>
      <section id="how-it-works">
        <VoxaSteps />
      </section>
      <section id="faqs">
        <FAQs />
      </section>
      <CTA />
      <Footer />
    </div>
  );
}
