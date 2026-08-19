import Link from "next/link";
import { stateRankBarItems } from "@/components/index/FilterData";
import StatusCard from "./StatusCard";

export default function BrowseByStatus() {
  return (
    <section data-aos="fade-up">
      <h2 className="font-heading mb-4 text-lg font-bold">Browse by Status</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 md:grid-cols-6 md:overflow-visible">
        {stateRankBarItems.map((rank) => (
          <Link
            key={rank.short}
            href={`/species?rank=${rank.short}`}
            className="min-w-[150px] sm:min-w-0"
          >
            <StatusCard
              short={rank.short}
              description={rank.description}
              color={rank.color}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
