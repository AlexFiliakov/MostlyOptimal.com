import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/sailboat_ocean.webp"
        alt="Sailboat Ocean"
        fill
        className="object-cover fixed"
        priority
        sizes="100vw"
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-deep-forest mb-6">
          Your Future, Not The Average
        </h1>

        <p className="text-xl md:text-2xl text-deep-forest/80 mb-12 max-w-3xl mx-auto">
          Transform risk management from necessary cost to growth accelerator
          with a simulation engine built for how businesses actually succeed.
        </p>

        <div>
          <a
            href="#discover"
            className="inline-block bg-sage-green hover:bg-sage-green/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Discover Your Path
          </a>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2" style={{ bottom: "10vh" }}>
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
        </div>
      </div>
    </section>
  );
}

