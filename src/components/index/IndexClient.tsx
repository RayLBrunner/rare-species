"use client";

import { useState } from "react";
import AdvancedFiltersModal from "./AdvancedFiltersModal";
import ConservationRankBar from "./ConservationRankBar";
import SpeciesFilters from "./SpeciesFilters";
import SpeciesIndexGrid from "./SpeciesIndexGrid";
import SpeciesIndexList from "./SpeciesIndexList";
import SpeciesIndexToolbar from "./SpeciesIndexToolbar";

export type SpeciesView = "grid" | "list";

export default function IndexClient() {
  const [view, setView] = useState<SpeciesView>("grid");
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  return (
    <>
      <SpeciesIndexToolbar
        view={view}
        setView={setView}
        onOpenFilters={() => setIsAdvancedFiltersOpen(true)}
      />

      <SpeciesFilters/>

      <ConservationRankBar />

      {view === "grid" ? <SpeciesIndexGrid /> : <SpeciesIndexList />}

      {isAdvancedFiltersOpen && (
        <AdvancedFiltersModal onClose={() => setIsAdvancedFiltersOpen(false)} />
      )}
    </>
  );
}
