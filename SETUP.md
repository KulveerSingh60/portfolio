# KULVEER.AI — Cloudflare Worker Setup

KULVEER.AI is a conversational AI assistant for this portfolio. The React
frontend runs on **GitHub Pages**, and the AI backend runs on a **Cloudflare
Worker** using **Cloudflare Workers AI**. No credentials are stored in this
repository — all Cloudflare authentication happens through your account
(`wrangler login`), not in code.

## Architecture

```
GitHub Pages (React, /portfolio/)
        │  POST  "KULVEER.AI" is a reader-friendly domain name.
        ▼
Cloudflare Worker  (https://<your-worker>.workers.dev)
        │  env.AI.run(model, { messages })
        ▼
Cloudflare Workers AI  →  @cf/meta/llama-3.1-8b-instruct-fast
```

## What ships in this repo

- `worker/src/index.js` — Worker request handler (validation, CORS, history
  limits, safety guards) and the call to Workers AI.
- `worker/src/portfolio-context.js` — builds the system prompt + portfolio
  facts straight from `src/data/index.js` (single source of truth — no manual
  duplication; edit the portfolio data there and the assistant follows it).
- `worker/wrangler.toml` — Worker config with the `[ai]` binding and the
  `AI_MODEL` variable. **No secret values here** (there are none to store).

## Manual Cloudflare configuration (required once)

None of these steps can be completed from inside the repository — they need
your Cloudflare account. Follow them once:

1. **Create a Cloudflare account** and confirm email (free is fine for the
   Workers AI free allocation of 10,000 neurons/day).

2. **Authenticate Wrangler** (from the `worker/` directory):
   ```sh
   npx wrangler@latest login
   ```
   This authorizes Wrangler to use your Cloudflare account. No API token is
   ever committed to the repository.

3. **Enable Workers AI.** Workers AI is available on the free plan by default.
   The `[ai]` binding in `wrangler.toml` makes it available to the Worker as
   `env.AI`.

4. **Deploy the Worker:**
   ```sh
   npx wrangler@latest deploy
   ```
   This produces a public URL like
   `https://kulveer-ai.<your-subdomain>.workers.dev`. Wrangler prompts to
   choose/confirm the account — that is the only account interaction required.

   The live Worker for this portfolio is deployed at:
   `https://kulveer-ai.kulveer-ai.workers.dev`

> Wrangler is run via `npx` on demand; it is intentionally **not** added to
> `package.json`, so the frontend dependency set is untouched.

## Wiring the frontend to the Worker

The frontend reads the endpoint from the `VITE_AI_API_URL` environment
variable. It is **never hardcoded** into production.

### Local development

1. Start the Worker locally (from `worker/`):
   ```sh
   npx wrangler@latest dev
   ```
   This serves the Worker at `http://localhost:8787` by default.

2. In the project root, start the Vite dev server (`npm run dev`). In local
   dev, `src/lib/aiClient.js` automatically falls back to
   `http://localhost:8787` when `VITE_AI_API_URL` is not set, so you don't need
   a `.env` file to develop locally.

   To point local dev at the deployed Worker instead (e.g. to test against the
   live backend), create a local `.env.local` in the project root:
   ```
   VITE_AI_API_URL=https://kulveer-ai.kulveer-ai.workers.dev
   ```
   `.env.local` is git-ignored, so it stays out of the repo. See
   `.env.example` for the shape.

### Production (GitHub Pages)

Set a repository **Actions variable** named `VITE_AI_API_URL` to the deployed
Worker URL:

- GitHub → Settings → Secrets and variables → Actions → Variables → **New
  repository variable** → name `VITE_AI_API_URL`, value
  `https://kulveer-ai.kulveer-ai.workers.dev`.

The GitHub Pages workflow (`.github/workflows/deploy.yml`) injects this
variable into the build automatically (`VITE_AI_API_URL: ${{ vars.VITE_AI_API_URL }}`).

> `VITE_AI_API_URL` is a **public** endpoint, not a secret. Do not commit
> Cloudflare API tokens, account credentials, or private keys.

If the variable is **not** set, the production build has an empty endpoint and
the chat shows a friendly "AI assistant isn't configured yet" state with the
real contact links — it never makes a broken request.

### Optional: switch the AI model

Models are configured in `worker/wrangler.toml` under `[vars] AI_MODEL`.
Only use a model available on the Workers AI **Free allocation** (i.e. not in
Cloudflare's paid-only list). Some paid-only examples: `kimi-k2.6`,
`glm-5.3-*`, `deepseek-v4-*`.

## Security notes

- **No secrets in the repository.** The `[ai]` binding needs no credential
  value; Workers AI is authorized by your logged-in Cloudflare account. Do not
  commit API tokens or `CLOUDFLARE_API_TOKEN` values.
- Worker-side abuse protection: message length cap, bounded conversation
  history, CORS restricted to the portfolio origin + local `localhost` dev
  origins, safe generic error responses (no internal error leakage).
- The browser talks only to the public Worker URL.

## Costs

Cloudflare Workers Free plan includes **10,000 neurons/day** for Workers AI.
`@cf/meta/llama-3.1-8b-instruct-fast` costs roughly 4.1k neurons per M input
tokens and 34.9k per M output tokens. A typical short chat turn (a few hundred
input tokens + a short answer) costs well under a fraction of a neuron, so the
free allocation supports many conversations per day. There is no automatic
polling — the assistant only runs when a visitor submits a message.
