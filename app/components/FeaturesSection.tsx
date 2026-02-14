'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const features = [
    {
      title: "Long-Term Business Optimization",
      description:
        "Advanced optimization algorithms that maximize long-term company value through optimal insurance decisions, based on your company's actual trajectory rather than industry-wide averages.",
    },
    {
      title: "Comprehensive Financial Statements",
      description:
        "Familiar financial reporting formats directly from risk analysis outputs (Balance Sheet, Income Statement, Cash Flow).",
    },
    {
      title: "Multi-Layer Insurance Tower Design",
      description:
        "Sophisticated insurance program structuring with support for multiple layers, attachment points, reinstatements, and aggregate limits.",
    },
    {
      title: "Advanced Risk Metrics Suite",
      description:
        "Quantify your worst-case exposures with industry-standard risk metrics so you can make coverage decisions backed by hard numbers, not gut feel.",
    },
    {
      title: "Monte Carlo Simulation Engine",
      description:
        "Run thousands of scenarios to see the full range of what could happen to your business, from best case to worst case and everything in between.",
    },
    {
      title: "Scenario Management & Sensitivity Analysis",
      description:
        "Ask \"what if?\" at scale. Test how your strategy performs across different loss patterns, market conditions, and business assumptions.",
    },
    {
      title: "Strategy Backtesting & Walk‑Forward Validation",
      description:
        "Test your strategy against history. See how today's approach would have performed in past years and stress-test it against future scenarios.",
    },
    {
      title: "Real-Time Business Constraints",
      description:
        "Analysis that respects your real business constraints, including risk tolerance, return targets, leverage limits, and liquidity needs.",
    },
    {
      title: "Executive Reporting & Visualization",
      description:
        "Interactive dashboards and board-ready reports that make the analysis easy to share, defend, and act on. Export to Excel when you need to.",
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
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      });

      // Animate feature cards with stagger effect
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
            y: 60,
            opacity: 0,
            scale: 0.9,
            rotation: index % 2 === 0 ? -2 : 2,
            duration: 0.7,
            delay: (index % 3) * 0.1,
            ease: "back.out(1.2)",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 bg-[length:100%_auto] bg-top bg-repeat-y md:bg-cover md:bg-center md:bg-no-repeat md:bg-fixed"
      style={{
        backgroundImage: "url('/images/highway.webp')",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 mx-auto w-fit text-center bg-white bg-opacity-60 rounded-xl backdrop-blur-sm px-4 pt-4 pb-6 mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-display font-bold text-center text-deep-forest"
          >
            What&apos;s Under the Hood
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="bg-white shadow-xl overflow-hidden bg-opacity-75 backdrop-blur-sm rounded-xl group hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-deep-forest mb-3">
                  {feature.title}
                </h3>
                <p className="text-deep-forest/70 font-bold">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

