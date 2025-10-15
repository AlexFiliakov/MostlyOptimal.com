"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ErgodicitySection() {
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const heading3Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section 1 animations
      gsap.from(heading1Ref.current, {
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(text1Ref.current, {
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
      });

      // Section 2 animations
      gsap.from(heading2Ref.current, {
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(text2Ref.current, {
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
      });

      // Section 3 animations
      gsap.from(heading3Ref.current, {
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(text3Ref.current, {
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Problem Subsection */}
      <section
        ref={section1Ref}
        className="relative py-24 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-deep-forest">
          <div className="relative w-full h-full">
            <Image
              src="/images/forest_path.webp"
              alt="Highway"
              fill
              className="object-cover opacity-80"
              sizes="100vw"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2
            ref={heading1Ref}
            className="text-4xl md:text-4xl font-display font-bold text-white mb-6"
          >
            Average outcomes don't apply to individual journeys
          </h2>
          <p ref={text1Ref} className="text-lg text-white/80 leading-relaxed">
            Traditional risk management commits a fundamental error: it assumes
            that the average outcome across many parallel scenarios applies to
            any single company's journey through time. This distinction between
            ensemble averages and time averages explains why businesses
            rationally reject positive expected value bets and why insurance
            creates value despite its mathematical cost.
          </p>
        </div>
      </section>

      {/* Definition Subsection */}
      <section
        ref={section2Ref}
        id="discover"
        className="relative py-24 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-deep-forest">
          <div className="relative w-full h-full">
            <Image
              src="/images/delta.webp"
              alt="Nile Delta"
              fill
              className="object-cover opacity-60"
              sizes="100vw"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2
            ref={heading2Ref}
            className="text-4xl md:text-4xl font-display font-bold text-white mb-6"
          >
            Understanding Ergodicity
          </h2>
          <p ref={text2Ref} className="text-lg text-white/80 leading-relaxed">
            <b>Ergodicity</b> is the mathematical principle that distinguishes
            between what happens to many companies on average versus what
            happens to YOUR company over time. Non-ergodic systems (like real
            businesses) can face ruin from events that look statistically
            manageable, making traditional risk models dangerously misleading
            for individual enterprises.
          </p>
        </div>
      </section>

      {/* Breakthrough Subsection */}
      <section
        ref={section3Ref}
        className="relative py-24 px-6 bg-cool-mist/20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-deep-forest">
          <div className="relative w-full h-full">
            <Image
              src="/images/city_lightning.webp"
              alt="City Lightning"
              fill
              className="object-cover opacity-80"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-lightning-blue/10 to-electric-teal/10" />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2
            ref={heading3Ref}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
          >
            First principles. Real trajectories. Actual growth.
          </h2>
          <p ref={text3Ref} className="text-lg text-white leading-relaxed">
            Unlike conventional Monte Carlo simulations, which assume all paths
            are equally accessible, this engine recognizes that certain losses
            create absorbing barriers (points of no return where future
            opportunities vanish). Build your corporate strategy from first
            principles that recognize the non-ergodic nature of real business
            environments.
          </p>
        </div>
      </section>
    </>
  );
}
