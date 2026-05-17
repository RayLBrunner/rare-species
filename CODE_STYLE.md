# Code Style Guide

## Git
 
**Branch names**: `feature/`, `fix/`, or `chore/` prefix, kebab-case description.
```
feature/species-template
fix/mobile-nav-issue
chore/update-something
```

Commit Message:
- lowercase, present tense, short and specific

**Never commit directly to `main` or `dev`.** Always work on a feature branch and open a pull request. At least one teammate reviews before merging to `dev`.

## Formatting

We'll use Prettier in VSCode.
- Turn on save to format in settings, so that every time the file is saved it automatically gets formatted

## Naming
 
### Variables and functions — `camelCase`
```typescript
const numSpecies = 2000;
function filterSpecies(species, ...) { ... }
```
 
### React components — `PascalCase`
```typescript
function SpeciesCard({ species }) { ... }
function StatusBadge({ rank }) { ... }
```
Components are capitalized because that's how React tells them apart from plain HTML tags (`<div>` vs `<SpeciesCard />`).
 
### Types and interfaces — `PascalCase`
```typescript
interface Species { ... }
type OrbicRank = "S1" | "S2" | ...;
```
 
### Files and folders — `kebab-case` for routes, `PascalCase` for components
 
### Constants — `SCREAMING_SNAKE_CASE`

## TypeScript
- Don't use `any`. It defeats the purpose of TypeScript.
- Always import types from @/types/species.ts. Don't redefine types that already exist.

## React Components
**One component per file.** Small helper components used only inside one file are the exception.

**Props go at the top of the file, right above the component.**
```typescript
interface SpeciesCardProps {
  species: Species;
  showStatus?: boolean;
}
 
export default function SpeciesCard({ species, showStatus = false }: SpeciesCardProps) {
  ...
}
```

## Comments
 
- **Comment the why, not the what.** If the code clearly says what it does, don't re-explain it. Explain why a decision was made, especially if it's non-obvious.
- **Mark unfinished work with `// TODO:` so it's searchable.**
- **Mark known issues with `// FIXME:`.**
