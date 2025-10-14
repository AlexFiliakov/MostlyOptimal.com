'use client';

import Image from "next/image";
import CustomButton from "./CustomButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/sailboat_ocean.webp"
        alt="Sailboat Ocean"
        className="object-cover w-full h-full fixed"
        sizes="100vw"
        width={400}
        height={400}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-deep-forest mb-6">
          Your Future, Not The Average
        </h1>

        <p className="text-xl md:text-2xl text-deep-forest/80 mb-12 max-w-3xl mx-auto">
          Transform risk management from necessary cost to growth accelerator
          with a simulation engine built for how businesses actually succeed.
        </p>

        <div className="flex flex-col items-center gap-8 mb-16">
          <CustomButton>Discover Your Path</CustomButton>
          
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-deep-forest/60 font-medium tracking-wide">
              SCROLL TO EXPLORE
            </span>
            <svg
              className="w-4 h-4 text-deep-forest/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

