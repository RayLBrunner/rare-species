# ORBIC Rare Species Field Guide — Developer Handoff

This document is written for a developer inheriting this project who may be unfamiliar with the codebase. It covers everything needed to get the site running, update the data, and understand how the project is deployed.

---

## What this project is

The **ORBIC Rare Species Field Guide** is a public-facing web application that lets users browse and search Oregon's rare and sensitive species. It was built by a Portland State University capstone team for the Oregon Biodiversity Information Center (ORBIC).

The site is a static-ish web app: species data lives in a checked-in JSON file (`src/data/species.json`), and Python scripts are used to regenerate that file and process photos whenever ORBIC provides a new data snapshot.

---

## Tech stack

| Layer | Technology |
|---|---|
| Web framework | [Next.js](https://nextjs.org/) 16 (React 19, TypeScript) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 |
| Carousel | `react-slick` + `slick-carousel` |
| Data pipeline | Python 3 (pandas, Pillow, openpyxl) |
| Hosting | Vercel (auto-deploy from GitHub) |

**Note on the carousel:** The `FeaturedSpeciesCarousel` component uses `react-slick`, which requires the separate `slick-carousel` package for its CSS. Both `slick.css` and `slick-theme.css` are imported globally in `src/app/layout.tsx`. If a future developer replaces or removes the carousel, those two imports can be safely removed at the same time.

---

## What you need installed

### Node.js
The site requires **Node.js 20 or later**. Node.js 22 (LTS) is recommended for stability.

Check if you have it:
```
node --version
```

If you need to install it: https://nodejs.org/en/download — download the **LTS** version for your operating system and run the installer.

### Python
The data pipeline scripts require **Python 3.10 or later**.

Check if you have it:
```
python3 --version
```

If you need to install it: https://www.python.org/downloads/ — download the latest stable release and run the installer. On Windows, check the box that says **"Add Python to PATH"** during installation.

---

## Getting the code

```
git clone git@github.com:SS26-Capstone/rare-species.git
cd rare-species
```

If you don't have SSH set up with GitHub, use the HTTPS version instead:
```
git clone https://github.com/SS26-Capstone/rare-species.git
cd rare-species
```

---

## Installing JavaScript dependencies

From inside the `rare-species` folder, run:
```
npm install
```

This reads `package.json` and downloads everything the site needs into a `node_modules` folder. It only needs to be run once (or again whenever `package.json` changes).

---

## Running the site locally

```
npm run dev
```

Then open your browser and go to: **http://localhost:3000**

The dev server watches for file changes and refreshes automatically. Press `Ctrl+C` in the terminal to stop it.

To check that the site builds correctly before deploying:
```
npm run build
```

---

## Setting up Python for the data pipeline

The data pipeline scripts live in `scripts/`. They are only needed when ORBIC provides a new species data snapshot or new photos — you don't need Python just to run the website.

**One-time setup:**

```
# 1. Create a virtual environment (keeps these packages isolated from your system)
python3 -m venv venv

# 2. Activate it (macOS / Linux)
source venv/bin/activate

# On Windows, use this instead:
# venv\Scripts\activate

# 3. Install the required packages
pip install -r requirements.txt
```

Your terminal prompt should now show `(venv)` at the start, indicating the environment is active. You'll need to activate it again (`source venv/bin/activate`) each time you open a new terminal window.

---

## Running the data pipeline scripts

> **Important:** The raw data files (`raw_data/`, `raw_images/`) are intentionally not included in this repository — they contain sensitive, unpublished species location data. You will need to obtain them directly from Ray at ORBIC before running these scripts.

### When Ray sends a new species data snapshot (CSV)

1. Place the new `.csv` file in the `raw_data/` folder
2. Open `scripts/csv_to_json.py` and update the `INPUT_CSV` constant at the top of the file to match the new filename
3. Make sure your Python virtual environment is active (`source venv/bin/activate`)
4. Run:
   ```
   python3 scripts/csv_to_json.py
   ```
5. This overwrites `src/data/species.json` with the new data. Commit that file and deploy.

### When Ray sends new species photos

You will also need the Excel image index file (`TaxonImagesIndex.xlsx`) from Ray. Place it at the root of the repo.

1. Place the new raw image files in `raw_images/ForWeb/`
2. Make sure your Python virtual environment is active
3. Run:
   ```
   python3 scripts/process_species_images.py
   ```
4. This converts images to WebP format, writes them to `public/images/species/`, and updates `src/data/photoAttribution.json`. Commit both and deploy.

Log files are written to a `logs/` folder after the image script runs — check them if any images appear to be missing.

---


## Saving and publishing your changes

After running a data pipeline script (or making any change to the project), you need to save and share it so the live site actually updates. This is called "committing and pushing."

1. Check what changed:
   ```
   git status
   ```

2. Stage the changed files:
   ```
   git add .
   ```

3. Commit them with a short description of what changed:
   ```
   git commit -m "update species data - August snapshot"
   ```

4. Push to GitHub:
   ```
   git push
   ```

That's it — within a few minutes, Vercel will automatically rebuild and publish the updated site. You can watch the deploy progress at vercel.com under your project's "Deployments" tab.

> **Note:** the very first time you do this on a new computer, git may ask you to log in to GitHub. Follow the on-screen prompts — this only needs to happen once.

## Hosting and deployments

The site is hosted on **[Vercel](https://vercel.com)** and connected to the GitHub repository at `github.com/SS26-Capstone/rare-species`.

**How deploys work:**
- Every time a pull request is merged into the main branch, Vercel automatically builds and deploys the updated site. No manual steps are needed.
- Vercel also creates a temporary preview URL for every open pull request, so you can review changes before merging.
- The Vercel project settings (environment variables, domain configuration, etc.) are managed through the Vercel dashboard at vercel.com. You will need to be added as a member of the Vercel team to access it.

---

## Code documentation and style guide

Coming soon — this will be a separate document covering code conventions, component structure, and the data model.

---

## Where things live (quick reference)

| What | Where |
|---|---|
| Species data (public) | `src/data/species.json` |
| Photo attribution | `src/data/photoAttribution.json` |
| TypeScript types | `src/types/species.ts` |
| Page routes | `src/app/` |
| Reusable components | `src/components/` |
| Shared helper functions | `src/lib/` |
| Data pipeline scripts | `scripts/` |
| Processed species images | `public/images/species/` |
| Category + UI images | `public/images/categories/` |
