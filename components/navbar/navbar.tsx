"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

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
      <div className="fixed top-6 left-0 right-0 z-50">
        <div className="container mx-auto px-4 lg:px-6">
          <nav className="backdrop-blur-xl border border-dark/10 rounded-md px-6 md:px-4 transition-all duration-300 dark:border-white/10 dark:bg-background/80">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}

              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="dark:text-white text-dark text-xl font-semibold tracking-tight"
                >
                  JC.DEV
                </Link>

                {/* Desktop Navigation - Hidden on mobile */}
                <div className="hidden lg:flex items-center gap-8 ml-2 font-pp-neue-montreal">
                  <Link
                    href="#experience"
                    className="dark:text-white text-foreground/80 text-md hover:opacity-70 transition-opacity duration-200 font-medium"
                  >
                    Experience
                  </Link>
                  <Link
                    href="#projects"
                    className="dark:text-white text-foreground/80 text-md hover:opacity-70 transition-opacity duration-200 font-medium"
                  >
                    Projects
                  </Link>
                  <Link
                    href="#about"
                    className="dark:text-white text-foreground/80 text-md hover:opacity-70 transition-opacity duration-200 font-medium"
                  >
                    About
                  </Link>
                </div>
              </div>

              {/* Desktop CTA Button - Hidden on mobile */}
              <div className="hidden lg:flex items-center gap-4">
                <Button className="rounded-xs text-base">
                  <span>↗</span>
                  Let&apos;s Work Together
                </Button>
                <ModeToggle />
              </div>

              {/* Mobile Menu Toggle - Visible only on mobile */}
              <button
                onClick={toggleMenu}
                className="lg:hidden text-dark dark:text-white hover:opacity-70 transition-opacity duration-200"
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
                    <div className="w-8 h-px bg-foreground dark:bg-white" />
                    <div className="w-6 h-px bg-foreground dark:bg-white" />
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
                      href="#experience"
                      onClick={closeMenu}
                      variants={itemVariants}
                      className="py-4 dark:text-white text-dark text-xl font-medium tracking-tight hover:opacity-70 transition-opacity duration-200 border-b dark:border-white/5 border-dark/5 font-pp-neue-montreal"
                    >
                      Experience
                    </motion.a>
                    <motion.a
                      href="#projects"
                      onClick={closeMenu}
                      variants={itemVariants}
                      className="py-4 dark:text-white text-dark text-xl font-medium tracking-tight hover:opacity-70 transition-opacity duration-200 border-b dark:border-white/5 border-dark/5 font-pp-neue-montreal"
                    >
                      Projects
                    </motion.a>
                    <motion.a
                      href="#about"
                      onClick={closeMenu}
                      variants={itemVariants}
                      className="py-4 dark:text-white text-dark text-xl font-medium tracking-tight hover:opacity-70 transition-opacity duration-200 border-b dark:border-white/5 border-dark/5 font-pp-neue-montreal"
                    >
                      About
                    </motion.a>
                    <motion.div
                      variants={itemVariants}
                      className="pt-8 pb-4 flex items-center justify-between gap-2"
                    >
                      <Button className="rounded-xs text-base">
                        <span>↳</span>
                        Let&apos;s Work Together
                      </Button>
                      <ModeToggle />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </div>
    </>
  );
}
