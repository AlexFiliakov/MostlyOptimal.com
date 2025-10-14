import HeroSection from "./components/HeroSection";
import ErgodicitySection from "./components/ErgodicitySection";
import AdvantagesSection from "./components/AdvantagesSection";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Spacer from "./components/Spacer";

export default function Home() {
  return (
    <main className="min-h-screen bg-pure-white">
      <HeroSection />
      <Spacer />
      <ErgodicitySection />
      <AdvantagesSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
