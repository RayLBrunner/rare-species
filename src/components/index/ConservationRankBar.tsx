"use client";

const ranks = [
  { short: "5X", full: "5X Extinct", color: "bg-[#171717]" },
  { short: "S1", full: "S1 Crit. Imp.", color: "bg-[#c8103a]" },
  { short: "S2", full: "S2 Imperiled", color: "bg-[#d94f00]" },
  { short: "S3", full: "S3 Vulnerable", color: "bg-[#9f8500]" },
  { short: "S4", full: "S4 App. Secure", color: "bg-[#2f7d32]" },
  { short: "S5", full: "S5 Secure", color: "bg-[#006b35]" },
];

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
        {ranks.map((rank) => {
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
    </section>
  );
}
