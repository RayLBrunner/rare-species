"use client";

import { useState, type ReactNode } from "react";
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
  ecoregionMap: ReactNode;
}

export default function SpeciesOverview({
  species,
  ecoregionMap,
}: SpeciesOverviewProps) {
  const [activeTab, setActiveTab] = useState<SpeciesTab>("Where to Find");

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
        <div className="border-r border-[#d8d8d8]">
          <div className="border-l border-b border-t border-[#d8d8d8] grid grid-cols-4 text-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer font-body border-r border-[#d8d8d8] py-3 text-[1em] font-bold last:border-r-0 ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-5 md:pr-10">
            {activeTab === "Overview" && <OverviewTab species={species} />}
            {activeTab === "Where to Find" && (
              <WhereToFindTab species={species} ecoregionMap={ecoregionMap} />
            )}
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
