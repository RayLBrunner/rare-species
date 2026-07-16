"use client";

import { useState } from "react";
import AdvancedFiltersModal from "./AdvancedFiltersModal";
import ConservationRankBar from "./ConservationRankBar";
import SpeciesFilters from "./SpeciesFilters";
import SpeciesIndexGrid from "./SpeciesIndexGrid";
import SpeciesIndexList from "./SpeciesIndexList";
import SpeciesIndexToolbar from "./SpeciesIndexToolbar";
import useSpeciesFilters from "./useSpeciesFilters";

export type SpeciesView = "grid" | "list";

export default function IndexClient() {
  const [view, setView] = useState<SpeciesView>("list");
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  const filters = useSpeciesFilters();

  return (
    <>
      <SpeciesIndexToolbar
        view={view}
        setView={setView}
        onOpenFilters={() => setIsAdvancedFiltersOpen(true)}
      />

      <SpeciesFilters {...filters} />

      <ConservationRankBar />

      {view === "grid" ? <SpeciesIndexGrid /> : <SpeciesIndexList />}

      {isAdvancedFiltersOpen && (
        <AdvancedFiltersModal
          onClose={() => setIsAdvancedFiltersOpen(false)}
          {...filters}
        />
      )}
    </>
  );
}
