'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function SeeItInActionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const diagramsRef = useRef<(HTMLDivElement | null)[]>([]);
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
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      });

      // Animate diagrams with stagger effect
      diagramsRef.current.forEach((diagram, index) => {
        if (diagram) {
          gsap.from(diagram, {
            scrollTrigger: {
              trigger: diagram,
              start: "top 85%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
            y: 80,
            opacity: 0,
            scale: 0.9,
            rotation: index % 2 === 0 ? -1 : 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.2)",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

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
      ref={sectionRef}
      className="relative py-24 px-6 bg-gradient-to-br from-pure-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl font-display font-bold text-center text-deep-forest mb-16"
        >
          See It in Action
        </h2>

        <div className="space-y-16">
          {diagrams.map((diagram, index) => (
            <div
              key={index}
              ref={(el) => { diagramsRef.current[index] = el; }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group"
            >
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-deep-forest mb-6 text-center">
                  {diagram.title}
                </h3>
                <div 
                  className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden bg-gray-100 group-hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
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

      {/* Image Modal */}
      {expandedImage !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setExpandedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded image view"
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"
            onClick={() => setExpandedImage(null)}
            aria-label="Close expanded image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
        </div>
      )}
    </section>
  );
}
