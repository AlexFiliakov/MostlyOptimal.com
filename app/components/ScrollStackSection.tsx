"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStackSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [
    {
      id: 1,
      badge: "Foundation",
      badgeColor: "bg-sage-green",
      badgeTextColor: "text-white",
      title: "Ergodic Framework",
      description:
        "Build your risk management strategy on the revolutionary ergodicity framework—maximizing long-term time-average growth rather than ensemble averages for sustainable business optimization.",
      color: "bg-white",
      image: "/images/tree_roots.webp",
    },
    {
      id: 2,
      badge: "Intelligence",
      badgeColor: "bg-deep-forest",
      badgeTextColor: "text-white",
      title: "Advanced Analytics",
      description:
        "Leverage sophisticated Monte Carlo simulations and optimization algorithms to model complex loss distributions and understand the full spectrum of potential outcomes with statistical confidence.",
      color: "bg-[#e5e7e4]",
      image: "/images/jigsaw.webp",
    },
    {
      id: 3,
      badge: "Strategy",
      badgeColor: "bg-[#5a7a6f]",
      badgeTextColor: "text-white",
      title: "Optimal Insurance Design",
      description:
        "Design sophisticated multi-layer insurance programs with optimal attachment points, limits, and structures that maximize your company's long-term value and resilience.",
      color: "bg-[#d4e3df]",
      image: "/images/compass.webp",
    },
    {
      id: 4,
      badge: "Results",
      badgeColor: "bg-[#8ba89d]",
      badgeTextColor: "text-deep-forest",
      title: "Measurable Impact",
      description:
        "Track and validate your insurance strategy performance with comprehensive reporting, backtesting frameworks, and real-time business constraint monitoring for continuous improvement.",
      color: "bg-[#aec6c1]",
      image: "/images/forest_path.webp",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading and subtitle on scroll
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    });

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / (rect.height - window.innerHeight);
        const newIndex = Math.min(
          Math.max(0, Math.floor(scrollProgress * cards.length)),
          cards.length - 1
        );
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cards.length]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 bg-white"
      style={{ minHeight: `${cards.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-start justify-center">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="my-8 max-lg:my-4 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-forest mb-4">
              The Ergodicity Advantage
            </h2>
            <p className="text-xl text-deep-forest/70 max-w-3xl mx-auto">
              Transform your insurance strategy with four foundational pillars
            </p>
          </div>

          <div className="relative" style={{ height: "600px" }}>
            {cards.map((card, index) => {
              const offset = index * 40;
              const isActive = index <= activeIndex;
              const scale = isActive ? 1 : 0.95;
              const opacity = isActive ? 1 : 0;

              return (
                <div
                  key={card.id}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    transform: `translateY(${
                      isActive ? offset : 100
                    }px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: cards.length + index,
                  }}
                >
                  <div
                    className={`${card.color} flex lg:flex-row flex-col gap-6 shadow-2xl p-8 h-full overflow-hidden`}
                  >
                    <div className="w-full lg:w-1/2 flex flex-col justify-between items-start z-10">
                      <div
                        className={`${card.badgeColor} text-lg max-lg:hidden rounded-full px-6 py-2 ${card.badgeTextColor} font-semibold`}
                      >
                        {card.badge}
                      </div>
                      <div>
                        <h3 className="text-5xl max-lg:text-3xl mt-5 text-deep-forest font-display font-bold leading-tight">
                          {card.title}
                        </h3>
                        <p className="mt-6 leading-relaxed text-lg md:text-xl text-deep-forest/80">
                          {card.description}
                        </p>
                      </div>
                      <button className="flex flex-row gap-2 items-center cursor-pointer  mt-3 bg-deep-forest text-white text-lg px-8 py-3 hover:bg-sage-green transition-colors duration-300 group">
                        Learn More
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="w-full lg:w-1/2 flex items-center justify-center relative">
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
