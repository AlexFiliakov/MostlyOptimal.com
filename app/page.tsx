'use client';

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ErgodicitySection from "./components/ErgodicitySection";
import ScrollStackSection from "./components/ScrollStackSection";
import AdvantagesSection from "./components/AdvantagesSection";
import FeaturesSection from "./components/FeaturesSection";
import SeeItInActionSection from "./components/SeeItInActionSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Spacer from "./components/Spacer";
import PlotlySurfaceViewerExtremeShape from "./components/PlotlySurfaceViewerExtremeShape";

export default function Home() {
  return (
    <main className="min-h-screen bg-pure-white">
      <Header />
      <HeroSection />
      <Spacer />
      <ScrollStackSection />
      <ErgodicitySection />
      <AdvantagesSection />
      <FeaturesSection />
      <SeeItInActionSection />
      <CTASection />
      <Footer />
    </main>
  );
}
