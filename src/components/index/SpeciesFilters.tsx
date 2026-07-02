"use client";

import { useEffect, useRef, useState } from "react";

const filterRows = [
  {
    label: "Taxonomy",
    filters: [
      "All species",
      "Plants",
      "Animals",
      "Fungi",
      "Phylum +",
      "Class +",
      "Order +",
      "Family +",
      "Genus +",
      "Var / Subsp. +",
    ],
  },
  {
    label: "Status",
    filters: [
      "Critically imperiled",
      "ESA listed",
      "ORBIC list +",
      "ODFW strategy +",
      "Species list +",
    ],
  },
  {
    label: "Geography",
    filters: [
      "Coast Range",
      "West Cascades",
      "East Cascades",
      "Willamette Valley",
      "Blue Mountains",
      "Klamath Mtns",
      "Columbia Plateau",
      "Basin & Range",
      "County +",
      "Other states +",
    ],
  },
];

const dropdownOptions: Record<string, string[]> = {
  "Phylum +": ["Tracheophyta", "Bryophyta", "Ascomycota", "Chordata"],
  "Class +": ["Magnoliopsida", "Liliopsida", "Pinopsida", "Amphibia"],
  "Order +": ["Fabales", "Lamiales", "Pinales", "Anura", "Lepidoptera"],
  "Family +": [
    "Fabaceae",
    "Pinaceae",
    "Ranidae",
    "Lycaenidae",
    "Scrophulariaceae",
  ],
  "Genus +": ["Lupinus", "Pinus", "Rana", "Icaricia", "Castilleja"],
  "Var / Subsp. +": ["var. oreganus", "ssp. fenderi", "var. umbellata"],
  "ORBIC list +": ["List 1", "List 2", "List 3", "List 4"],
  "ODFW strategy +": ["Strategy Species", "Sensitive", "Watch List"],
  "Species list +": ["Federal ESA", "State Listed", "ORBIC Tracked"],
  "County +": ["Benton", "Clackamas", "Lane", "Linn", "Marion", "Multnomah"],
  "Other states +": ["Washington", "California", "Idaho", "Nevada"],
};

