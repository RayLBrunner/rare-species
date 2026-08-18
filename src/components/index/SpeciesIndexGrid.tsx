import type { Species } from "@/types/species";
import SpeciesIndexCard from "./SpeciesIndexCard";

const LIST_COLOR: Record<string, string> = {
  "1": "bg-[#c8103a]",
  "2": "bg-[#d94f00]",
  "3": "bg-[#9f8500]",
  "4": "bg-[#2f7d32]",
};

interface SpeciesIndexGridProps {
  species: Species[];
}

export default function SpeciesIndexGrid({ species }: SpeciesIndexGridProps) {
  return (
    <>
      <section className="grid grid-cols-2 gap-2 sm:hidden">
        {species.map((item) => (
          <SpeciesIndexCard
            key={item.slug}
            name={item.commonName ?? item.scientificName}
            scientificName={item.scientificName}
            slug={item.slug}
            list={item.orbicList ? `List ${item.orbicList}` : "—"}
            listColor={LIST_COLOR[String(item.orbicList)] ?? "bg-[#6d6d6d]"}
            elementGlobalId={item.elementGlobalId}
            category={item.list}
          />
        ))}
      </section>

      <section className="hidden sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {species.map((item) => (
          <SpeciesIndexCard
            key={item.slug}
            name={item.commonName ?? item.scientificName}
            scientificName={item.scientificName}
            slug={item.slug}
            list={item.orbicList ? `List ${item.orbicList}` : "—"}
            listColor={LIST_COLOR[String(item.orbicList)] ?? "bg-[#6d6d6d]"}
            elementGlobalId={item.elementGlobalId}
            category={item.list}
          />
        ))}
      </section>
    </>
  );
}
