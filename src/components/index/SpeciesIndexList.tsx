"use client";

import { useRouter } from "next/navigation";
import type { Species } from "@/types/species";

interface SpeciesIndexListProps {
  species: Species[];
}

function truncateList(value: string | undefined, max = 1): string {
  if (!value) return "—";
  const items = value.split(", ").filter(Boolean);
  if (items.length <= max) return items.join(", ");
  return `${items.slice(0, max).join(", ")} +${items.length - max} more`;
}

export default function SpeciesIndexList({ species }: SpeciesIndexListProps) {
  const router = useRouter();

  return (
    <section className="font-body overflow-x-auto">
      <table className="table-fixed border-collapse text-left text-xs">
        <thead>
          <tr className="bg-[#101018] text-[10px] uppercase tracking-wide text-white">
            <th className="w-40 px-4 py-3">Common Name</th>
            <th className="w-44 px-4 py-3">Latin Name ↕</th>
            <th className="w-36 px-4 py-3">List</th>
            <th className="w-32 px-4 py-3">Category</th>
            <th className="w-28 px-4 py-3">Family</th>
            <th className="w-24 px-4 py-3">Order</th>
            <th className="w-24 px-4 py-3">Class</th>
            <th className="w-20 px-4 py-3">Phylum</th>
            <th className="w-20 px-4 py-3">Kingdom</th>
            <th className="w-24 px-4 py-3">Ecoregion</th>
            <th className="w-24 px-4 py-3">County</th>
            <th className="w-24 px-4 py-3">Other States</th>
            <th className="w-20 px-4 py-3">Observations</th>
            <th className="w-16 px-4 py-3">Updated</th>
          </tr>
        </thead>

        <tbody>
          {species.map((item) => (
            <tr key={item.slug} onClick={() => router.push(`/species/${item.slug}`)} className="group cursor-pointer border-b border-[#d8d8d8] transition-colors hover:bg-[#032014]">
              <td className="px-4 py-3 truncate group-hover:text-white">{item.commonName}</td>

              <td className="px-4 py-3 truncate font-scientific italic group-hover:text-white">
                {item.scientificName}
              </td>

              <td className="px-4 py-3 truncate group-hover:text-white">{item.list ?? "—"}</td>

              <td className="px-4 py-3 truncate group-hover:text-white">
                {[item.category1, item.category2].filter(Boolean).join(", ") || "—"}
              </td>

              <td className="px-4 py-3 truncate group-hover:text-white">{item.family ?? "—"}</td>
              <td className="px-4 py-3 truncate group-hover:text-white">{item.taxonOrder ?? "—"}</td>
              <td className="px-4 py-3 truncate group-hover:text-white">{item.taxonClass ?? "—"}</td>
              <td className="px-4 py-3 truncate group-hover:text-white">{item.phylum ?? "—"}</td>
              <td className="px-4 py-3 truncate group-hover:text-white">{item.kingdom ?? "—"}</td>

              <td className="px-4 py-3 truncate group-hover:text-white">{truncateList(item.ecoregion)}</td>
              <td className="px-4 py-3 truncate group-hover:text-white">{truncateList(item.county)}</td>
              <td className="px-4 py-3 truncate group-hover:text-white">{truncateList(item.otherStates)}</td>

              <td className="px-4 py-3 truncate group-hover:text-white">{item.nEo ?? "—"}</td>
              <td className="px-4 py-3 truncate group-hover:text-white">{item.listYear ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
