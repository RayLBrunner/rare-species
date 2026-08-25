import type { Species } from "@/types/species";
import { getOrEndemicFlag } from "@/lib/speciesDisplay";

interface TaxonomyTabProps {
  species: Species;
}

export default function TaxonomyTab({ species }: TaxonomyTabProps) {
  const isOrEndemic = getOrEndemicFlag(species.orEndemic);
  const genus = species.genusSpecies.split(" ")[0];

  type TaxRow = { label: string; value: string; italic?: boolean };

  const coreRows: TaxRow[] = [
    species.kingdom ? { label: "Kingdom", value: species.kingdom } : null,
    species.phylum ? { label: "Phylum", value: species.phylum } : null,
    species.taxonClass ? { label: "Class", value: species.taxonClass } : null,
    species.taxonOrder ? { label: "Order", value: species.taxonOrder } : null,
    species.family ? { label: "Family", value: species.family } : null,
    { label: "Genus", value: genus, italic: true },
    { label: "Species", value: species.scientificName, italic: true },
    species.authorNameFull
      ? { label: "Authority", value: species.authorNameFull }
      : null,
  ].filter((r): r is TaxRow => r !== null);

  const desktopOnlyRows: TaxRow[] = [
    species.commonName
      ? { label: "Common name", value: species.commonName }
      : null,
    species.references
      ? { label: "References", value: species.references }
      : null,
  ].filter((r): r is TaxRow => r !== null);

  const allDesktopRows = [...coreRows, ...desktopOnlyRows];

  return (
    <div>
      {/* Mobile */}
      <div className="md:hidden">
        <div className="border-b border-[#d8d8d8]">
          {coreRows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[120px_1fr] border-b border-[#d8d8d8] py-3 last:border-b-0"
            >
              <p className="font-body text-[1em] font-bold text-[#777]">
                {row.label}
              </p>
              <p
                className={`font-body text-[1em] text-black ${
                  row.italic ? "font-scientific italic" : ""
                }`}
              >
                {row.value}
              </p>
            </div>
          ))}
        </div>

        {species.commonName && (
          <section className="border-b border-[#d8d8d8] py-5">
            <h3 className="font-body text-[1em] font-bold text-black">
              Common name
            </h3>
            <p className="font-body mt-1 text-base font-bold text-black">
              {species.commonName}
            </p>
          </section>
        )}

        {species.references && (
          <section className="border-b border-[#d8d8d8] py-5">
            <h3 className="font-body text-[1em] font-bold text-black">
              References
            </h3>
            <p className="font-body mt-1 text-[1em] leading-5 text-[#555]">
              {species.references}
            </p>
          </section>
        )}

        {isOrEndemic && (
          <div className="mt-5 inline-block rounded-[3px] bg-[#15803d] px-3 py-2">
            <p className="font-body text-[1em] font-bold text-white">
              Oregon Endemic: Found only in Oregon
            </p>
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        {allDesktopRows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[220px_1fr] border-b border-[#d8d8d8] py-4"
          >
            <p className="font-body text-[1em] font-bold text-[#777]">
              {row.label}
            </p>
            <p
              className={`font-body text-[1em] text-black ${
                row.italic ? "font-scientific italic" : ""
              }`}
            >
              {row.value}
            </p>
          </div>
        ))}

        {isOrEndemic && (
          <div className="mt-4 px-8">
            <div className="inline-block rounded-[3px] bg-[#15803d] px-3 py-2">
              <p className="font-body text-[1em] font-bold text-white">
                Oregon Endemic: Found only in Oregon
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
