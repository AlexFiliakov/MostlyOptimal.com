"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const problemRef = useRef<HTMLDivElement>(null);
  const breakthroughRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Background parallax for fixed background
  const bgY = useTransform(scrollY, [0, 1000], [0, -50]);
  const heroY = useTransform(scrollY, [0, 800], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Section-specific parallax transforms
  const [problemY, setProblemY] = useState(0);
  const [breakthroughY, setBreakthroughY] = useState(0);
  const [ctaY, setCtaY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (problemRef.current) {
        const rect = problemRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const progress =
          1 - (rect.top + rect.height) / (viewportHeight + rect.height);
        setProblemY(progress * 150);
      }

      if (breakthroughRef.current) {
        const rect = breakthroughRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const progress =
          1 - (rect.top + rect.height) / (viewportHeight + rect.height);
        setBreakthroughY(progress * 150);
      }

      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const progress =
          1 - (rect.top + rect.height) / (viewportHeight + rect.height);
        setCtaY(progress * 150);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [ref0, inView0] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref5, inView5] = useInView({ threshold: 0.3, triggerOnce: true });

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

  const features = [
    {
      title: "📈⏰Long-Term Business Optimization",
      description:
        "Advanced optimization algorithms that maximize long-term company value through optimal insurance decisions, using time-average (ergodic) rather than ensemble approaches.",
    },
    {
      title: "📊💼Comprehensive Financial Statements",
      description:
        "Familiar financial reporting formats directly from risk analysis outputs (Balance Sheet, Income Statement, Cash Flow).",
    },
    {
      title: "🏗️🛡️Multi-Layer Insurance Tower Design",
      description:
        "Sophisticated insurance program structuring with support for multiple layers, attachment points, reinstatements, and aggregate limits.",
    },
    {
      title: "🎯📉Advanced Risk Metrics Suite",
      description:
        "Industry-standard risk metrics quantify tail risk exposure and support data-driven insurance purchasing decisions with confidence intervals and bootstrap analysis.",
    },
    {
      title: "🎲🔬Monte Carlo Simulation Engine",
      description:
        "Model complex loss distributions and understand the full spectrum of potential outcomes with statistical confidence.",
    },
    {
      title: "🔄🔍Scenario Management & Sensitivity Analysis",
      description:
        "Comprehensive framework for managing multiple simulation scenarios, parameter sweeps, and what-if analyses under different market conditions.",
    },
    {
      title: "⏮️✅Strategy Backtesting & Walk-Forward Validation",
      description:
        "Robust backtesting framework that tests insurance strategies against historical and simulated data using walk-forward validation techniques.",
    },
    {
      title: "⚖️🚦Real-Time Business Constraints",
      description:
        "Configurable business constraints including maximum risk tolerance, minimum ROE thresholds, leverage ratios, liquidity requirements, and regulatory compliance checks.",
    },
    {
      title: "📋👔Executive Reporting & Visualization",
      description:
        "Comprehensive reporting suite with interactive dashboards, Excel export capabilities, and publication-ready visualizations that translate complex analytics into actionable business insights.",
    },
  ];

  return (
    <main className="min-h-screen bg-pure-white">
      {/* Background Parallax Layer */}
      {/* <motion.div 
        className="fixed w-full h-[150vh] z-0"
        style={{ y: bgY }}
      >
        <Image
          src="/images/triangle_ceiling_background.webp"
          alt="Background"
          fill
          className="opacity-10 object-cover object-top"
          priority
          sizes="100vw"
        />
      </motion.div> */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0">
          {/* <motion.div className="relative w-full h-[120%]" style={{ y: heroY }}> */}
          <Image
            src="/images/sailboat_ocean.webp"
            alt="Sailboat Ocean"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* </motion.div> */}
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </motion.div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold text-deep-forest mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Your Future, Not The Average
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-deep-forest/80 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transform risk management from necessary cost to growth accelerator
            with a simulation engine built for how businesses actually succeed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href="#discover"
              className="inline-block bg-sage-green hover:bg-sage-green/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Discover Your Path
            </a>
          </motion.div>

          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ bottom: "10vh" }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg
              className="w-6 h-6 text-deep-forest/50"
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
          </motion.div>
        </motion.div>
      </section>
      <section id="spacer1" className="h-24" />
      {/* The Definition Section */}
      <section
        id="discover"
        className="relative py-24 px-6 overflow-hidden"
        ref={ref0}
      >
        <div ref={problemRef} className="absolute inset-0 z-0">
          <div
            className="relative w-full h-[140%]"
            // style={{ transform: `translateY(-${problemY * 1.0}px)` }}
          >
            <Image
              src="/images/delta.webp"
              alt="Nile Delta"
              fill
              className="object-cover "
              sizes="100vw"
            />
          </div>
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView0 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-deep-forest/80 leading-relaxed">
            <b>Ergodicity</b> is the mathematical principle that distinguishes
            between what happens to many companies on average versus what
            happens to YOUR company over time. Non-ergodic systems (like real
            businesses) can face ruin from events that look statistically
            manageable, making traditional risk models dangerously misleading
            for individual enterprises.
          </p>
        </motion.div>
      </section>
      <section id="spacer1" className="h-24" />
      <section id="spacer1" className="h-24" />
      {/* The Problem Section */}
      <section
        id="discover"
        className="relative py-24 px-6 overflow-hidden"
        ref={ref1}
      >
        <div ref={problemRef} className="absolute inset-0 z-0">
          <div
            className="relative w-full h-[140%]"
            style={{ transform: `translateY(-${problemY * 1.0}px)` }}
          >
            <Image
              src="/images/highway.webp"
              alt="Highway"
              fill
              className="object-cover opacity-20"
              sizes="100vw"
            />
          </div>
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-forest mb-6">
            Average outcomes don't apply to individual journeys
          </h2>
          <p className="text-lg text-deep-forest/80 leading-relaxed">
            Traditional risk management commits a fundamental error: it assumes
            that the average outcome across many parallel scenarios applies to
            any single company's journey through time. This distinction between
            ensemble averages and time averages explains why businesses
            rationally reject positive expected value bets and why insurance
            creates value despite its mathematical cost.
          </p>
        </motion.div>
      </section>
      <section id="spacer1" className="h-24" />
      {/* The Breakthrough Section */}
      <section
        className="relative py-24 px-6 bg-cool-mist/20 overflow-hidden"
        ref={ref2}
      >
        <div ref={breakthroughRef} className="absolute inset-0 z-0">
          <div
            className="relative w-full h-[140%]"
            style={{ transform: `translateY(-${breakthroughY * 1.0}px)` }}
          >
            <Image
              src="/images/city_lightning.webp"
              alt="City Lightning"
              fill
              className="object-cover opacity-25"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-lightning-blue/10 to-electric-teal/10" />
          </div>
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-deep-forest mb-6">
            First principles. Real trajectories. Actual growth.
          </h2>
          <p className="text-lg text-deep-forest/80 leading-relaxed">
            Unlike conventional Monte Carlo simulations, which assume all paths
            are equally accessible, this engine recognizes that certain losses
            create absorbing barriers (points of no return where future
            opportunities vanish). Build your corporate strategy from first
            principles that recognize the non-ergodic nature of real business
            environments.
          </p>
        </motion.div>
      </section>

      {/* Three Advantages Section */}
      <section className="relative py-24 px-6" ref={ref3}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-center text-deep-forest mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Three Ways We Transform Your Risk Strategy
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Features */}
      <section className="relative py-24 px-6" ref={ref4}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-center text-deep-forest mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Application Features
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={inView4 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                {/* <div className="relative h-48 overflow-hidden">
                  <Image
                    src={advantage.image}
                    alt={advantage.headline}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div> */}
                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold text-deep-forest mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-deep-forest/70">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="relative py-24 px-6 bg-gradient-to-b from-soft-silver/30 to-pure-white overflow-hidden"
        ref={ref5}
      >
        <div ref={ctaRef} className="absolute inset-0 z-0">
          <div
            className="relative w-full h-[140%]"
            style={{ transform: `translateY(-${ctaY * 1.0}px)` }}
          >
            <Image
              src="/images/compass.webp"
              alt="Race Car Tuning"
              fill
              className="object-cover opacity-50"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pure-white via-pure-white/80 to-transparent" />
          </div>
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView5 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-forest mb-6">
            Ready to See Your True Path?
          </h2>
          <p className="text-xl text-deep-forest/80 mb-12 max-w-2xl mx-auto">
            For corporate leaders ready to move beyond traditional actuarial
            approaches, the Ergodicity Advantage offers a scientifically
            rigorous yet intuitively accessible path forward.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://mostlyoptimal.com/tutorial"
              className="inline-block bg-sage-green hover:bg-sage-green/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Analysis
            </motion.a>
            <motion.a
              href="https://mostlyoptimal.com/research"
              className="inline-block bg-transparent border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Research Paper
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-deep-forest text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/80 text-sm">
            © 2025 Ergodicity Advantage. Transforming risk management through
            first principles.
          </p>
        </div>
      </footer>
    </main>
  );
}
