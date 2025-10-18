import type { Metadata } from 'next';
import Header from "../components/Header";
import UnderConstruction from "../components/UnderConstruction";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: 'About - Ergodicity Advantage - See Your Future, Not the Average',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-pure-white">
      <Header />
      <UnderConstruction />
      <Footer />
    </main>
  );
}
