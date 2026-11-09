# AI Linux — Cloudflare Pages

Deploy the existing React/Vite frontend with Cloudflare Pages Functions for the /api/chat and /api/system-info routes.

1. Open https://dash.cloudflare.com/ and go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Select **Rush47/AI-Linux_repozytorium**, branch **main**.
3. Framework preset: **Vite**; build command: `npm run build`; output directory: `dist`; root directory: repository root.
4. In **Settings → Variables and Secrets**, add **GEMINI_API_KEY** as an encrypted secret. Optionally set `GEMINI_MODEL=gemini-2.5-flash`. Never set a `VITE_` prefix on API secrets.
5. Deploy. Cloudflare will assign a `*.pages.dev` URL. Re-deploy after adding secrets if necessary.

Cloudflare Pages serves the UI and edge API, **not** Express server.ts, Linux, Ollama, kernel access, or root shell. To control a real AI Linux host, use a separate authenticated backend (e.g. Cloudflare Tunnel + Access). Do not expose a root shell or a private API without authentication. Protect the Pages app with Cloudflare Access before putting a billable AI API behind a public URL; public visitors could otherwise consume the configured Gemini quota.

The /api/system-info route explicitly reports cloud runtime status, not invented host metrics.
