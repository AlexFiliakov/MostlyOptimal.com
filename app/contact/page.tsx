'use client';

import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Spacer from "../components/Spacer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-pure-white">
      <Header />
      <Spacer />
      
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-deep-forest mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-deep-forest/80 mb-12 max-w-3xl mx-auto">
            Have questions about how Ergodicity Advantage can transform your risk management strategy? I'd love to hear from you.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
          <ContactForm />
        </div>
      </section>
      
      <Spacer />
      <Footer />
    </main>
  );
}
