"use client";

import { useState } from "react";
import SpeciesIndexCard from "./SpeciesIndexCard";

interface SpeciesIndexItem {
  name: string;
  scientificName: string;
  slug: string;
  list: string;
  listColor: string;
}

const INITIAL_MOBILE_COUNT = 4;
const LOAD_MORE_COUNT = 4;

const SPECIES: SpeciesIndexItem[] = [
  {
    name: "Kincaid's Lupine",
    scientificName: "Lupinus oreganus",
    slug: "kincaids-lupine",
    list: "List 1",
    listColor: "bg-[#c8103a]",
  },
  {
    name: "Whitebark Pine",
    scientificName: "Pinus albicaulis",
    slug: "whitebark-pine",
    list: "List 2",
    listColor: "bg-[#d94f00]",
  },
  {
    name: "OR Spotted Frog",
    scientificName: "Rana pretiosa",
    slug: "or-spotted-frog",
    list: "LT",
    listColor: "bg-[#d94f00]",
  },
  {
    name: "Pink Sand Verbena",
    scientificName: "Abronia umbellata",
    slug: "pink-sand-verbena",
    list: "List 1",
    listColor: "bg-[#c8103a]",
  },
  {
    name: "Fender's Blue Butterfly",
    scientificName: "Icaricia icarioides fenderi",
    slug: "fenders-blue-butterfly",
    list: "List 1",
    listColor: "bg-[#c8103a]",
  },
  {
    name: "Western Pond Turtle",
    scientificName: "Actinemys marmorata",
    slug: "western-pond-turtle",
    list: "List 2",
    listColor: "bg-[#d94f00]",
  },
  {
    name: "Golden Paintbrush",
    scientificName: "Castilleja levisecta",
    slug: "golden-paintbrush",
    list: "List 1",
    listColor: "bg-[#c8103a]",
  },
  {
    name: "Bristly Sculpin",
    scientificName: "Cottus asperrimus",
    slug: "bristly-sculpin",
    list: "List 3",
    listColor: "bg-[#9f8500]",
  },
];

export default function SpeciesIndexGrid() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_MOBILE_COUNT);

  const visibleMobileSpecies = SPECIES.slice(0, visibleCount);
  const hasMoreSpecies = visibleCount < SPECIES.length;

  const handleLoadMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + LOAD_MORE_COUNT, SPECIES.length),
    );
  };

  return (
    <>
      <section className="grid grid-cols-2 gap-2 sm:hidden">
        {visibleMobileSpecies.map((item) => (
          <SpeciesIndexCard key={item.slug} {...item} />
        ))}
      </section>

      <section className="hidden sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {SPECIES.map((item) => (
          <SpeciesIndexCard key={item.slug} {...item} />
        ))}
      </section>

      {hasMoreSpecies && (
        <div className="font-body mt-5 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={handleLoadMore}
            className="cursor-pointer text-xs font-semibold text-[#6d6d6d] hover:text-black"
          >
            Load more ↓
          </button>
        </div>
      )}
    </>
  );
}
