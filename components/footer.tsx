"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const Footer = () => {
  const [timeState, setTimeState] = useState({
    timeStr: "",
    isAvailable: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const phDate = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }),
      );
      const hour = phDate.getHours();
      const isAvailable = hour >= 8 && hour < 17;

      const timeStr = phDate.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      });

      setTimeState({
        timeStr: `${timeStr} PH`,
        isAvailable,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full pb-6">
      <div className="h-10" />
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          className="bg-foreground/[0.03] dark:bg-accent/10 border border-black/5 dark:border-white/5 rounded-sm p-6 md:p-10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Row: Copyright and Links */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-pp-neue-montreal tracking-tight text-muted-foreground border-b border-black/5 dark:border-white/5 pb-8 mb-10">
            <div className="flex items-center gap-1 group cursor-default">
              <span>&copy; {new Date().getFullYear()}</span>
              <span className="text-foreground font-medium transition-colors group-hover:text-primary">
                John Carlo.
              </span>
              <span>All Rights Reserved.</span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Site Map
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <div className="grid md:grid-cols-2 gap-10 text-xs font-pp-neue-montreal tracking-tighter">
            {/* Left: Availability */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  {!mounted || timeState.isAvailable ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </>
                  ) : (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
                  )}
                </span>
                <span className="text-foreground uppercase font-medium">
                  {timeState.isAvailable ? "(Online)" : "(Offline)"} Now,{" "}
                  {mounted ? timeState.timeStr : "--:--:--"}
                </span>
              </div>
              <div className="text-muted-foreground leading-relaxed font-light">
                <p>Mon to Fri, 8AM - 5PM</p>
                <p>Sat, 10AM - 2PM</p>
                <p>Sundays & Bank Holidays, Closed</p>
              </div>
            </div>

            {/* Right: Location */}
            <div className="flex flex-col md:items-end md:text-right gap-2 font-light">
              <p className="text-muted-foreground leading-relaxed">
                Based in{" "}
                <span className="text-foreground font-normal">
                  Legazpi City, Bicol
                </span>
                ,<br />
                <span className="text-foreground font-normal">
                  Philippines, SE Asia
                </span>
              </p>
              <p className="text-muted-foreground font-mono text-[10px] mt-2 opacity-60">
                13.1391° N, 123.7438° E
              </p>
            </div>
          </div>

          {/* Bottom Large SVG */}
          <motion.div
            className="mt-20 w-full overflow-hidden select-none touch-none"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <svg
              viewBox="0 0 711.336 111.761"
              className="w-full h-auto fill-foreground opacity-[0.08] dark:opacity-[0.12] transition-opacity duration-700 hover:opacity-100 cursor-help"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke-linecap="round" fill-rule="evenodd">
                <path
                  d="M 66.036 75.907 C 66.036 94.357 58.836 111.757 33.036 111.757 C 7.236 111.757 0.036 94.357 0.036 75.907 L 0.036 70.957 L 16.986 70.957 L 16.986 75.907 C 16.986 87.907 19.086 96.457 32.586 96.457 C 45.936 96.457 48.336 87.907 48.336 75.907 L 48.336 2.257 L 66.036 2.257 L 66.036 75.907 Z"
                  id="0"
                />
                <path
                  d="M 157.836 39.157 C 155.886 28.357 148.836 15.307 129.036 15.307 C 105.936 15.307 96.786 34.657 96.786 55.807 C 96.786 77.107 105.936 96.457 129.036 96.457 C 148.986 96.457 156.636 83.407 157.836 70.357 L 175.686 70.357 C 173.286 94.507 156.786 111.757 129.486 111.757 C 98.586 111.757 79.086 88.207 79.086 55.807 C 79.086 23.557 98.586 0.007 129.486 0.007 C 156.636 0.007 173.136 17.257 175.686 39.157 L 157.836 39.157 Z"
                  id="1"
                />
                <path
                  d="M 263.586 39.157 C 261.636 28.357 254.586 15.307 234.786 15.307 C 211.686 15.307 202.536 34.657 202.536 55.807 C 202.536 77.107 211.686 96.457 234.786 96.457 C 254.736 96.457 262.386 83.407 263.586 70.357 L 281.436 70.357 C 279.036 94.507 262.536 111.757 235.236 111.757 C 204.336 111.757 184.836 88.207 184.836 55.807 C 184.836 23.557 204.336 0.007 235.236 0.007 C 262.386 0.007 278.886 17.257 281.436 39.157 L 263.586 39.157 Z"
                  id="2"
                />
                <path
                  d="M 294.636 109.507 L 294.636 2.257 L 336.336 2.257 C 365.886 2.257 384.036 21.457 384.036 55.957 C 384.036 90.457 366.486 109.507 336.786 109.507 L 294.636 109.507 Z M 312.486 17.407 L 335.436 17.407 C 359.436 17.407 366.186 35.407 366.186 55.957 C 366.186 76.507 359.436 94.357 335.436 94.357 L 312.486 94.357 L 312.486 17.407 Z"
                  id="3"
                />
                <path
                  d="M 404.886 110.707 C 399.336 110.707 395.136 106.957 395.136 100.957 C 395.136 95.107 399.336 91.207 404.886 91.207 C 410.286 91.207 414.486 95.107 414.486 100.957 C 414.486 106.957 410.286 110.707 404.886 110.707 Z"
                  id="4"
                />
                <path
                  d="M 429.786 109.507 L 429.786 2.257 L 471.486 2.257 C 501.036 2.257 519.186 21.457 519.186 55.957 C 519.186 90.457 501.636 109.507 471.936 109.507 L 429.786 109.507 Z M 447.636 17.407 L 470.586 17.407 C 494.586 17.407 501.336 35.407 501.336 55.957 C 501.336 76.507 494.586 94.357 470.586 94.357 L 447.636 94.357 L 447.636 17.407 Z"
                  id="5"
                />
                <path
                  d="M 551.286 46.507 L 603.636 46.507 L 603.636 61.807 L 551.286 61.807 L 551.286 94.357 L 612.486 94.357 L 612.486 109.507 L 533.436 109.507 L 533.436 2.257 L 610.986 2.257 L 610.986 17.407 L 551.286 17.407 L 551.286 46.507 Z"
                  id="6"
                />
                <path
                  d="M 618.786 2.257 L 637.686 2.257 L 664.986 90.007 L 665.136 90.007 L 692.436 2.257 L 711.336 2.257 L 674.736 109.507 L 655.386 109.507 L 618.786 2.257 Z"
                  id="7"
                />
              </g>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
