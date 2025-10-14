'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative z-10 bg-deep-forest text-white py-8 px-6">
      <div ref={contentRef} className="max-w-7xl mx-auto text-center">
        <p className="text-white/80 text-sm">
          © 2025 Ergodicity Advantage. Transforming risk management through
          first principles.
        </p>
      </div>
    </footer>
  );
}

