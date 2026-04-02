"use client";

import { Building2, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
}

const ExperienceItem = ({ title, company, period }: ExperienceItemProps) => {
  return (
    <motion.div
      className="relative pl-8 not-last:pb-12 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2.5 h-full w-[1px] bg-muted group-last:h-[24px]">
        <div className="absolute h-2 w-2 -left-[4px] top-0 rounded-full bg-primary" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-foreground font-medium text-lg tracking-tight">
            <Building2 className="size-4 text-muted-foreground" />
            <span>{company}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm font-pp-neue-montreal">
            <h3 className="text-xl font-medium tracking-tight text-foreground">
              {title}
            </h3>
            <div className="hidden sm:block size-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="size-3.5" />
              <span>{period}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Doc Tormes Veterinary Clinic",
      period: "March 2024 - Current",
    },
    {
      title: "Backend Developer | Project Head",
      company: "DICT Region 5",
      period: "March- June 2023",
    },
  ];

  return (
    <section id="experience" className="w-full">
      <div className="h-10" />
      <div className="container mx-auto px-4 lg:px-6 flex flex-col gap-12">
        <div className="max-w-4xl">
          <motion.h2
            className="text-4xl xl:text-5xl font-medium tracking-tight leading-[1.05] text-foreground text-pretty"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            My{" "}
            <span className="text-muted-foreground">professional journey</span>{" "}
            so far.
          </motion.h2>
          <motion.p
            className="text-muted-foreground mt-4 font-pp-neue-montreal text-lg tracking-tight leading-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            A timeline of my professional growth and key achievements in the
            field of software development.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 lg:col-start-1">
            <div className="space-y-0">
              {experiences.map((experience, index) => (
                <ExperienceItem key={index} {...experience} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-10"></div>
    </section>
  );
};

export default Experience;
