"use client";

import { useState, useEffect, useCallback } from "react";
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

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape キーでメニューを閉じる
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeMenu]);

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <motion.header
      className="fixed top-4 left-4 right-4 z-50 md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-2xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <nav
        className={`rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border border-base-dark/10 shadow-lg shadow-base-dark/5"
            : "bg-white/60 backdrop-blur-md border border-base-dark/5"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg font-bold text-base-dark hover:text-accent transition-colors mr-4 md:mr-8"
        >
          Hackit 2026
        </button>

        <ul className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-base-dark/80 hover:text-accent transition-colors tracking-wide"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden p-2 text-base-dark hover:text-accent transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-nav-menu"
            role="menu"
            className="md:hidden mt-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-base-dark/10 shadow-lg overflow-hidden"
          >
            <ul className="px-4 py-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-base font-medium text-base-dark/80 hover:text-accent transition-colors w-full text-left py-2.5"
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