export default function SpeciesFilters() {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    Taxonomy: ["All species"],
    Status: [],
    Geography: [],
  });

  const filtersRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const [selectedDropdownOptions, setSelectedDropdownOptions] = useState<
    Record<string, string[]>
  >({});

  const openDropdown = (filterName: string, button: HTMLButtonElement) => {
    const rect = button.getBoundingClientRect();

    const dropdownWidth = 256;
    const pagePadding = 12;

    const rawLeft = rect.left + window.scrollX;
    const maxLeft =
      window.scrollX + window.innerWidth - dropdownWidth - pagePadding;

    setDropdownPosition({
      top: rect.bottom + window.scrollY + 8,
      left: Math.max(window.scrollX + pagePadding, Math.min(rawLeft, maxLeft)),
    });

    setActiveDropdown(filterName);
  };

  const toggleFilter = (rowLabel: string, filterName: string) => {
    setActiveDropdown(null);

    setSelectedFilters((current) => {
      const currentRow = current[rowLabel] ?? [];

      if (rowLabel === "Taxonomy" && filterName === "All species") {
        return {
          ...current,
          Taxonomy: ["All species"],
        };
      }

      const withoutAllSpecies =
        rowLabel === "Taxonomy"
          ? currentRow.filter((filter) => filter !== "All species")
          : currentRow;

      const nextRow = withoutAllSpecies.includes(filterName)
        ? withoutAllSpecies.filter((filter) => filter !== filterName)
        : [...withoutAllSpecies, filterName];

      return {
        ...current,
        [rowLabel]:
          rowLabel === "Taxonomy" && nextRow.length === 0
            ? ["All species"]
            : nextRow,
      };
    });
  };

  const toggleDropdownOption = (filterName: string, option: string) => {
    setSelectedDropdownOptions((current) => {
      const currentOptions = current[filterName] ?? [];

      const nextOptions = currentOptions.includes(option)
        ? currentOptions.filter((currentOption) => currentOption !== option)
        : [...currentOptions, option];

      return {
        ...current,
        [filterName]: nextOptions,
      };
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInsideFilters = filtersRef.current?.contains(target);
      const clickedInsideDropdown = dropdownRef.current?.contains(target);

      if (!clickedInsideFilters && !clickedInsideDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <section className="font-body mb-3 space-y-2 sm:hidden">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            aria-pressed={
              selectedFilters.Taxonomy?.includes("All species") ?? false
            }
            onClick={() => toggleFilter("Taxonomy", "All species")}
            className={`cursor-pointer border-2 border-black px-3 py-1.5 text-[10px] font-bold ${
              selectedFilters.Taxonomy?.includes("All species")
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            All
          </button>

          {["Plants", "Animals", "Fungi"].map((filter) => {
            const isSelected =
              selectedFilters.Taxonomy?.includes(filter) ?? false;

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleFilter("Taxonomy", filter)}
                className={`cursor-pointer border-2 border-black px-3 py-1.5 text-[10px] font-bold ${
                  isSelected ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {filter}
              </button>
            );
          })}

          {[
            {
              row: "Status",
              value: "ESA listed",
              label: "Endangered",
              icon: "◆",
            },
            { row: "Geography", value: "Coast Range", label: "Coast" },
            { row: "Geography", value: "OR Endemic", label: "OR Endemic" },
          ].map((filter) => {
            const isSelected =
              selectedFilters[filter.row]?.includes(filter.value) ?? false;

            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleFilter(filter.row, filter.value)}
                className={`cursor-pointer border-2 px-3 py-1.5 text-[10px] font-bold ${
                  filter.value === "OR Endemic"
                    ? isSelected
                      ? "border-[#36b36b] bg-[#36b36b] text-white"
                      : "border-[#36b36b] bg-white text-[#178a45]"
                    : isSelected
                      ? "border-black bg-black text-white"
                      : "border-black bg-white text-black"
                }`}
              >
                {filter.icon && (
                  <span className="mr-1 text-red-600">{filter.icon}</span>
                )}
                {filter.label}
              </button>
            );
          })}
        </div>
      </section>
      <section
        ref={filtersRef}
        className="font-body mb-3 hidden border border-[#d8d8d8] bg-white text-xs sm:block"
      >
        {filterRows.map((row) => (
          <div
            key={row.label}
            className="grid border-b border-[#d8d8d8] last:border-b-0 md:grid-cols-[120px_1fr]"
          >
            <div className="bg-[#f7f6f2] px-4 py-3 font-bold text-[#6d6d6d]">
              {row.label}
            </div>

            <div className="flex gap-2 overflow-x-auto px-3 py-2">
              {row.filters.map((filter) => {
                const selectedPlainFilter =
                  selectedFilters[row.label]?.includes(filter) ?? false;

                const selectedDropdownCount =
                  selectedDropdownOptions[filter]?.length ?? 0;

                const isSelected =
                  selectedPlainFilter || selectedDropdownCount > 0;

                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={(event) => {
                      event.stopPropagation();

                      if (dropdownOptions[filter]) {
                        if (activeDropdown === filter) {
                          setActiveDropdown(null);
                          return;
                        }

                        openDropdown(filter, event.currentTarget);
                        return;
                      }

                      toggleFilter(row.label, filter);
                    }}
                    className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 transition hover:border-black ${
                      isSelected
                        ? "border-black bg-black font-bold text-white"
                        : "border-[#d8d8d8] bg-white text-[#5f5f5f]"
                    }`}
                  >
                    {filter}
                    {selectedDropdownCount > 0 && ` (${selectedDropdownCount})`}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {activeDropdown && dropdownOptions[activeDropdown] && (
        <div
          ref={dropdownRef}
          onClick={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
          className="font-body absolute z-40 hidden w-64 border-2 border-black bg-white p-3 text-xs shadow-[4px_4px_0_#222] sm:block"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        >
          <div className="mb-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#777]">
              {activeDropdown.replace(" +", "")}
            </p>
          </div>

          <div className="max-h-56 space-y-2 overflow-y-auto">
            {dropdownOptions[activeDropdown].map((option) => {
              const isChecked =
                selectedDropdownOptions[activeDropdown]?.includes(option) ??
                false;

              return (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 text-xs text-black"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() =>
                      toggleDropdownOption(activeDropdown, option)
                    }
                    className="h-3 w-3 accent-black"
                  />

                  {option}
                </label>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
