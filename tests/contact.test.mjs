import assert from "node:assert/strict";
import { test } from "node:test";
import { onRequestPost } from "../functions/api/contact.ts";

const env = {
  RESEND_API_KEY: "re_test_fixture",
  CONTACT_TO_EMAIL: "delivered@resend.dev",
  RESEND_FROM: "Portfolio <contact@example.com>",
};
const message = { name: "TEST Contact <visitor>", email: "visitor@example.com", message: "Hello\n<test>" };
const submit = (body, bindings = env, headers = {}) => onRequestPost({
  request: new Request("https://portfolio.test/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  }),
  env: bindings,
});

test("rejects missing bindings and invalid requests without sending email", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("Must not send email"); };
  try {
    assert.equal((await submit(message, {})).status, 500);
    for (const body of ["{", "null", "[]", "42", { ...message, email: "invalid" }, { ...message, message: " " }]) {
      assert.equal((await submit(body)).status, 400);
    }
    assert.equal((await submit(JSON.stringify({ ...message, message: "a".repeat(17000) }))).status, 413);
    assert.equal((await submit(message, env, { "content-length": "17000" })).status, 413);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("sends through Resend with escaped HTML, reply-to and stable idempotency", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return Response.json({ id: "test-email-id" });
  };
  try {
    for (let i = 0; i < 2; i++) {
      const response = await submit(message);
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { success: true, id: "test-email-id" });
    }
    const { url, options } = calls[0];
    assert.equal(url, "https://api.resend.com/emails");
    const payload = JSON.parse(options.body);
    assert.equal(payload.from, env.RESEND_FROM);
    assert.deepEqual(payload.to, [env.CONTACT_TO_EMAIL]);
    assert.deepEqual(payload.reply_to, [message.email]);
    assert.match(payload.html, /&lt;visitor&gt;/);
    assert.match(payload.html, /Hello<br \/>&lt;test&gt;/);
    assert.match(payload.text, /Hello\n<test>/);
    const key = new Headers(options.headers).get("idempotency-key");
    assert.match(key, /^contact-form\/[a-f0-9]{64}$/);
    assert.equal(key, new Headers(calls[1].options.headers).get("idempotency-key"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("returns a safe JSON error for Resend rejection or network failure", async () => {
  const originalFetch = globalThis.fetch;
  try {
    for (const failure of [
      async () => Response.json({ name: "validation_error", message: "Private provider detail" }, { status: 403 }),
      async () => { throw new Error("Network unavailable"); },
      async () => Response.json({}),
    ]) {
      globalThis.fetch = failure;
      const response = await submit(message);
      assert.equal(response.status, 502);
      assert.deepEqual(await response.json(), { error: "Failed to send your message. Please try again." });
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});
