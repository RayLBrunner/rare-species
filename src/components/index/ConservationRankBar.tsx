"use client";

import { stateRankBarItems } from "./FilterData";

interface ConservationRankBarProps {
  selectedRanks: string[];
  onToggleRank: (rank: string) => void;
}

export default function ConservationRankBar({
  selectedRanks,
  onToggleRank,
}: ConservationRankBarProps) {
  return (
    <section className="font-body mb-3">
      <div className="grid grid-cols-6 overflow-hidden border-2 border-black text-center text-[9px] font-bold text-white sm:text-left sm:text-[10px]">
        {stateRankBarItems.map((rank) => {
          const isSelected = selectedRanks.includes(rank.short);

          return (
            <button
              key={rank.short}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggleRank(rank.short)}
              className={`${rank.color} cursor-pointer px-2 py-2 text-white transition hover:brightness-110 ${
                isSelected
                  ? "z-10 ring-2 ring-white ring-inset shadow-[inset_0_0_0_2px_#ffffff]"
                  : ""
              }`}
            >
              <span className="sm:hidden">{rank.short}</span>
              <span className="hidden sm:inline">{rank.full}</span>
            </button>
          );
        })}
      </div>

      <p className="font-body mt-1 text-[11px] text-[#666]">
        What do these ranks mean?{" "}
        <a
          href="https://inr.oregonstate.edu/rare-species/rare-species-ranking-definitions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#16873d] hover:underline"
        >
          ORBIC&apos;s ranking definitions
        </a>
      </p>
    </section>
  );
}
