import type { Species } from "@/types/species";
import SpeciesSummarySentence from "@/components/species/SpeciesSummarySentence";

interface OverviewTabProps {
  species: Species;
}

export default function OverviewTab({ species }: OverviewTabProps) {
  return (
    <div>
      <section className="border-b border-[#e5e5e5] pb-5">
        <h2 className="font-body mb-3 text-[12px] font-bold text-[#15803d]">
          About this species
        </h2>

        <SpeciesSummarySentence
          species={species}
          className="font-body max-w-[720px] text-sm leading-6 text-black"
        />
      </section>

      {species.habitatDescription && (
        <section className="border-b border-[#e5e5e5] py-5">
          <h2 className="font-body mb-3 text-[12px] font-bold text-[#15803d]">
            Habitat &amp; Ecology
          </h2>
          <p className="font-body max-w-[720px] text-sm leading-6 text-black">
            {species.habitatDescription}
          </p>
        </section>
      )}

      {species.physicalDescription && (
        <section className="border-b border-[#e5e5e5] py-5">
          <h2 className="font-body mb-3 text-[12px] font-bold text-[#15803d]">
            Identification
          </h2>
          <p className="font-body max-w-[720px] text-sm leading-6 text-black">
            {species.physicalDescription}
          </p>
        </section>
      )}

      {species.ecologyComments && (
        <section className="border-b border-[#e5e5e5] py-5">
          <h2 className="font-body mb-3 text-[12px] font-bold text-[#15803d]">
            Ecology
          </h2>
          <p className="font-body max-w-[720px] text-sm leading-6 text-black">
            {species.ecologyComments}
          </p>
        </section>
      )}

      {species.globalRangeComments && (
        <section className="border-b border-[#e5e5e5] py-5">
          <h2 className="font-body mb-3 text-[12px] font-bold text-[#15803d]">
            Global Range
          </h2>
          <p className="font-body max-w-[720px] text-sm leading-6 text-black">
            {species.globalRangeComments}
          </p>
        </section>
      )}

      <section className="border-b border-[#e5e5e5] py-5">
        <h2 className="font-body mb-3 text-[12px] font-bold text-[#15803d]">
          Photos
        </h2>

        <div className="md:hidden">
          <div className="h-40 w-full bg-[#ddd9d2]" />
        </div>

        <div className="hidden gap-3 md:grid md:grid-cols-4">
          {[1, 2, 3, 4].map((photo) => (
            <div key={photo} className="h-24 bg-[#ddd9d2]" />
          ))}
        </div>
        <div className="mt-6 space-y-3 lg:hidden">
          <button className="font-body w-full border-b-4 border-black bg-[#15803d] px-4 py-4 text-sm font-bold text-white">
            Sponsor this species →
          </button>

          <button className="font-body w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black">
            Download card
          </button>
        </div>
      </section>
    </div>
  );
}
