"use client";

import { useState } from "react";
import { dropdownOptions, filterRows } from "./FilterData";

const DEFAULT_FILTER_BY_ROW: Record<string, string> = {
  Taxonomy: "All species",
  Geography: "All",
};

export default function useSpeciesFilters(
  initialTaxonomyFilter?: string,
  initialEcoregionName?: string,
) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    Taxonomy: [initialTaxonomyFilter ?? "All species"],
    Status: [],
    // An incoming ecoregion is a real Geography selection, so the row must not
    // also sit on its "All" default.
    Geography: initialEcoregionName ? [] : ["All"],
  });

  const [selectedDropdownOptions, setSelectedDropdownOptions] = useState<
    Record<string, string[]>
  >(() => {
    if (initialEcoregionName) {
      return { "Ecoregion +": [initialEcoregionName] };
    }
    if (initialTaxonomyFilter && dropdownOptions[initialTaxonomyFilter]) {
      return {
        [initialTaxonomyFilter]: [...dropdownOptions[initialTaxonomyFilter]],
      };
    }
    return {};
  });

  const toggleFilter = (rowLabel: string, filterName: string) => {
    const defaultFilter = DEFAULT_FILTER_BY_ROW[rowLabel];

    if (filterName === defaultFilter) {
      const rowFilters =
        filterRows.find((row) => row.label === rowLabel)?.filters ?? [];

      setSelectedDropdownOptions((current) => {
        const nextOptions = { ...current };

        rowFilters.forEach((filter) => {
          delete nextOptions[filter];
        });

        return nextOptions;
      });

      setSelectedFilters((current) => ({
        ...current,
        [rowLabel]: [defaultFilter],
      }));

      return;
    }

    setSelectedFilters((current) => {
      const currentRow = current[rowLabel] ?? [];

      const withoutDefault = defaultFilter
        ? currentRow.filter((filter) => filter !== defaultFilter)
        : currentRow;

      const nextRow = withoutDefault.includes(filterName)
        ? withoutDefault.filter((filter) => filter !== filterName)
        : [...withoutDefault, filterName];

      const rowFilters =
        filterRows.find((row) => row.label === rowLabel)?.filters ?? [];

      const hasDropdownSelections = rowFilters.some(
        (filter) => (selectedDropdownOptions[filter]?.length ?? 0) > 0,
      );

      if (defaultFilter && nextRow.length === 0 && !hasDropdownSelections) {
        return {
          ...current,
          [rowLabel]: [defaultFilter],
        };
      }

      return {
        ...current,
        [rowLabel]: nextRow,
      };
    });
  };

  const toggleDropdownOption = (filterName: string, option: string) => {
    const currentOptions = selectedDropdownOptions[filterName] ?? [];

    const nextOptions = currentOptions.includes(option)
      ? currentOptions.filter((currentOption) => currentOption !== option)
      : [...currentOptions, option];

    const nextDropdownOptions = {
      ...selectedDropdownOptions,
      [filterName]: nextOptions,
    };

    setSelectedDropdownOptions(nextDropdownOptions);

    const row = filterRows.find((currentRow) =>
      currentRow.filters.includes(filterName),
    );

    if (!row) return;

    const defaultFilter = DEFAULT_FILTER_BY_ROW[row.label];

    if (!defaultFilter) return;

    setSelectedFilters((current) => {
      const currentRow = current[row.label] ?? [];

      const rowHasDropdownSelections = row.filters.some(
        (filter) => (nextDropdownOptions[filter]?.length ?? 0) > 0,
      );

      const selectedSpecificFilters = currentRow.filter(
        (filter) => filter !== defaultFilter,
      );

      if (selectedSpecificFilters.length === 0 && !rowHasDropdownSelections) {
        return {
          ...current,
          [row.label]: [defaultFilter],
        };
      }

      return {
        ...current,
        [row.label]: selectedSpecificFilters,
      };
    });
  };

  const toggleAllDropdownOptions = (filterName: string) => {
    const allOptions = dropdownOptions[filterName] ?? [];
    const currentOptions = selectedDropdownOptions[filterName] ?? [];

    const allSelected =
      allOptions.length > 0 &&
      allOptions.every((option) => currentOptions.includes(option));

    const nextOptions = allSelected ? [] : [...allOptions];

    const nextDropdownOptions = {
      ...selectedDropdownOptions,
      [filterName]: nextOptions,
    };

    setSelectedDropdownOptions(nextDropdownOptions);

    const row = filterRows.find((currentRow) =>
      currentRow.filters.includes(filterName),
    );

    if (!row) return;

    const defaultFilter = DEFAULT_FILTER_BY_ROW[row.label];

    if (!defaultFilter) return;

    setSelectedFilters((current) => {
      const selectedSpecificFilters = (current[row.label] ?? []).filter(
        (filter) =>
          filter !== defaultFilter &&
          (nextOptions.length > 0 || filter !== filterName),
      );

      const rowHasDropdownSelections = row.filters.some(
        (filter) => (nextDropdownOptions[filter]?.length ?? 0) > 0,
      );

      if (
        nextOptions.length === 0 &&
        selectedSpecificFilters.length === 0 &&
        !rowHasDropdownSelections
      ) {
        return {
          ...current,
          [row.label]: [defaultFilter],
        };
      }

      return {
        ...current,
        [row.label]: selectedSpecificFilters,
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      Taxonomy: ["All species"],
      Status: [],
      Geography: ["All"],
    });

    setSelectedDropdownOptions({});
  };

  return {
    selectedFilters,
    selectedDropdownOptions,
    onToggleFilter: toggleFilter,
    onToggleDropdownOption: toggleDropdownOption,
    onToggleAllDropdownOptions: toggleAllDropdownOptions,
    clearAllFilters,
  };
}
