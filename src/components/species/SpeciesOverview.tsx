"use client";

import { useState } from "react";
import type { Species } from "@/types/species";
import SpeciesSidebar from "./SpeciesSidebar";
import OverviewTab from "./tabs/OverviewTab";
import WhereToFindTab from "./tabs/WhereToFindTab";
import StatusRanksTab from "./tabs/StatusRanksTab";
import TaxonomyTab from "./tabs/TaxonomyTab";

const tabs = [
  "Where to Find",
  "Status & Ranks",
  "Taxonomy",
  "Overview",
] as const;

type SpeciesTab = (typeof tabs)[number];

interface SpeciesOverviewProps {
  species: Species;
}

export default function SpeciesOverview({ species }: SpeciesOverviewProps) {
  const [activeTab, setActiveTab] = useState<SpeciesTab>("Where to Find");

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
        <div className="border-r border-[#d8d8d8]">
          <div className="border-r border-[#d8d8d8] mx-10 grid grid-cols-4 text-center md:mx-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer font-body border-r border-[#d8d8d8] px-4 py-3 text-[11px] font-bold last:border-r-0 ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="px-6 py-5 md:px-10">
            {activeTab === "Overview" && <OverviewTab species={species} />}
            {activeTab === "Where to Find" && <WhereToFindTab species={species} />}
            {activeTab === "Status & Ranks" && <StatusRanksTab species={species} />}
            {activeTab === "Taxonomy" && <TaxonomyTab species={species} />}
          </div>
        </div>
        <div className="hidden lg:block">
          <SpeciesSidebar species={species} />
        </div>
      </div>
    </section>
  );
}
