'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { gsap } from "gsap";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for coordinated animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.3
      })
      .from(paragraphRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
      }, "-=0.6")
      .from(buttonContainerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.5")
      .from(scrollIndicatorRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

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
        <h1 
          ref={headingRef}
          className="text-5xl md:text-7xl font-display font-bold text-deep-forest mb-6"
        >
          Your Future, Not The Average
        </h1>

        <p 
          ref={paragraphRef}
          className="text-xl md:text-2xl text-deep-forest/80 mb-12 max-w-3xl mx-auto"
        >
          Transform risk management from necessary cost to growth accelerator
          with a simulation engine built for how businesses actually succeed.
        </p>

        <div ref={buttonContainerRef} className="flex flex-col items-center gap-8 mb-16">
          <CustomButton>Discover Your Path</CustomButton>
          
          <div 
            ref={scrollIndicatorRef}
            className="flex flex-col items-center gap-2 animate-bounce"
          >
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

