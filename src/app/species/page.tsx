import IndexClient from "@/components/index/IndexClient";
import { getAllSpecies } from "@/lib/species";

export default function SpeciesIndexPage() {
  const species = getAllSpecies();
  return (
    <main className="bg-white px-4 py-4 text-black">
      <div className="mx-auto w-full max-w-7xl px-6 pt-8">
        <IndexClient species={species} />
      </div>
    </main>
  );
}
