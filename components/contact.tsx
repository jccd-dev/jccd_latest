"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "motion/react";
import { useState, type SubmitEvent } from "react";

const inputClasses =
  "w-full rounded-xs border border-input bg-transparent px-4 py-3 text-base text-foreground outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 motion-reduce:transition-none";

type SendStatus = "idle" | "sending" | "sent" | "error";

const Contact = () => {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (status === "sending") return;

    const data = new FormData(form);
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("The contact service is unavailable. Please try again later.");
      }

      const result: unknown = await response.json();
      if (typeof result !== "object" || result === null) {
        throw new Error("The contact service returned an invalid response.");
      }
      if (!response.ok) {
        throw new Error(
          "error" in result && typeof result.error === "string"
            ? result.error
            : "Failed to send your message. Please try again.",
        );
      }
      if (!("success" in result) || result.success !== true) {
        throw new Error("The contact service returned an invalid response.");
      }
      form.reset();
      setStatus("sent");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 pb-24 pt-32 lg:px-6 md:pt-40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h1 className="text-4xl font-medium tracking-tight leading-[1.05] text-foreground text-pretty xl:text-5xl">
              Let&apos;s work together.
            </h1>
            <p className="mt-5 max-w-md font-pp-neue-montreal text-lg tracking-tight leading-6 text-muted-foreground">
              Tell me about your project and I will get back to you with
              questions, next steps, or a quote.
            </p>

            <div className="mt-14 max-w-md space-y-8 border-t border-border pt-8 font-pp-neue-montreal text-sm tracking-tight">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Working hours
                </p>
                <p className="mt-2 text-foreground">Mon to Fri, 8AM - 5PM</p>
                <p className="mt-1 text-muted-foreground">
                  Sat, 10AM - 2PM. Sundays and bank holidays, closed.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Location
                </p>
                <p className="mt-2 text-foreground">
                  Camarines Sur, Philippines
                </p>
                <p className="mt-1 text-muted-foreground">
                  Working remotely with clients anywhere.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="grid gap-6 lg:col-span-6 lg:col-start-7"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                required
                disabled={status === "sending"}
                className={inputClasses}
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                disabled={status === "sending"}
                className={inputClasses}
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <p id="message-hint" className="text-sm text-muted-foreground">
                What are you building, and when do you need it?
              </p>
              <textarea
                id="message"
                name="message"
                rows={6}
                maxLength={5000}
                required
                disabled={status === "sending"}
                aria-describedby="message-hint"
                className={`${inputClasses} resize-y`}
              />
            </div>

            <div>
              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className="rounded-xs text-base"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </Button>
              {status === "sent" && (
                <p
                  role="status"
                  className="mt-4 text-sm text-foreground"
                >
                  Thanks. I will get back to you within my working hours.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="mt-4 text-sm text-destructive">
                  {errorMessage}
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
