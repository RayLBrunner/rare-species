"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { EcoregionPathData } from "@/lib/ecoregionMap";
import { ECOREGION_NAMES } from "@/lib/speciesDisplay";

const REGION_FILL = "#2c8b57";
const REGION_FILL_ACTIVE = "#14532d";
const REGION_STROKE = "#183327";

function regionHref(code: string): string {
  return `/species?ecoregion=${code}`;
}

interface EcoregionExplorerProps {
  paths: EcoregionPathData[];
  counts: Record<string, number>;
  viewBox: string;
  /** Region codes in the order the side list should read. */
  order: string[];
}

export default function EcoregionExplorer({
  paths,
  counts,
  viewBox,
  order,
}: EcoregionExplorerProps) {
  const router = useRouter();
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const pathById = new Map(paths.map((p) => [p.id, p]));
  const activeName = activeRegion ? ECOREGION_NAMES[activeRegion] : null;

  return (
    <section data-aos="fade-up">
      <div className="font-body">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-heading text-s font-bold uppercase tracking-[0.25em] text-[#26382c] md:text-lg md:normal-case md:tracking-normal">
            Explore the map
          </p>

          <p className="hidden text-[10px] text-[#6d746f] md:block">
            Select a region to filter the species index
          </p>
        </div>

        <div className="grid border-4 border-[#183327] bg-[#d8eee4] shadow-md lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col p-4">
            {/* Live label so the hovered/focused region is announced and visible. */}
            <p
              aria-live="polite"
              className="mb-2 min-h-[20px] text-center text-xs font-bold text-[#173327]"
            >
              {activeName ? (
                <>
                  {activeName}{" "}
                  <span className="font-normal text-[#446151]">
                    · {counts[activeRegion!] ?? 0} species
                  </span>
                </>
              ) : (
                <span className="font-normal text-[#6d746f]">
                  Hover or focus a region to see its name
                </span>
              )}
            </p>

            <svg
              viewBox={viewBox}
              role="group"
              aria-label="Oregon ecoregions"
              className="mx-auto h-auto w-full max-w-[520px]"
              onMouseLeave={() => setActiveRegion(null)}
            >
              {order.map((code) => {
                const path = pathById.get(code);
                if (!path) return null;

                const isActive = activeRegion === code;
                const name = ECOREGION_NAMES[code] ?? code;

                return (
                  <a
                    key={code}
                    href={regionHref(code)}
                    aria-label={`${name}, ${counts[code] ?? 0} species`}
                    onClick={(event) => {
                      event.preventDefault();
                      router.push(regionHref(code));
                    }}
                    onMouseEnter={() => setActiveRegion(code)}
                    onFocus={() => setActiveRegion(code)}
                    onBlur={() => setActiveRegion(null)}
                    className="cursor-pointer"
                  >
                    <path
                      d={path.d}
                      fillRule={path.fillRule}
                      fill={isActive ? REGION_FILL_ACTIVE : REGION_FILL}
                      stroke={REGION_STROKE}
                      strokeWidth={isActive ? 3 : 1}
                      strokeLinejoin="round"
                    />
                  </a>
                );
              })}
            </svg>
          </div>

          <div className="border-t-4 border-[#183327] bg-[#c7e3ee] px-5 py-4 lg:border-l-4 lg:border-t-0">
            <ul className="space-y-1">
              {order.map((code) => {
                const isActive = activeRegion === code;
                const name = ECOREGION_NAMES[code] ?? code;

                return (
                  <li key={code}>
                    <Link
                      href={regionHref(code)}
                      aria-label={`${name}, ${counts[code] ?? 0} species`}
                      onMouseEnter={() => setActiveRegion(code)}
                      onMouseLeave={() => setActiveRegion(null)}
                      onFocus={() => setActiveRegion(code)}
                      onBlur={() => setActiveRegion(null)}
                      className={`flex items-center justify-between gap-4 rounded-sm px-2 py-1.5 text-xs transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#183327] ${
                        isActive
                          ? "bg-[#183327] text-white"
                          : "text-[#173327] hover:bg-white/60"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 border border-[#183327]"
                          style={{
                            backgroundColor: isActive
                              ? REGION_FILL_ACTIVE
                              : REGION_FILL,
                          }}
                        />
                        <span className="w-7 font-bold">{code}</span>
                        <span>{name}</span>
                      </span>

                      <span className={isActive ? "" : "text-[#446151]"}>
                        {counts[code] ?? 0}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
