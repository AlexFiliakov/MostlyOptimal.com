import HeroSection from "./components/HeroSection";
import DefinitionSection from "./components/DefinitionSection";
import ProblemSection from "./components/ProblemSection";
import BreakthroughSection from "./components/BreakthroughSection";
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
      <DefinitionSection />
      <ProblemSection />
      <BreakthroughSection />
      <AdvantagesSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
