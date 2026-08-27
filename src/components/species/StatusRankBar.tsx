import type { Species } from "@/types/species";
import {
  FEDERAL_RANK_LABELS,
  ORBIC_LIST_DESCRIPTIONS,
  getGlobalRankDescription,
  getStateRankDescription,
  getStateRankColor,
} from "@/lib/speciesDisplay";

interface StatusRankBarProps {
  species: Species;
}

const rankSegments = [
  { code: "SX", label: "SX", bg: "bg-black" },
  { code: "S1", label: "S1", bg: "bg-[#c71945]" },
  { code: "S2", label: "S2", bg: "bg-[#d6420f]" },
  { code: "S3", label: "S3", bg: "bg-[#b59b00]" },
  { code: "S4", label: "S4", bg: "bg-[#4e8f12]" },
  { code: "S5", label: "S5", bg: "bg-[#0d6b37]" },
];

export default function StatusRankBar({ species }: StatusRankBarProps) {
  const stateRank = species.stateRank ?? "";
  const rankDescription = getStateRankDescription(stateRank);
  const rankColor = getStateRankColor(stateRank);

  return (
    <section className="bg-white py-3">
      <div className="flex gap-3 flex-row items-center justify-between">
        <div className="w-full lg:max-w-[620px]">
          <p className="font-body mb-2 text-[11px] font-semibold text-[#4d4d4d]">
            State Rank
          </p>

          <div className="overflow-x-auto">
            <div className="flex h-7 w-full overflow-hidden rounded-sm border-2 border-black text-[12px] font-bold text-white md:h-8">
              {rankSegments.map(({ code, label, bg }) => {
                const isActive = stateRank.includes(code);
                return (
                  <div
                    key={code}
                    className={`flex w-1/6 items-center px-2 ${bg} ${
                      isActive ? "ring-2 ring-inset ring-white" : "opacity-40"
                    }`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          <p className={`font-body mt-2 text-[11px] font-semibold md:text-[12px] ${rankColor}`}>
            {stateRank} — {rankDescription}
          </p>
        </div>

        <div className="hidden md:flex md:gap-2">
          <div className="min-w-[95px] border-2 border-black bg-white p-3">
            <p className="font-body text-sm font-bold text-[#c71945]">
              {species.globalRank}
            </p>
            <p className="font-body mt-1 text-[11px] uppercase text-gray-500">
              Global Rank
            </p>
            <p className="font-body text-[12px] font-semibold">
              {getGlobalRankDescription(species.globalRank)}
            </p>
          </div>

          {species.federalRank && (
            <div className="min-w-[95px] border-2 border-black bg-white p-3">
              <p className="font-body text-sm font-bold text-[#d94a15]">
                {species.federalRank}
              </p>
              <p className="font-body mt-1 text-[11px] uppercase text-gray-500">
                Federal ESA
              </p>
              <p className="font-body text-[12px] font-semibold">
                {FEDERAL_RANK_LABELS[species.federalRank] ?? species.federalRank}
              </p>
            </div>
          )}

          {species.orbicList && (
            <div className="min-w-[95px] border-2 border-black bg-white p-3">
              <p className="font-body text-sm font-bold text-[#c71945]">
                List {species.orbicList}
              </p>
              <p className="font-body mt-1 text-[11px] uppercase text-gray-500">
                ORBIC
              </p>
              <p className="font-body text-[12px] font-semibold">
                {ORBIC_LIST_DESCRIPTIONS[species.orbicList] ?? `List ${species.orbicList}`}
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="font-body mt-2 text-[11px] text-[#666]">
        What do these ranks mean?{" "}
        <a
          href="https://inr.oregonstate.edu/rare-species/rare-species-ranking-definitions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#16873d] hover:underline"
        >
          ORBIC&apos;s ranking definitions
        </a>{" "}
        or{" "}
        <a
          href="https://www.natureserve.org/nsexplorer/about-the-data/statuses/conservation-status-categories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#16873d] hover:underline"
        >
          NatureServe&apos;s conservation status categories
        </a>
      </p>
    </section>
  );
}
