import Link from "next/link";
import SpeciesCard from "./SpeciesCard";
import { getSpeciesCountByList } from "@/lib/species";
import type { List } from "@/types/species";

const categories: {
  title: string;
  subtitle: string;
  list: List;
  image: string;
}[] = [
  {
    title: "Vertebrate Animals",
    subtitle: "Fish, amphibians, reptiles, birds, mammals",
    list: "vertebrateAnimals",
    image: "/images/categories/vertebrate-animals-icon.svg",
  },
  {
    title: "Invertebrate Animals",
    subtitle: "Arthropods, molluscs, worms, sea stars",
    list: "invertebrateAnimals",
    image: "/images/categories/invertebrate-animals-icon.svg",
  },
  {
    title: "Vascular Plants",
    subtitle: "Ferns, conifers, flowering plants",
    list: "vascularPlants",
    image: "/images/categories/vascular-plants-icon.svg",
  },
  {
    title: "Nonvascular Plants and Fungi",
    subtitle: "Bryophytes, fungi, lichen, algae",
    list: "nonvascularPlantsAndFungi",
    image: "/images/categories/nonvasc-plants-icon.svg",
  },
];

export default function SpeciesCategories() {
  const countsByList = getSpeciesCountByList();

  return (
    <section data-aos="fade-up">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-heading text-lg font-bold">Browse by Species</p>
        <Link
          href="/species"
          className="font-body z-40 cursor-pointer text-[13px]"
        >
          View all →
        </Link>{" "}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 md:grid-cols-4 md:overflow-visible">
        {categories.map((category) => (
          <Link
            key={category.list}
            href={`/species?list=${category.list}`}
            className="min-w-[140px] sm:min-w-0"
          >
            <SpeciesCard
              title={category.title}
              subtitle={category.subtitle}
              image={category.image}
              count={countsByList[category.list] ?? 0}
            />
          </Link>
        ))}
      </div>

      <p className="font-body mt-1 text-center text-[13px] text-gray-500 sm:hidden">
        ← swipe for more →
      </p>
    </section>
  );
}
