"use client";

import { Menu, X } from "lucide-react";
import { useState, useCallback, useMemo, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Check scroll direction and distance
      const scrollingUp = scrollTop < lastScrollY;

      if (scrollingUp) {
        scrollUpDistance += lastScrollY - scrollTop;
        setIsScrollingUp(scrollUpDistance >= 100);
      } else {
        scrollUpDistance = 0;
        setIsScrollingUp(false);
      }

      setIsScrolled(scrollTop > 50);
      setIsMinimized(scrollTop > viewportHeight - 200);

      lastScrollY = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Menu items
  const menuItems = useMemo(
    () => [
      { label: "Scenarios", href: "scenarios" },
      { label: "Research", href: "https://mostlyoptimal.com/research" },
      { label: "Theory", href: "https://mostlyoptimal.com/theory" },
      { label: "FAQ", href: "faq" },
      { label: "Getting Started", href: "https://mostlyoptimal.com/tutorial" },
      { label: "About", href: "about" },
      { label: "Contact", href: "contact" },
    ],
    []
  );

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleMobileItemClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Memoize logo component
  const LogoSection = useMemo(
    () => (
      <a
        href="/"
        className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
      >
        <div className="font-bold font-display text-deep-forest text-2xl">
          <span className="text-warm-gold">Ergodicity</span>
          <span className="text-deep-forest"> Advantage</span>
        </div>
      </a>
    ),
    []
  );

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 grid grid-cols-1 content-start">
        <div
          className={`${
            isMinimized && !isHeaderHovered && !isScrollingUp
              ? "w-[280px] h-16 overflow-hidden"
              : "px-4 h-16 w-[93%]"
          } border rounded-2xl ${
            isMinimized && !isHeaderHovered && !isScrollingUp
              ? "transition-all duration-500 ease-linear"
              : "transition-all duration-500 ease-in-out"
          } mx-auto ${
            isScrolled || isHeaderHovered
              ? "bg-white border-zinc-100 shadow-lg"
              : "bg-transparent border-transparent backdrop-blur-sm"
          }`}
          onPointerOver={() => setIsHeaderHovered(true)}
          onMouseLeave={() => setIsHeaderHovered(false)}
        >
          <div
            className={`flex items-center h-full ${
              isMinimized && !isHeaderHovered && !isScrollingUp
                ? "justify-center opacity-0 invisible"
                : "justify-between opacity-100 visible transition-all duration-300 delay-[300ms]"
            }`}
          >
            {LogoSection}

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-deep-forest hover:text-electric-teal transition-colors duration-200 relative group font-medium"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric-teal transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-deep-forest hover:text-electric-teal transition-colors"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Minimized Logo - Shows when header is minimized */}
        <div
          className={`fixed top-4 left-0 right-0 z-10 p-4 w-fit flex bg-white rounded-2xl mx-auto items-center shadow-lg border border-zinc-100 ${
            isMinimized && !isHeaderHovered && !isScrollingUp
              ? "opacity-100 transition-opacity duration-100 ease-linear delay-[350ms]"
              : "opacity-0 pointer-events-none"
          }`}
          onMouseEnter={() => setIsHeaderHovered(true)}
        >
          {LogoSection}
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-deep-forest/50 backdrop-blur-sm"
            onClick={handleMenuToggle}
          />

          {/* Menu Panel */}
          <div className="fixed left-0 right-0 top-20 bg-white shadow-xl border-b border-soft-silver/20 animate-in slide-in-from-top-2 duration-300">
            <nav className="max-h-[calc(100vh-5rem)] overflow-y-auto">
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-6 py-4 text-deep-forest hover:bg-soft-silver/10 hover:text-electric-teal transition-colors duration-200 border-b border-soft-silver/10 font-medium"
                  onClick={handleMobileItemClick}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

