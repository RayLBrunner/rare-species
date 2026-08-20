# ORBIC Rare Species Field Guide

A public-facing digital field guide for Oregon's rare, threatened, and endangered species — built by a Portland State University Computer Science Capstone team for the [Oregon Biodiversity Information Center (ORBIC)](https://inr.oregonstate.edu/orbic).

The site lets visitors browse and search Oregon's rare species, explore an interactive quiz that matches them with a species based on their interests, and learn how to support ORBIC's conservation work through the Sponsor-a-Species program.

**Live site:** [oregonbiodiversity.org](https://oregonbiodiversity.org)

---

## New to this project?

Start here, in order:

1. **[HANDOFF.md](./HANDOFF.md)** — the full setup and operations guide. Covers installing dependencies, running the site locally, updating species data when ORBIC sends a new snapshot, and how hosting/deployment works. Start here if you're setting this project up for the first time.
2. **[ONBOARDING.md](./ONBOARDING.md)** — quick-start steps for developers joining the project.
3. **[CODE_STYLE.md](./CODE_STYLE.md)** — naming conventions, formatting, and git workflow used throughout the codebase.

---

## Tech stack

| Layer | Technology |
|---|---|
| Web framework | [Next.js](https://nextjs.org/) 16 (React 19, TypeScript) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 |
| Data pipeline | Python 3 (pandas, Pillow, openpyxl) |
| Hosting | [Vercel](https://vercel.com) (auto-deploy from GitHub) |

---

## Quick start

```bash
git clone https://github.com/SS26-Capstone/rare-species.git
cd rare-species
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

For updating species data or photos, see the **"Running the data pipeline scripts"** section in [HANDOFF.md](./HANDOFF.md).

---

## Known issues & backlog

Tracked in this repo's GitHub Issues — includes deferred features, known limitations, and ideas for future development.

---

## About ORBIC

ORBIC is part of the Institute for Natural Resources at Portland State University and Oregon State University. Learn more at [inr.oregonstate.edu/orbic](https://inr.oregonstate.edu/orbic).
