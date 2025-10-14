import Image from "next/image";

export default function DefinitionSection() {
  return (
    <section
      id="discover"
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/delta.webp"
            alt="Nile Delta"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="text-lg text-deep-forest/80 leading-relaxed">
          <b>Ergodicity</b> is the mathematical principle that distinguishes
          between what happens to many companies on average versus what
          happens to YOUR company over time. Non-ergodic systems (like real
          businesses) can face ruin from events that look statistically
          manageable, making traditional risk models dangerously misleading
          for individual enterprises.
        </p>
      </div>
    </section>
  );
}

