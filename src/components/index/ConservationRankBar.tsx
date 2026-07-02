"use client";

import { useState } from "react";

const ranks = [
  {
    short: "5X",
    full: "5X Extinct",
    description: "5X — Extinct",
    color: "bg-[#171717]",
  },
  {
    short: "S1",
    full: "S1 Crit. Imp.",
    description: "S1 — Critically Imperiled in Oregon",
    color: "bg-[#c8103a]",
  },
  {
    short: "S2",
    full: "S2 Imperiled",
    description: "S2 — Imperiled in Oregon",
    color: "bg-[#d94f00]",
  },
  {
    short: "S3",
    full: "S3 Vulnerable",
    description: "S3 — Vulnerable in Oregon",
    color: "bg-[#9f8500]",
  },
  {
    short: "S4",
    full: "S4 App. Secure",
    description: "S4 — Apparently Secure in Oregon",
    color: "bg-[#2f7d32]",
  },
  {
    short: "S5",
    full: "S5 Secure",
    description: "S5 — Secure in Oregon",
    color: "bg-[#006b35]",
  },
];

export default function ConservationRankBar() {
  const [endemicsOnly, setEndemicsOnly] = useState(true);
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);

  const toggleRank = (rank: string) => {
    setSelectedRanks((currentRanks) =>
      currentRanks.includes(rank)
        ? currentRanks.filter((currentRank) => currentRank !== rank)
        : [...currentRanks, rank],
    );
  };

  return (
    <section className="font-body mb-3">
      <div className="mb-2 flex items-center justify-between text-[10px] text-[#6d6d6d] sm:hidden">
        <p className="font-bold text-black">
          {endemicsOnly ? "127 species" : "247 species"}
        </p>
      </div>

      <div className="mb-2 hidden items-start justify-between text-[10px] text-[#6d6d6d] sm:flex">
        <div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-pressed={endemicsOnly}
              onClick={() => setEndemicsOnly((current) => !current)}
              className={`flex h-4 w-8 cursor-pointer items-center rounded-full px-0.5 transition ${
                endemicsOnly ? "bg-[#2f7d32]" : "bg-[#b8b8b8]"
              }`}
            >
              <span
                className={`h-3 w-3 rounded-full bg-white transition ${
                  endemicsOnly ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>

            <p className="font-bold text-[#183327]">
              OR endemics only{" "}
              <span className="font-normal text-[#9a9a9a]">127 species</span>
            </p>
          </div>

          <p className="mt-1 font-bold text-black">
            {endemicsOnly ? "127 species" : "1,859 species"}{" "}
            <span className="font-normal text-[#6d6d6d]">
              match current filters
            </span>
          </p>
        </div>

        <p>Sort: Most imperiled · A-Z · Ecoregion</p>
      </div>

      <div className="grid grid-cols-6 overflow-hidden border-2 border-black text-center text-[9px] font-bold text-white sm:text-left sm:text-[10px]">
        {ranks.map((rank) => {
          const isSelected = selectedRanks.includes(rank.short);

          return (
            <button
              key={rank.short}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggleRank(rank.short)}
              className={`${rank.color} cursor-pointer px-2 py-2 text-white transition hover:brightness-110 ${
                isSelected
                  ? "z-10 ring-2 ring-black ring-inset shadow-[inset_0_0_0_2px_#ffffff]"
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
