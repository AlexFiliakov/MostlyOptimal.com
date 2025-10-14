'use client';
import Image from "next/image";
import CustomButton from "./CustomButton";

export default function CTASection() {
  return (
    <section
      className="relative py-24 px-6 bg-gradient-to-b from-soft-silver/30 to-pure-white overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/compass.webp"
            alt="Race Car Tuning"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pure-white via-pure-white/80 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-forest mb-6">
          Ready to See Your True Path?
        </h2>
        <p className="text-xl text-deep-forest/80 mb-12 max-w-2xl mx-auto">
          For corporate leaders ready to move beyond traditional actuarial
          approaches, the Ergodicity Advantage offers a scientifically
          rigorous yet intuitively accessible path forward.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <a
            href="https://mostlyoptimal.com/tutorial"
            className="inline-block bg-sage-green hover:bg-sage-green/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          > */}
          <CustomButton>

            Start Your Analysis
          </CustomButton>
          {/* <a
            href="https://mostlyoptimal.com/research"
            className="inline-block bg-transparent border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
          > */}
          <CustomButton>
            Research Paper
          </CustomButton>
        </div>
      </div>
    </section>
  );
}

