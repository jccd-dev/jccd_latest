"use client";

import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleArrowDown, Zap } from "lucide-react";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />
      <motion.div
        className="relative z-[1] text-center max-w-screen-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Badge className="rounded-full border-none">
          <Zap className="fill-current" />
          Fullstack Web Developer
        </Badge>
        <motion.h1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        >
          Building Your Digital Edge
        </motion.h1>
        <motion.p
          className="mt-6 text-[17px] md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        >
          Hello there! I&apos;m <span className="font-semibold text-xl">John Carlo Digay</span>, a Full Stack Developer from the Philippines.
          I turn ideas into reality with clean code and smooth design.
          Let&apos;s build something amazing together—preferably with less bugs and more coffee! 🚀😁
        </motion.p>
        <motion.div
          className="mt-12 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        >
          <Button size="lg" className="rounded-full text-base">
            See What I Do <CircleArrowDown className="ml-2 !h-5.5 !w-5.5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
