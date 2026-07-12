import SpeciesCard from "./SpeciesCard";
import Link from "next/link";

const categories = [
  {
    title: "Plants",
    subtitle: "Kingdom Plantae",
    image: "/images/categories/plants.jpg",
    count: 412,
  },
  {
    title: "Mammals",
    subtitle: "Class Mammalia",
    image: "/images/categories/mammals.jpg",
    count: 58,
  },
  {
    title: "Birds",
    subtitle: "Class Aves",
    image: "/images/categories/birds.jpg",
    count: 95,
  },
  {
    title: "Reptiles",
    subtitle: "Class Reptilia",
    image: "/images/categories/reptiles.jpg",
    count: 24,
  },
];

export default function SpeciesCategories() {
  return (
    <section>
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
          <div key={category.title} className="min-w-[140px] sm:min-w-0">
            <SpeciesCard {...category} />
          </div>
        ))}
      </div>

      <p className="font-body mt-1 text-center text-[13px] text-gray-500 sm:hidden">
        ← swipe for more →
      </p>
    </section>
  );
}
