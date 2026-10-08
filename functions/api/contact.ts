/// <reference types="@cloudflare/workers-types" />

import { Resend } from "resend";

interface ContactEnv {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  RESEND_FROM?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_BODY_BYTES = 16 * 1024;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function idempotencyKeyFor(
  name: string,
  email: string,
  message: string,
) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${name}|${email}|${message}`),
  );
  const hex = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return `contact-form/${hex}`;
}

export const onRequestPost: PagesFunction<ContactEnv> = async ({
  request,
  env,
}) => {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    return Response.json(
      { error: "Email is not configured on the server." },
      { status: 500 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Message is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request must be JSON." }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    name.length > MAX_NAME_LENGTH
  ) {
    return Response.json({ error: "Please provide your name." }, { status: 400 });
  }

  if (
    typeof email !== "string" ||
    email.length > 254 ||
    !EMAIL_PATTERN.test(email)
  ) {
    return Response.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (
    typeof message !== "string" ||
    message.trim().length === 0 ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return Response.json({ error: "Please include a message." }, { status: 400 });
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send(
    {
      from: env.RESEND_FROM ?? "onboarding@resend.dev",
      to: [env.CONTACT_TO_EMAIL],
      replyTo: [email],
      subject: `New contact form message from ${name}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      tags: [{ name: "email_type", value: "contact" }],
    },
    { idempotencyKey: await idempotencyKeyFor(name, email, message) },
  );

  if (error) {
    console.error("Resend send failed:", error);
    return Response.json(
      { error: "Failed to send your message. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ success: true, id: data?.id });
};
