import Image from "next/image";

export default function ProblemSection() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
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

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-4xl font-display font-bold text-white mb-6">
          Average outcomes don't apply to individual journeys
        </h2>
        <p className="text-lg text-white/80 leading-relaxed">
          Traditional risk management commits a fundamental error: it assumes
          that the average outcome across many parallel scenarios applies to
          any single company's journey through time. This distinction between
          ensemble averages and time averages explains why businesses
          rationally reject positive expected value bets and why insurance
          creates value despite its mathematical cost.
        </p>
      </div>
    </section>
  );
}

