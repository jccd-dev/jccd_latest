# Portfolio

## Cloudflare Pages and contact email

This is a Next.js static export. Cloudflare Pages serves `out/`, while the
root `functions/api/contact.ts` handles `POST /api/contact` and calls Resend
server-side. Keep `functions/` in the project root, outside `out/`.

For a Git-connected Pages deployment, use:

- Build command: `npm run build`
- Build output directory: `out`
- Root directory: this repository root

In the Pages project's **Settings > Variables and Secrets**, set the runtime
bindings below for Production and, if used, Preview. Redeploy after changes.
The local `.env` file is not a substitute for Cloudflare runtime bindings.

| Binding | Value |
| --- | --- |
| `RESEND_API_KEY` | Resend sending API key; store as a secret |
| `CONTACT_TO_EMAIL` | Inbox that receives messages |
| `RESEND_FROM` | Sender address on a domain verified in Resend |

`RESEND_FROM` defaults to `onboarding@resend.dev` for sandbox use. That sender
can only deliver to the email address belonging to your Resend account.
For other recipients, verify your sender domain and configure `RESEND_FROM`.
The visitor's address is the reply-to, never the sender.

Cloudflare Git integration builds the root Functions directory automatically.
For CLI deployment, use `npx wrangler pages deploy out` from the repository root
and select your existing Pages project. Dashboard drag-and-drop uploads do not
compile the `functions/` directory.

## Local development

`npm run dev` runs the Next.js UI only; it does **not** run Cloudflare Functions.
To test the complete contact flow locally:

1. Create an ignored `.dev.vars` file with the three bindings above.
2. Run `npm run preview:pages`.
3. Open the localhost URL printed by Wrangler and visit `/contact`.

A valid submission with real bindings sends a real email. Use
`CONTACT_TO_EMAIL=delivered@resend.dev` for Resend's delivery test address.
Never put the API key in a `NEXT_PUBLIC_*` variable.

## Verification and troubleshooting

- `npm run test:contact` checks validation and the Resend request/response contract
  with mocked delivery; it sends no real emails.
- `npm run lint`
- `npm run build`

The form now displays safe server errors and retains input after failure.
“Email is not configured on the server” means runtime bindings are missing.
“The contact service is unavailable” means the endpoint did not return JSON;
check whether the Function deployed and whether you are using the Pages preview.
For a send failure, inspect the Pages Function logs and Resend API logs for an
invalid key, unverified sender domain, sandbox recipient restriction, or quota.

References: [Pages Functions](https://developers.cloudflare.com/pages/functions/get-started/),
[runtime bindings](https://developers.cloudflare.com/pages/functions/bindings/),
[local development](https://developers.cloudflare.com/pages/functions/local-development/),
[Resend with Cloudflare](https://resend.com/docs/send-with-cloudflare-workers).
