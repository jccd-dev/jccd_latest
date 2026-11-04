"use client";

import { ActionButton } from "@/components/action-link";
import { TextReveal } from "@/components/project-motion";
import { useState, type CSSProperties, type SubmitEvent } from "react";

const inputClasses =
  "w-full rounded-sm border border-foreground/50 bg-transparent px-4 py-3 text-base text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-[invalid=true]:border-destructive-foreground disabled:opacity-60 motion-reduce:transition-none dark:border-foreground/40";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SendStatus = "idle" | "sending" | "sent" | "error";
type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!String(data.get("name") ?? "").trim()) {
    errors.name = "Enter your name.";
  }
  if (!EMAIL_PATTERN.test(String(data.get("email") ?? "").trim())) {
    errors.email = "Enter an email address like name@example.com.";
  }
  if (!String(data.get("message") ?? "").trim()) {
    errors.message = "Tell me a little about what you want to build.";
  }
  return errors;
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: FieldName;
  label: string;
  hint?: string;
  error?: string;
  children: (describedBy: string | undefined) => React.ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-base">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {children(describedBy)}
      {error && (
        <p id={errorId} className="text-sm text-destructive-foreground">
          {error}
        </p>
      )}
    </div>
  );
}

const Contact = () => {
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (status === "sending") return;

    const data = new FormData(form);
    const errors = validate(data);
    setFieldErrors(errors);
    const firstInvalid = (["name", "email", "message"] as const).find(
      (field) => errors[field],
    );
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

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

  const sending = status === "sending";

  return (
    <section className="page-container pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <TextReveal
            as="h1"
            load
            text="Let's work together."
            className="text-[clamp(2.375rem,5.4vw,4.25rem)] leading-[1.04] tracking-[-0.03em]"
          />
          <p
            className="rise-load mt-6 max-w-md text-pretty text-lg leading-snug md:text-xl"
            style={delay(300)}
          >
            Tell me about your project and I will get back to you with
            questions, next steps, or a quote.
          </p>

          <dl
            className="rise-load mt-10 grid gap-x-8 gap-y-5 border-t border-border pt-5 text-base sm:grid-cols-2 lg:mt-16 lg:grid-cols-1"
            style={delay(420)}
          >
            <div>
              <dt className="text-sm text-muted-foreground">Working hours</dt>
              <dd className="mt-1">Mon to Fri, 8AM - 5PM</dd>
              <dd className="text-muted-foreground">
                Sat, 10AM - 2PM. Sundays and bank holidays, closed.
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Location</dt>
              <dd className="mt-1">Camarines Sur, Philippines</dd>
              <dd className="text-muted-foreground">
                Working remotely with clients anywhere.
              </dd>
            </div>
          </dl>
        </div>

        <div
          className="rise-load rounded-tile bg-muted p-2.5 lg:col-span-6 lg:col-start-7"
          style={delay(240)}
        >
          <form
            noValidate
            onSubmit={handleSubmit}
            onInput={(event) => {
              const { name } = event.target as HTMLInputElement;
              if (name in fieldErrors) {
                setFieldErrors((current) => ({ ...current, [name]: undefined }));
              }
            }}
            className="grid gap-6 rounded-lg bg-background p-5 md:p-7"
          >
            <Field id="name" label="Name" error={fieldErrors.name}>
              {(describedBy) => (
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  required
                  disabled={sending}
                  aria-invalid={fieldErrors.name ? true : undefined}
                  aria-describedby={describedBy}
                  className={inputClasses}
                />
              )}
            </Field>

            <Field id="email" label="Email" error={fieldErrors.email}>
              {(describedBy) => (
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  disabled={sending}
                  aria-invalid={fieldErrors.email ? true : undefined}
                  aria-describedby={describedBy}
                  className={inputClasses}
                />
              )}
            </Field>

            <Field
              id="message"
              label="Message"
              hint="What are you building, and when do you need it?"
              error={fieldErrors.message}
            >
              {(describedBy) => (
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={5000}
                  required
                  disabled={sending}
                  aria-invalid={fieldErrors.message ? true : undefined}
                  aria-describedby={describedBy}
                  className={`${inputClasses} resize-y`}
                />
              )}
            </Field>

            <div>
              <ActionButton type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
              </ActionButton>
              {status === "sent" && (
                <p role="status" className="mt-4 text-base">
                  Thanks. I will get back to you within my working hours.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="mt-4 text-base text-destructive-foreground">
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
