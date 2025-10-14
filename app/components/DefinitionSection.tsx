import Image from "next/image";

export default function DefinitionSection() {
  return (
    <section
      id="discover"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-white via-[#BDD1CC]/70 to-white"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/delta.webp"
            alt="Nile Delta"
            fill
            className="object-cover "
            sizes="100vw"
          />
          {/* Subtle gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2A4D3A] mb-4">
            What is Ergodicity?
          </h2>
          <div className="w-24 h-1 bg-[#B4D1B8] mx-auto" />
        </div>

        {/* Main Definition */}
        <div className="bg-white/95 backdrop-blur-sm shadow-xl p-8 md:p-12 border border-[#AEC6C1]/30">
          <p className="text-xl md:text-2xl text-[#2A4D3A] leading-relaxed text-center mb-8">
            <span className="font-bold text-[#00B4A6]">Ergodicity</span> is the mathematical principle that distinguishes
            between what happens to many companies <span className="italic">on average</span> versus what
            happens to <span className="font-semibold text-[#00B4A6]">YOUR company</span> over time.
          </p>
          
          {/* Key Insight Box */}
          <div className="bg-gradient-to-r from-[#4A90E2]/10 to-[#00B4A6]/10 p-6 border-l-4 border-[#4A90E2]">
            <p className="text-lg text-[#2A4D3A]/90 leading-relaxed">
              Non-ergodic systems (like real businesses) can face ruin from events that look statistically
              manageable, making traditional risk models dangerously misleading
              for individual enterprises.
            </p>
          </div>

          {/* Bottom Accent */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#2A4D3A]/60 font-medium uppercase tracking-wider">
              Understanding this distinction is crucial for strategic insurance decisions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

