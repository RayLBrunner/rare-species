import type { Species } from "@/types/species";
import { getOrEndemicFlag } from "@/lib/speciesDisplay";

interface SpeciesSidebarProps {
  species: Species;
}

export default function SpeciesSidebar({ species }: SpeciesSidebarProps) {
  const isOrEndemic = getOrEndemicFlag(species.orEndemic);

  const taxonomyLine1 = [species.kingdom, species.phylum, species.taxonClass]
    .filter(Boolean)
    .join(" · ");
  const taxonomyLine2 = [species.taxonOrder, species.family]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <div className="space-y-3 lg:hidden">
        <button className="cursor-pointer font-body w-full border-b-4 border-black bg-[#15803d] px-4 py-4 text-sm font-bold text-white">
          Sponsor this species →
        </button>

        <button className="font-body flex w-fit items-center gap-2 border-2 border-black border-b-4 bg-white px-5 py-3 text-sm font-bold text-[#333] shadow-[2px_2px_0px_0px_#000]">
          📄 Download card
        </button>
      </div>
      <aside className="hidden border-[#d8d8d8] bg-white pl-6 py- lg:block">
        <div className="border-2 border-black border-b-4 bg-[#15803d] p-4 text-white">
          <h2 className="cursor-pointer font-body text-base font-bold">
            Sponsor this species
          </h2>

          <p className="font-body mt-1 text-[11px] text-[#9ed2aa]">
            Campaign opens Fall 2026
          </p>
        </div>
        <section className="mt-5">
          <h3 className="font-body mb-2 text-[10px] font-bold tracking-wide text-gray-500">
            Quick actions
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button className="font-body flex items-center gap-2 border-2 border-black border-b-4 bg-white px-3 py-2 text-[10px] font-bold">
              <span className="text-gray-400">📄</span>
              Download card
            </button>

            <button className="font-body flex items-center gap-2 border-2 border-black border-b-4 bg-white px-3 py-2 text-[10px] font-bold">
              <span className="text-gray-400">🔗</span>
              Share profile
            </button>
          </div>
        </section>
        <section className="mt-5 border-b border-[#e5e5e5] pb-4">
          <h3 className="font-body mb-2 text-[10px] font-bold uppercase tracking-wide text-gray-500">
            Taxonomic position
          </h3>

          {taxonomyLine1 && (
            <p className="font-body text-[11px]">{taxonomyLine1}</p>
          )}
          {taxonomyLine2 && (
            <p className="font-body text-[11px]">{taxonomyLine2}</p>
          )}
          <p className="font-scientific text-[11px] italic">
            {species.genusSpecies}
          </p>

          {isOrEndemic && (
            <span className="font-body mt-3 inline-block border border-[#15803d] px-2 py-1 text-[10px] font-bold text-[#15803d]">
              Oregon Endemic
            </span>
          )}
        </section>
        <section className="mt-4">
          <h3 className="font-body mb-2 text-[10px] font-bold uppercase tracking-wide text-gray-500">
            Cite this record
          </h3>

          <div className="border-2 border-black p-3">
            <p className="font-body text-[10px] italic">
              ORBIC. 2026. {species.commonName} ({species.genusSpecies}), Oregon
              Rare Species Field Guide.
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <button className="font-body border border-black px-2 py-1 text-[9px] font-bold">
                Copy
              </button>
              <button className="font-body border border-black px-2 py-1 text-[9px] font-bold">
                BibTeX
              </button>
              <button className="font-body border border-black px-2 py-1 text-[9px] font-bold">
                PDF
              </button>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
}
