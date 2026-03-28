"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -8 },
    open: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    closed: { transition: { staggerChildren: 0.05, delayChildren: 0 } },
    open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  return (
    <>
      {/* Navigation Bar */}
      <div className="fixed top-6 left-0 right-0 z-50 px-4">
        <nav className="bg-background/80 backdrop-blur-xl border border-white/10 max-w-7xl mx-auto rounded-[2rem] md:rounded-full px-6 transition-all duration-300 overflow-hidden">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-white text-sm font-medium tracking-tight"
            >
              JC.DEV
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="#experience"
                className="text-white text-sm font-light hover:opacity-70 transition-opacity duration-200"
              >
                Experience
              </Link>
              <Link
                href="#about"
                className="text-white text-sm font-light hover:opacity-70 transition-opacity duration-200"
              >
                About
              </Link>
              <Link
                href="#projects"
                className="text-white text-sm font-light hover:opacity-70 transition-opacity duration-200"
              >
                Projects
              </Link>
            </div>

            {/* Desktop CTA Button - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="flex items-center gap-2 px-6 py-2 bg-white text-black text-sm font-medium hover:opacity-80 transition-opacity duration-200 rounded-full">
                <span>↗</span>
                Let&apos;s Work Together
              </button>
              <button
                className="text-white hover:opacity-70 transition-opacity duration-200 bg-white/5 p-2 rounded-full border border-white/10"
                aria-label="Lock"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4m11 0a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2m11 0V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v4m0 0a2 2 0 002 2h4a2 2 0 002-2m0-4V7a2 2 0 00-2-2H9a2 2 0 00-2 2v4"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Toggle - Visible only on mobile */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white hover:opacity-70 transition-opacity duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <div className="flex flex-col gap-1.5 items-end">
                  <div className="w-8 h-px bg-white" />
                  <div className="w-6 h-px bg-white" />
                </div>
              )}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="lg:hidden border-t border-white/5"
              >
                <motion.div
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-col py-6 gap-0"
                >
                  <motion.a
                    href="#projects"
                    onClick={closeMenu}
                    variants={itemVariants}
                    className="py-4 text-white text-2xl font-medium tracking-tight hover:opacity-70 transition-opacity duration-200 border-b border-white/5"
                  >
                    Work
                  </motion.a>
                  <motion.a
                    href="#about"
                    onClick={closeMenu}
                    variants={itemVariants}
                    className="py-4 text-white text-2xl font-medium tracking-tight hover:opacity-70 transition-opacity duration-200 border-b border-white/5"
                  >
                    Approach
                  </motion.a>
                  <motion.a
                    href="#contact"
                    onClick={closeMenu}
                    variants={itemVariants}
                    className="py-4 text-white text-2xl font-medium tracking-tight hover:opacity-70 transition-opacity duration-200 border-b border-white/5"
                  >
                    Contact
                  </motion.a>
                  <motion.div variants={itemVariants} className="pt-8 pb-4 flex items-center gap-4">
                    <button className="flex items-center gap-2 flex-grow px-6 py-4 bg-white text-black text-base font-medium rounded-xl">
                      <span>↳</span>
                      Let&apos;s Work Together
                    </button>
                    <div className="h-14 w-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4m11 0a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2m11 0V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v4m0 0a2 2 0 002 2h4a2 2 0 002-2m0-4V7a2 2 0 00-2-2H9a2 2 0 00-2 2v4"
                        />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Spacer */}
      <div className="h-24 sm:h-32" />
    </>
  );
}
