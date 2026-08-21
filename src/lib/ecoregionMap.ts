import fs from "fs";
import path from "path";

/**
 * Server-side reader for the shared Oregon ecoregion SVG.
 *
 * The static per-species map (src/components/species/EcoregionMap.tsx) injects
 * fills into the raw markup, but the interactive homepage map needs real React
 * elements so each region can carry its own event handlers and focus state.
 * This pulls the geometry out of the file once, at build/request time, so the
 * client component only receives the path data it renders.
 */

export interface EcoregionPathData {
  id: string;
  d: string;
  fillRule?: "evenodd" | "nonzero";
}

const SVG_PATH = "public/images/maps/ecoregion-map.svg";

export const ECOREGION_VIEWBOX = "0 0 800 576";

export function getEcoregionPaths(): EcoregionPathData[] {
  const file = fs.readFileSync(path.join(process.cwd(), SVG_PATH), "utf-8");

  const paths: EcoregionPathData[] = [];
  const tagRegex = /<path\b([^>]*)\/?>/g;

  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(file)) !== null) {
    const attrs = match[1];

    const id = attrs.match(/\bid="([^"]+)"/)?.[1];
    const d = attrs.match(/\bd="([^"]+)"/)?.[1];
    if (!id || !d) continue;

    const fillRule = attrs.match(/\bfill-rule="([^"]+)"/)?.[1];

    paths.push({
      id,
      d,
      fillRule: fillRule === "evenodd" ? "evenodd" : undefined,
    });
  }

  return paths;
}
