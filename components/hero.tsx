"use client";

import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDown, CornerDownRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const Hero = () => {
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
      // Available between 8 AM and 5 PM
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
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      <div className="h-32" />
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
            "inset-x-0 h-full skew-y-12",
          )}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-0 flex-1 flex flex-col">
        <div className="grid lg:grid-cols-2 grid-cols-1 w-full flex-1 gap-4">
          {/* Left Column: Headline and Bottom Info */}
          <div className="flex flex-col lg:justify-between gap-4">
            <div className="reveal-text lg:max-w-xl max-w-sm">
              <motion.h1
                className="text-3xl xl:text-4xl font-medium tracking-tight leading-[1.05] text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Hello I&apos;m John Carlo, a Fullstack Web Developer and
                Freelancer based in the Philippines.
              </motion.h1>
            </div>

            <div className="flex flex-col space-y-10 max-w-sm lg:max-w-none mt-10 font-pp-neue-montreal">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-8"
              >
                <div className="text-foreground text-md flex items-center gap-2 mb-2">
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
                  {mounted ? (
                    timeState.isAvailable ? (
                      <span>(Available) Now, {timeState.timeStr}</span>
                    ) : (
                      <span>(Offline) Now, {timeState.timeStr}</span>
                    )
                  ) : (
                    <span>Available for projects — 2024</span>
                  )}
                </div>
                <p className="text-base lg:text-lg text-foreground max-w-lg tracking-tight leading-5 font-light">
                  I enjoy building clean and functional web applications,
                  working across both frontend and backend. I&apos;m also open
                  to exploring a wide range of digital and creative projects.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Button className="rounded-xs text-base">
                  <CornerDownRight />
                  Let&apos;s Work Together
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xs text-base bg-foreground/10"
                >
                  <ArrowDown />
                  Resume
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Featured Cards */}
          <div className="flex flex-col justify-end items-end">
            <motion.div
              className="flex gap-4 p-4 dark:bg-accent/20 bg-foreground/5 rounded-sm border dark:border-white/10 border-black/5 backdrop-blur-sm max-w-lg w-full h-auto transition-all duration-300 hover:bg-foreground/[0.08] dark:hover:bg-accent/30 group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.01 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div className="h-auto w-full overflow-hidden relative">
                <div className="overflow-hidden rounded-sm">
                  <Image
                    src="https://res.cloudinary.com/df3ak7hgk/image/upload/v1774689377/Screenshot_2026-03-28_171524_ebxyfg.png"
                    alt="Hero"
                    width={500}
                    height={500}
                    className="rounded-sm transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col mt-4 pb-4 border-b border-black/10 dark:border-white/10">
                  <h3 className="font-pp-neue-montreal text-md tracking-tight leading-5 text-lg">
                    Developed a web app to Empower Vet Clinics with Smart and
                    Simple Solution.
                  </h3>
                  <p className="mt-1 font-pp-neue-montreal text-sm tracking-tight leading-4 font-light text-muted-foreground">
                    Vetdatalynx is a web application that helps veterinary
                    clinics manage their patient records, appointments, and
                    inventory.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-md tracking-tight font-pp-neue-montreal">
                  <CornerDownRight className="w-4 h-4" />
                  Latest Project
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="h-10"></div>
    </section>
  );
};

export default Hero;
