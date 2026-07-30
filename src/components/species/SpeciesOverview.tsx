"use client";

import { useState } from "react";
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

export default function SpeciesOverview() {
  const [activeTab, setActiveTab] = useState<SpeciesTab>("Where to Find");

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
        <div className="border-r border-[#d8d8d8]">
          <div className="grid grid-cols-4 border-b border-[#d8d8d8] text-center">
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
            {activeTab === "Overview" && <OverviewTab />}
            {activeTab === "Where to Find" && <WhereToFindTab />}
            {activeTab === "Status & Ranks" && <StatusRanksTab />}
            {activeTab === "Taxonomy" && <TaxonomyTab />}
          </div>
        </div>
        <div className="hidden lg:block">
          <SpeciesSidebar />
        </div>
      </div>
    </section>
  );
}
