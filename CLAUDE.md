@AGENTS.md

## Data Access Restrictions

Do NOT read, open, search, or reference any files in the following locations,
even if asked to help with a task that seems to require them:

- `raw_data/` — contains sensitive, unpublished ORBIC species location data
- Any `.xlsx` file anywhere in the project
- `raw_images/` — unprocessed source images with embedded metadata

These are gitignored intentionally and contain sensitive information (precise,
unblurred species location data) that must never be exposed in generated code,
comments, commit messages, logs, or conversation output.

If a task seems to require data from these locations, stop and ask the user to
manually provide the specific values needed (already extracted/summarized) rather
than reading the files directly.

The correct data sources for all code are:

- `src/data/species.json` — the processed, public-safe dataset
- `src/types/species.ts` — the type definitions
