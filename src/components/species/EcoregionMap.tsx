import fs from "fs";
import path from "path";

interface EcoregionMapProps {
  ecoregionId?: string;
}

const REGION_ORDER = ["BM", "BR", "CB", "CR", "EC", "KM", "ME", "WC", "WV"];

const STATUS_COLORS: Record<string, string> = {
  C: "#006d2c", // Certain
  P: "#74C476", // Possible
  X: "#000000", // Extirpated
  A: "#ffffff", // Absent
};

const STATUS_LABELS: Record<string, string> = {
  C: "Certain",
  P: "Possible",
  X: "Extirpated",
  A: "Absent",
};

function colorizeMap(svgString: string, ecoregionId: string): string {
  let result = svgString;
  REGION_ORDER.forEach((region, i) => {
    const status = ecoregionId[i];
    const color = STATUS_COLORS[status] ?? "#ffffff";
    // Capture the attributes and the closing "/>" separately. The paths are
    // self-closing, so appending the fill past the slash yields `<path ... / fill="...">`,
    // which leaves the element unclosed and silently nests every later region
    // inside it — only the first region would render.
    const regex = new RegExp(
      `<path([^>]*\\bid="${region}"[^>]*?)(\\s*/?>)`,
      "g",
    );
    result = result.replace(regex, (_match, attrs: string, close: string) => {
      const next = attrs.includes('fill="')
        ? attrs.replace(/fill="[^"]*"/, `fill="${color}"`)
        : `${attrs} fill="${color}"`;
      return `<path${next}${close}`;
    });
  });
  return result;
}

export default function EcoregionMap({ ecoregionId }: EcoregionMapProps) {
  if (!ecoregionId || ecoregionId.length !== REGION_ORDER.length) {
    return (
      <p className="font-body text-[11px] italic text-[#777]">
        No range data available
      </p>
    );
  }

  const svgPath = path.join(
    process.cwd(),
    "public/images/maps/ecoregion-map.svg",
  );
  const rawSvg = fs.readFileSync(svgPath, "utf-8");
  const coloredSvg = colorizeMap(rawSvg, ecoregionId);

  return (
    <div>
      <div
        className="[&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: coloredSvg }}
      />
      <div className="font-body mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[10px] text-[#555]">
        {Object.entries(STATUS_LABELS).map(([code, label]) => (
          <div key={code} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm border border-[#999]"
              style={{ backgroundColor: STATUS_COLORS[code] }}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
