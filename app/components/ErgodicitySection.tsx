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
            A loss that&apos;s &ldquo;manageable on average&rdquo; can end your company in practice
          </h2>
          <p className="text-base xl:text-lg text-white/80 leading-relaxed">
            Traditional risk models average across hundreds of companies.
            But your company doesn&apos;t get hundreds of tries. You get one shot,
            playing out year after year. A loss that looks small &ldquo;on
            average&rdquo; can compound into a crisis for a single business.
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
            Your industry&apos;s average loss ratio might be 60%. But if your
            worst year wipes out three years of profit, that average means
            nothing. Traditional models can&apos;t see this danger because they
            blur your company into the crowd.
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
            A simulation engine built around one company: yours
          </h2>
          <p className="text-base xl:text-lg text-white leading-relaxed">
            Most simulation tools assume your company bounces back from
            every loss. In reality, some losses permanently shrink what your
            business can do next. Mostly Optimal models that reality so your
            insurance strategy protects the growth you&apos;ve already built.
          </p>
        </div>
      </section>
    </>
  );
}
