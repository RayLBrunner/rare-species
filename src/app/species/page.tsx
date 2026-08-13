import IndexClient from "@/components/index/IndexClient";
import { getAllSpecies } from "@/lib/species";

interface SpeciesIndexPageProps {
  searchParams: Promise<{ list?: string; rank?: string }>;
}

export default async function SpeciesIndexPage({
  searchParams,
}: SpeciesIndexPageProps) {
  const { list, rank } = await searchParams;
  const species = getAllSpecies();
  return (
    <main className="bg-white px-4 py-4 text-black">
      <div className="mx-auto w-full max-w-7xl px-6 pt-8">
        <IndexClient species={species} initialList={list} initialRank={rank} />
      </div>
    </main>
  );
}
