"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const About = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="mt-8 w-full">
      <div className="h-32" />
      <div className="container mx-auto px-4 lg:px-6 flex flex-col gap-8">
        <div className="">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-4xl xl:text-5xl font-medium tracking-tight leading-[1.05] text-foreground text-pretty max-w-7xl"
          >
            I{" "}
            <span className="text-muted-foreground">enjoy building things</span>{" "}
            that don&apos;t just work—but actually matter to the people using
            them. Turning ideas into something{" "}
            <span className="text-muted-foreground">
              useful, usable, and real
            </span>{" "}
            is what keeps me{" "}
            <span className="text-muted-foreground">excited.</span>
          </motion.h2>
        </div>
        <motion.div
          className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-6 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="lg:col-start-7 md:col-start-1 flex flex-col md:flex-row gap-6 md:col-span-6">
            <div className="w-full lg:w-1/2">
              <Image
                src="/jcportrait.jpg"
                alt="Hero"
                width={500}
                height={0}
                className="w-full h-auto object-cover rounded-sm"
                loading="eager"
              />
            </div>
            <div className="w-full lg:w-1/2 font-pp-neue-montreal text-base  tracking-tight leading-5 text-wrap flex flex-col gap-4 text-muted-foreground">
              <p className="w-full text-left">
                I enjoy taking ideas and turning them into working products that
                people can actually use. Depending on the project, I may be
                involved in everything from development and database work to
                deployment, infrastructure, testing, and ongoing improvements.
                The most rewarding part for me is seeing something I built make
                a real difference whether it helps a team work more efficiently,
                improves a business process, or simply makes a task easier for
                the people using it.
              </p>
              <p>
                I also like exploring AI, automation, and new product ideas,
                especially when they can be used in practical ways. I try to
                keep the things I build simple, maintainable, and flexible
                enough to grow as the project evolves.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="h-10"></div>
    </section>
  );
};

export default About;
