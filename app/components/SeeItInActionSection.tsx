'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';

// Dynamically import the interactive surface plot component
const SurfacePlotExtremeShape = dynamic(
  () => import('./PlotlySurfaceViewerExtremeShape'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl text-white">Loading interactive plot...</div>
      </div>
    )
  }
);

export default function SeeItInActionSection() {
  const [expandedImage, setExpandedImage] = useState<number | null>(null);

  const diagrams = [
    {
      title: "Find the deductible that balances cost and risk",
      image: "/images/example_deductibles_1.png",
      alt: "Insurance deductible optimization example"
    },
    {
      title: "Find the limit that protects your company without overpaying",
      image: "/images/example_limits_1.png",
      alt: "Insurance limit optimization example"
    },
    {
      title: "Explore which assumptions matter most for your coverage strategy",
      image: "/images/example_configurations_1.gif",
      alt: "Insurance configuration analysis example"
    },
    {
      title: "Identify strategies that stay optimal despite uncertain loss patterns",
      image: "/images/example_extreme_shape_surface_plot_animation.gif",
      alt: "Surface plot showing optimal insurance strategies under various loss assumptions"
    }
  ];

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedImage !== null) {
        setExpandedImage(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [expandedImage]);

  return (
    <section 
      className="relative py-24 px-6 bg-gradient-to-br from-pure-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl font-display font-bold text-center text-deep-forest mb-4"
        >
          See It in Action
        </h2>

        <p className="text-deep-forest/70 text-center mb-16">
          Click images to expand
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {diagrams.map((diagram, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group"
            >
              <div className="p-8">
                <h3 className="text-xl md:text-2xl font-display font-bold text-deep-forest mb-6 text-center">
                  {diagram.title}
                </h3>
                <div 
                  className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-white group-hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
                  onClick={() => setExpandedImage(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setExpandedImage(index);
                    }
                  }}
                >
                  <Image
                    src={diagram.image}
                    alt={diagram.alt}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Interactive or Image */}
      {expandedImage !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setExpandedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={expandedImage === 3 ? "Interactive surface plot" : "Expanded image view"}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"
            onClick={() => setExpandedImage(null)}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Render interactive component for surface plot (index 3), otherwise show image */}
          {expandedImage === 3 ? (
            <div 
              className="relative w-full h-full max-w-7xl max-h-[90vh] bg-white rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <SurfacePlotExtremeShape />
            </div>
          ) : (
            <>
              <div 
                className="relative w-full h-full max-w-7xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={diagrams[expandedImage].image}
                  alt={diagrams[expandedImage].alt}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center text-sm md:text-base bg-black/50 px-4 py-2 rounded-full">
                {diagrams[expandedImage].title}
              </p>
            </>
          )}
        </div>
      )}
    </section>
  );
}
