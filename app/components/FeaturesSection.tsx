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
        "Advanced optimization algorithms that maximize long-term company value through optimal insurance decisions, using time-average (ergodic) rather than ensemble approaches.",
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
        "Industry-standard risk metrics quantify tail risk exposure and support data-driven insurance purchasing decisions with confidence intervals and bootstrap analysis.",
    },
    {
      title: "Monte Carlo Simulation Engine",
      description:
        "Model complex loss distributions and understand the full spectrum of potential outcomes with statistical confidence.",
    },
    {
      title: "Scenario Management & Sensitivity Analysis",
      description:
        "Comprehensive framework for managing multiple simulation scenarios, parameter sweeps, and what-if analyses under different market conditions.",
    },
    {
      title: "Strategy Backtesting & Walk‑Forward Validation",
      description:
        "Robust backtesting framework that tests insurance strategies against historical and simulated data using walk-forward validation techniques.",
    },
    {
      title: "Real-Time Business Constraints",
      description:
        "Configurable business constraints including maximum risk tolerance, minimum ROE thresholds, leverage ratios, liquidity requirements, and regulatory compliance checks.",
    },
    {
      title: "Executive Reporting & Visualization",
      description:
        "Comprehensive reporting suite with interactive dashboards, Excel export capabilities, and publication-ready visualizations that translate complex analytics into actionable business insights.",
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
      className="relative py-24 px-6 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/highway.webp')",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 mx-auto w-fit text-center bg-white bg-opacity-60 rounded-xl backdrop-blur-sm px-4 pt-4 pb-6 mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-display font-bold text-center text-deep-forest"
          >
            Application&nbsp;Features
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

