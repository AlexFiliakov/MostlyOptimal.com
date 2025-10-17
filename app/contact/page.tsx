'use client';

import Header from "../components/Header";
import UnderConstruction from "../components/UnderConstruction";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-pure-white">
      <Header />
      <UnderConstruction />
      <Footer />
    </main>
  );
}
