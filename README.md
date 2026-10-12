# ELISY DERIV WEBBOT

A responsive black-and-gold landing page and browser-based Deriv tick analysis dashboard.

## Features
- Server-validated access-key gate.
- Loads active Deriv symbols dynamically using the Deriv WebSocket API.
- Live last-digit frequency display (0–9).
- Over/Under barriers, Even, Odd, Matches and Differs analysis.
- 30-second signal expiry; no automatic contract purchases.
- Connects to Deriv's public live market feed without requiring a user-supplied App ID, password, or API token.

## Deploy to Vercel
1. Import this repository into Vercel.
2. Framework preset: **Other**. Build command: leave empty. Output directory: leave empty (repository root).
3. In **Project Settings → Environment Variables**, add `ACCESS_KEY` with the private access key you want to distribute to authorized users. Do not put this key in `index.html` or any `NEXT_PUBLIC_*` variable.
4. Redeploy after setting the environment variable.
5. Open the deployed site and sign in with the access key. The dashboard loads live market symbols from Deriv automatically.

## Notes
- The access key is checked by `/api/verify-key` on the server. This is a shared-key gate, not individual user accounts or a full identity system.
- Public market data is read-only. Access-key verification remains server-side.
- The analysis only reports heuristic signals. Historical digit frequencies do not guarantee future outcomes; confidence is a rule-based score, not a calibrated win probability.
- The dashboard does not buy contracts or place trades automatically.
