import type { SpeciesView } from "./IndexClient";

interface SpeciesIndexToolbarProps {
  view: SpeciesView;
  setView: (view: SpeciesView) => void;
  onOpenFilters: () => void;
}

export default function SpeciesIndexToolbar({
  view,
  setView,
  onOpenFilters,
}: SpeciesIndexToolbarProps) {
  return (
    <div className="mb-3 space-y-2 md:flex md:gap-3 md:space-y-0">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search rare species..."
          className="font-body w-full border-4 border-black px-4 py-3 pl-9 text-xs outline-none md:text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenFilters}
          className="font-body flex flex-1 cursor-pointer items-center justify-center gap-2 border-2 border-black bg-white px-3 py-2 text-xs font-bold sm:hidden"
        >
          More filters
        </button>

        <button
          type="button"
          aria-pressed={view === "list"}
          onClick={() => setView("list")}
          className={`font-body flex cursor-pointer items-center gap-1 border-2 border-black px-3 py-2 text-xs font-bold transition hover:bg-[#f2f2f2] md:border-4 md:px-5 md:py-3 ${
            view === "list" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          List
        </button>

        <button
          type="button"
          aria-pressed={view === "grid"}
          onClick={() => setView("grid")}
          className={`font-body flex cursor-pointer items-center gap-1 border-2 border-black px-3 py-2 text-xs font-bold transition hover:bg-[#f2f2f2] md:border-4 md:px-5 md:py-3 ${
            view === "grid" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Grid
        </button>
      </div>
    </div>
  );
}
