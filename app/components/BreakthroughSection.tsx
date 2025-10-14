import Image from "next/image";

export default function BreakthroughSection() {
  return (
    <section
      className="relative py-24 px-6 bg-cool-mist/20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/city_lightning.webp"
            alt="City Lightning"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-lightning-blue/10 to-electric-teal/10" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
          First principles. Real trajectories. Actual growth.
        </h2>
        <p className="text-lg text-white leading-relaxed">
          Unlike conventional Monte Carlo simulations, which assume all paths
          are equally accessible, this engine recognizes that certain losses
          create absorbing barriers (points of no return where future
          opportunities vanish). Build your corporate strategy from first
          principles that recognize the non-ergodic nature of real business
          environments.
        </p>
      </div>
    </section>
  );
}

