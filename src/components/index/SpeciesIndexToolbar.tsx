"use client";

import type { SpeciesView } from "./IndexClient";

interface SpeciesIndexToolbarProps {
  view: SpeciesView;
  setView: (view: SpeciesView) => void;
  onOpenFilters: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export default function SpeciesIndexToolbar({
  view,
  setView,
  onOpenFilters,
  searchQuery,
  onSearchChange,
  onClearFilters,
}: SpeciesIndexToolbarProps) {
  return (
    <div className="mb-3 space-y-2 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-stretch md:gap-3 md:space-y-0">
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearchChange(searchQuery)}
          placeholder="Search rare species..."
          className="font-body w-full border-4 border-black px-4 py-3 pl-9 text-xs outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onOpenFilters}
          className="font-body flex flex-1 cursor-pointer items-center justify-center gap-2 border-2 border-black bg-white px-3 py-2 text-xs font-bold sm:hidden"
        >
          More filters
        </button>
        <button
          type="button"
          onClick={onClearFilters}
          className="font-body cursor-pointer whitespace-nowrap border-2 border-black bg-white px-3 py-2 text-xs font-bold transition hover:bg-black hover:text-white md:border-4 md:px-4 md:py-3"
        >
          Clear filters
        </button>
        <button
          type="button"
          aria-pressed={view === "list"}
          onClick={() => setView("list")}
          className={`font-body flex cursor-pointer items-center gap-1 border-2 border-black px-3 py-2 text-xs font-bold transition hover:bg-[#f2f2f2] hover:text-black md:border-4 md:px-5 md:py-3 ${
            view === "list" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          List
        </button>

        <button
          type="button"
          aria-pressed={view === "grid"}
          onClick={() => setView("grid")}
          className={`font-body flex cursor-pointer items-center gap-1 border-2 border-black px-3 py-2 text-xs font-bold transition hover:bg-[#f2f2f2] hover:text-black md:border-4 md:px-5 md:py-3 ${
            view === "grid" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Grid
        </button>
      </div>
    </div>
  );
}
