import type { ReactNode } from "react";
import type { Species } from "@/types/species";
import {
  ECOREGION_NAMES,
  ECOREGION_COLORS,
  COUNTY_NAMES,
  parseAbbrs,
  getOrEndemicFlag,
} from "@/lib/speciesDisplay";

interface WhereToFindTabProps {
  species: Species;
  ecoregionMap: ReactNode;
}

export default function WhereToFindTab({
  species,
  ecoregionMap,
}: WhereToFindTabProps) {
  const ecoregionCodes = parseAbbrs(species.ecoregion as string | undefined);
  const countyCodes = parseAbbrs(species.county);
  const isOrEndemic = getOrEndemicFlag(species.orEndemic);

  const countyNames = countyCodes
    .map((code) => COUNTY_NAMES[code] ?? code)
    .filter(Boolean);

  const hasOtherStates =
    species.otherStates &&
    species.otherStates !== "0" &&
    species.otherStates.trim() !== "";

  return (
    <div>
      {ecoregionCodes.length > 0 && (
        <section className="border-b border-[#e5e5e5] pb-5">
          <h2 className="font-body mb-3 text-[13px] font-bold text-black">
            Ecoregions
          </h2>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
            {ecoregionCodes.map((code) => (
              <div
                key={code}
                className={`font-body rounded-[3px] px-3 py-2 text-[12px] font-bold text-white ${
                  ECOREGION_COLORS[code] ?? "bg-[#6d6d6d]"
                }`}
              >
                {ECOREGION_NAMES[code] ?? code}
              </div>
            ))}
          </div>
        </section>
      )}

      {countyNames.length > 0 && (
        <section className="border-b border-[#e5e5e5] py-5">
          <h2 className="font-body mb-2 text-[13px] font-bold text-black">
            Counties
          </h2>
          <p className="font-body text-[12px] text-[#555]">
            {countyNames.join(" · ")}
          </p>
        </section>
      )}

      <section className="border-b border-[#e5e5e5] py-5">
        <h2 className="font-body mb-2 text-[13px] font-bold text-black">
          Other states / provinces
        </h2>

        {hasOtherStates ? (
          <p className="font-body text-[12px] text-[#555]">
            {species.otherStates}
          </p>
        ) : (
          <p className="font-body text-[12px] italic text-[#555]">
            Not found outside Oregon
          </p>
        )}

        {isOrEndemic && (
          <div className="font-body mt-4 inline-block rounded-[3px] bg-[#15803d] px-3 py-2 text-[12px] font-bold text-white">
            Oregon Endemic: Found only in Oregon
          </div>
        )}
      </section>

      <section className="pt-5">
        <h2 className="font-body mb-3 text-[13px] font-bold text-black">
          Range map
        </h2>

        <div className="border border-[#d6d0c8] bg-[#ddd9d2] p-4">
          <div className="mx-auto max-w-[280px] md:max-w-[360px]">
            {ecoregionMap}
          </div>
        </div>
      </section>
    </div>
  );
}
