interface AdvancedFiltersModalProps {
  onClose: () => void;
}

const advancedFilterSections = [
  {
    title: "Major Group (1)",
    helper: "",
    options: ["Vascular Plants", "Animals", "Fungi"],
    checkbox: true,
  },
  {
    title: "Global Rank",
    helper: "G1 / G2 / G3 / G4 / G5 / GH / GX",
  },
  {
    title: "State Rank",
    helper: "S1 / S2 / S3 / S4 / S5 / SH / SX",
  },
  {
    title: "ESA Status",
    helper: "LE / LT / C / PT / SOC / Delisted",
  },
  {
    title: "State / Other Status",
    helper: "ORBIC List 1–4 · USFS Sensitive · BLM",
  },
  {
    title: "Habitat",
    helper: "Alpine · Forest · Grassland · Wetland · Coastal",
  },
  {
    title: "Ecoregion",
    helper: "Coast Range · WV · Klamath · Cascades · etc.",
  },
  {
    title: "County",
    helper: "36 Oregon counties — type to filter",
  },
];

export default function AdvancedFiltersModal({
  onClose,
}: AdvancedFiltersModalProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 sm:hidden">
      <aside className="font-body ml-auto flex h-full w-[88vw] max-w-sm flex-col bg-white text-black shadow-[-4px_0_0_#111]">
        <div className="flex items-center justify-between bg-[#111111] px-4 py-4 text-white">
          <h2 className="text-sm font-bold">Advanced Filters</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close advanced filters"
            className="cursor-pointer text-2xl leading-none text-white"
          >
            ×
          </button>
        </div>

        <div className="bg-[#d7ffe3] px-4 py-3 text-xs font-bold text-[#15803d]">
          247 species match current filters
        </div>

        <div className="flex-1 overflow-y-auto">
          {advancedFilterSections.map((section) => (
            <section
              key={section.title}
              className="border-b border-[#e5e5e5] px-4 py-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xs font-bold text-[#183327]">
                    {section.title}
                  </h3>

                  {section.helper && (
                    <p className="mt-1 text-[10px] text-[#6d6d6d]">
                      {section.helper}
                    </p>
                  )}

                  {section.checkbox && (
                    <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-[#333]">
                      {section.options?.map((option) => (
                        <label key={option} className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            defaultChecked={option === "Vascular Plants"}
                            className="h-3 w-3"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="cursor-pointer text-sm font-bold text-[#777]"
                >
                  ›
                </button>
              </div>
            </section>
          ))}

          <section className="px-4 py-4">
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#777]">
              Additional Filters
            </h3>

            <div className="space-y-3 text-xs">
              {[
                "Wetland-related only",
                "Oregon endemic",
                "ORBIC sensitive element",
                "Exclude records without spatial data",
              ].map((filter) => (
                <label key={filter} className="flex items-center gap-2">
                  <input type="checkbox" className="h-3 w-3" />
                  {filter}
                </label>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
