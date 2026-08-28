"use client";

import { useState } from "react";
import { dropdownOptions, filterRows } from "./FilterData";

interface AdvancedFiltersModalProps {
  onClose: () => void;
  selectedFilters: Record<string, string[]>;
  selectedDropdownOptions: Record<string, string[]>;
  onToggleFilter: (rowLabel: string, filterName: string) => void;
  onToggleDropdownOption: (filterName: string, option: string) => void;
  onToggleAllDropdownOptions: (filterName: string) => void;
}

export default function AdvancedFiltersModal({
  onClose,
  selectedFilters,
  selectedDropdownOptions,
  onToggleFilter,
  onToggleDropdownOption,
  onToggleAllDropdownOptions,
}: AdvancedFiltersModalProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const activeOptions = activeFilter
    ? (dropdownOptions[activeFilter] ?? [])
    : [];
  const areAllActiveOptionsSelected =
    activeOptions.length > 0 &&
    activeOptions.every((option) =>
      activeFilter
        ? selectedDropdownOptions[activeFilter]?.includes(option)
        : false,
    );
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 sm:hidden">
      <aside className="font-body ml-auto flex h-full w-[88vw] max-w-sm flex-col bg-white text-black shadow-[-4px_0_0_#111]">
        <div className="flex items-center justify-between bg-[#111111] px-4 py-4 text-white">
          <div className="flex items-center gap-3">
            {activeFilter && (
              <button
                type="button"
                onClick={() => setActiveFilter(null)}
                aria-label="Back to advanced filters"
                className="cursor-pointer text-xl leading-none"
              >
                ←
              </button>
            )}

            <h2 className="text-sm font-bold">
              {activeFilter
                ? activeFilter.replace(" +", "")
                : "Advanced Filters"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close advanced filters"
            className="cursor-pointer text-2xl leading-none text-white"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeFilter ? (
            <div className="px-4 py-4">
              <div className="space-y-1">
                {activeFilter && (
                  <button
                    type="button"
                    aria-pressed={areAllActiveOptionsSelected}
                    onClick={() => onToggleAllDropdownOptions(activeFilter)}
                    className={`mb-2 flex w-full cursor-pointer items-center justify-between border-2 border-black px-3 py-3 text-left text-xs font-bold ${
                      areAllActiveOptionsSelected
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <span>All</span>

                    {areAllActiveOptionsSelected && <span>✓</span>}
                  </button>
                )}
                {activeOptions.map((option) => {
                  const isChecked =
                    selectedDropdownOptions[activeFilter]?.includes(option) ??
                    false;

                  return (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 border-b border-[#e5e5e5] py-3 text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          onToggleDropdownOption(activeFilter, option)
                        }
                        className="h-4 w-4 accent-black"
                      />

                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              {filterRows.map((row) => (
                <section key={row.label} className="border-b border-[#d8d8d8]">
                  <div className="bg-[#f7f6f2] px-4 py-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#777]">
                      {row.label}
                    </h3>
                  </div>
                  {row.filters.map((filter) => {
                    const hasOptions = Boolean(dropdownOptions[filter]);

                    const selectedOptionCount =
                      selectedDropdownOptions[filter]?.length ?? 0;

                    const isSelected =
                      selectedFilters[row.label]?.includes(filter) ?? false;

                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => {
                          if (hasOptions) {
                            setActiveFilter(filter);
                            return;
                          }

                          onToggleFilter(row.label, filter);
                        }}
                        className={`flex w-full cursor-pointer items-center justify-between border-b border-[#e5e5e5] px-4 py-4 text-left text-xs last:border-b-0 ${
                          isSelected
                            ? "bg-[#d7ffe3] font-bold text-[#15803d]"
                            : "bg-white text-[#183327]"
                        }`}
                      >
                        <span>{filter.replace(" +", "")}</span>

                        {hasOptions ? (
                          <span className="flex items-center gap-2 text-[10px] text-[#777]">
                            {selectedOptionCount > 0 && (
                              <span>{selectedOptionCount} selected</span>
                            )}

                            <span className="text-base">›</span>
                          </span>
                        ) : (
                          isSelected && (
                            <span className="text-sm text-[#15803d]">✓</span>
                          )
                        )}
                      </button>
                    );
                  })}
                </section>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
