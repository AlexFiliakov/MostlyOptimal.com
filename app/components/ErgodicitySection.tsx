import Image from "next/image";

export default function ErgodicitySection() {
  return (
    <>
      {/* Problem Subsection */}
      <section id="average-outcomes" className="relative py-16 xl:py-24 px-4 xl:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-deep-forest">
          <div className="relative w-full h-full">
            <Image
              src="/images/forest_path.webp"
              alt="Highway"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center bg-soft-silver/20 rounded-xl backdrop-blur-xl px-6 xl:px-8 py-3 xl:py-4">
          <h2 className="text-3xl xl:text-4xl font-display font-bold text-white mb-4 xl:mb-6">
            Average outcomes don't apply to individual journeys
          </h2>
          <p className="text-base xl:text-lg text-white/80 leading-relaxed">
            Traditional risk management commits a fundamental error: it assumes
            that the average outcome across many parallel scenarios applies to
            any single company's journey through time. This distinction between
            ensemble averages and time averages explains why businesses
            rationally reject positive expected value bets and why insurance
            creates value despite its mathematical cost.
          </p>
        </div>
      </section>

      <div className="relative bg-white w-full h-16"></div>
      {/* Definition Subsection */}
      <section id="discover" className="relative py-16 xl:py-24 px-4 xl:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-deep-forest">
          <div className="relative w-full h-full">
            <Image
              src="/images/delta.webp"
              alt="Nile Delta"
              fill
              className="object-cover opacity-80"
              sizes="100vw"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center bg-soft-silver/20 rounded-xl backdrop-blur-xl px-6 xl:px-8 py-3 xl:py-4">
          <h2 className="text-3xl xl:text-4xl font-display font-bold text-white mb-4 xl:mb-6">
            Understanding Ergodicity
          </h2>
          <p className="text-base xl:text-lg text-white/80 leading-relaxed">
            <b>Ergodicity</b> is the mathematical principle that distinguishes
            between what happens to many companies on average versus what
            happens to YOUR company over time. Non-ergodic systems (like real
            businesses) can face ruin from events that look statistically
            manageable, making traditional risk models dangerously misleading
            for individual enterprises.
          </p>
        </div>
      </section>
      <div className="relative bg-white w-full h-16"></div>
      {/* Breakthrough Subsection */}
      <section className="relative  py-16 xl:py-24 px-4 xl:px-6 bg-cool-mist/20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-deep-forest">
          <div className="relative w-full h-full">
            <Image
              src="/images/lightning_island.webp"
              alt="City Lightning"
              fill
              className="object-cover opacity-80"
              sizes="100vw"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-lightning-blue/10 to-electric-teal/10" /> */}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center bg-soft-silver/20 rounded-xl backdrop-blur-xl px-6 xl:px-8 py-3 xl:py-4">
          <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-display font-bold text-white mb-4 xl:mb-6">
            First principles. Real trajectories. Actual growth.
          </h2>
          <p className="text-base xl:text-lg text-white leading-relaxed">
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
