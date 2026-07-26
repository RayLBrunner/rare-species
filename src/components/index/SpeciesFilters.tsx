"use client";

import { useEffect, useRef, useState } from "react";
import { filterRows, dropdownOptions } from "./FilterData";

const mobileTaxonomyFilters = [
  {
    label: "Vascular Plants",
    filterName: "Vascular Plants +",
  },
  {
    label: "Nonvascular Plants and Fungi",
    filterName: "Nonvascular Plants and Fungi +",
  },
  {
    label: "Vertebrate Animals",
    filterName: "Vertebrate Animals +",
  },
  {
    label: "Invertebrate Animals",
    filterName: "Invertebrate Animals +",
  },
];

interface SpeciesFiltersProps {
  selectedFilters: Record<string, string[]>;
  selectedDropdownOptions: Record<string, string[]>;
  onToggleFilter: (rowLabel: string, filterName: string) => void;
  onToggleDropdownOption: (filterName: string, option: string) => void;
  onToggleAllDropdownOptions: (filterName: string) => void;
}

export default function SpeciesFilters({
  selectedFilters,
  selectedDropdownOptions,
  onToggleFilter,
  onToggleDropdownOption,
  onToggleAllDropdownOptions,
}: SpeciesFiltersProps) {
  const filtersRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

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

    onToggleFilter(rowLabel, filterName);
  };

  const toggleDropdownOption = (filterName: string, option: string) => {
    onToggleDropdownOption(filterName, option);
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

          {mobileTaxonomyFilters.map((filter) => {
            const options = dropdownOptions[filter.filterName] ?? [];

            const selectedOptions =
              selectedDropdownOptions[filter.filterName] ?? [];

            const areAllOptionsSelected =
              options.length > 0 &&
              options.every((option) => selectedOptions.includes(option));

            return (
              <button
                key={filter.filterName}
                type="button"
                aria-pressed={areAllOptionsSelected}
                onClick={() => onToggleAllDropdownOptions(filter.filterName)}
                className={`cursor-pointer border-2 border-black px-3 py-1.5 text-[10px] font-bold ${
                  areAllOptionsSelected
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {filter.label}
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
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#777]">
              {activeDropdown.replace(" +", "")}
            </p>
            <button
              type="button"
              onClick={() => setActiveDropdown(null)}
              aria-label="Close filter dropdown"
              className="text-[#777] hover:text-black transition leading-none"
            >
              ✕
            </button>
          </div>

          <div className="max-h-56 space-y-2 overflow-y-auto">
            {(() => {
              const options = dropdownOptions[activeDropdown];

              const allSelected =
                options.length > 0 &&
                options.every((option) =>
                  selectedDropdownOptions[activeDropdown]?.includes(option),
                );

              return (
                <button
                  type="button"
                  aria-pressed={allSelected}
                  onClick={() => onToggleAllDropdownOptions(activeDropdown)}
                  className={`mb-2 w-full cursor-pointer border-2 border-black px-3 py-2 text-left text-xs font-bold ${
                    allSelected ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  All
                </button>
              );
            })()}

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
