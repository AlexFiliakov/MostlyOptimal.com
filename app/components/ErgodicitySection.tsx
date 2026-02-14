import Image from "next/image";

export default function ErgodicitySection() {
  return (
    <>
      {/* Problem Subsection */}
      <section id="ergodicity-intro" className="relative py-16 xl:py-24 px-4 xl:px-6 overflow-hidden">
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
            any single company's journey through time. This is why smart
            businesses turn down bets that look profitable on paper, and why
            insurance creates real value even when it costs more than the
            &ldquo;expected&rdquo; loss.
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
            Why Averages Are Misleading
          </h2>
          <p className="text-base xl:text-lg text-white/80 leading-relaxed">
            Traditional risk models average across hundreds of companies, but
            your company only gets one path through time. A loss that looks
            manageable &ldquo;on average&rdquo; can be catastrophic for a single business.
            That gap between what&apos;s true for the industry and what&apos;s true for
            you is exactly what conventional analysis misses.
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
            Unlike conventional simulations that treat every scenario as
            recoverable, our engine accounts for the losses you can&apos;t come
            back from. The ones that shut down future opportunities entirely.
            Build your strategy around how your business actually works, not
            theoretical assumptions about unlimited resilience.
          </p>
        </div>
      </section>
    </>
  );
}
