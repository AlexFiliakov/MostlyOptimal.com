'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AdvantagesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const advantages = [
    {
      icon: "",
      headline: "Your Unique Journey, Not the Industry Average",
      subtext:
        "Traditional models tell you what happens to 1,000 companies on average. We show you what happens to YOUR company over time. Our ground-up simulation engine maps your specific trajectory through multiplicative wealth dynamics, revealing opportunities and hazards invisible to conventional analysis.",
      image: "/images/snow_tracks_small.webp",
    },
    {
      icon: "",
      headline: "From Cost Center to Catalyst",
      subtext:
        "Discover precisely how insurance accelerates sustainable growth rather than just transferring risk. Our real-time ergodicity diagnostics reveal the optimal insurance coverage levels that maximize your long-term wealth accumulation while protecting against business-ending events.",
      image: "/images/solar_farm_sunrise_small.webp",
    },
    {
      icon: "",
      headline: "Built for Your Business",
      subtext:
        "Every simulation incorporates your specific operations, capital position, and risk profile. Design win-win contracts, optimize retention levels, and make decisions based on your actual constraints, not on theoretical assumptions about infinite time or capital.",
      image: "/images/race_car_tuning_small.webp",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate cards with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl font-display font-bold text-center text-deep-forest mb-16"
        >
          Three Ways We Transform Your Risk Strategy
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="bg-white shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={advantage.image}
                  alt={advantage.headline}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-deep-forest mb-3">
                  {advantage.headline}
                </h3>
                <p className="text-deep-forest/70">{advantage.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

