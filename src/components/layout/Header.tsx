"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Hackitとは", href: "#about" },
  { label: "賞", href: "#awards" },
  { label: "スポンサー", href: "#sponsors" },
  { label: "スケジュール", href: "#schedule" },
  { label: "お問い合わせ", href: "#cta" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.header
      className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-3xl lg:max-w-4xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <nav
        className={`rounded-2xl px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border border-base-dark/10 shadow-lg shadow-base-dark/5"
            : "bg-white/60 backdrop-blur-md border border-base-dark/5"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-base sm:text-lg font-bold text-base-dark hover:text-accent transition-colors mr-2 sm:mr-3 md:mr-4 lg:mr-6 whitespace-nowrap flex-shrink-0"
        >
          Hackit 2026
        </button>

        <ul className="hidden md:flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-6 flex-shrink-0">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavClick(item.href)}
                className="text-[11px] lg:text-xs xl:text-sm font-medium text-base-dark/80 hover:text-accent transition-colors whitespace-nowrap px-1"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden p-2 sm:p-2.5 text-base-dark hover:text-accent transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニュー"
        >
          {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-base-dark/10 shadow-lg overflow-hidden"
          >
            <ul className="px-3 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm sm:text-base font-medium text-base-dark/80 hover:text-accent transition-colors w-full text-left py-2 sm:py-2.5 min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
