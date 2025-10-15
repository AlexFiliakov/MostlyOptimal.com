"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading with scale
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      });

      // Animate text
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      // Animate buttons
      gsap.from(buttonsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: 0.4,
        ease: "back.out(1.2)",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 bg-gradient-to-b from-soft-silver/30 to-pure-white overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/compass.webp"
            alt="Race Car Tuning"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pure-white via-pure-white/80 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-display font-bold text-deep-forest mb-6"
        >
          Ready to See Your True Path?
        </h2>
        <p
          ref={textRef}
          className="text-xl text-deep-forest/80 mb-12 max-w-2xl mx-auto"
        >
          For corporate leaders ready to move beyond traditional actuarial
          approaches, the Ergodicity Advantage offers a scientifically rigorous
          yet intuitively accessible path forward.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 max-lg:items-center justify-center"
        >
          {/* <a
            href="https://mostlyoptimal.com/tutorial"
            className="inline-block bg-sage-green hover:bg-sage-green/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          > */}
          <CustomButton>Start Your Analysis</CustomButton>
          {/* <a
            href="https://mostlyoptimal.com/research"
            className="inline-block bg-transparent border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
          > */}
          <CustomButton>Research Paper</CustomButton>
        </div>
      </div>
    </section>
  );
}
