import SpeciesSidebar from "./SpeciesSidebar";

export default function SpeciesOverview() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
        <div className="border-r border-[#d8d8d8]">
          <div className="grid grid-cols-4 border-b border-[#d8d8d8] text-center">
            {["Overview", "Where to Find", "Status & Ranks", "Taxonomy"].map(
              (tab) => (
                <button
                  key={tab}
                  className="font-body border-r border-[#d8d8d8] px-4 py-3 text-[11px] font-bold last:border-r-0 first:bg-black first:text-white"
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          <div className="px-6 py-5 md:px-10">
            <section className="border-b border-[#e5e5e5] pb-5">
              <h2 className="font-body mb-3 text-[12px] font-bold text-[#15803d]">
                About this species
              </h2>

              <div className="space-y-2">
                <div className="h-2 max-w-[720px] bg-black" />
                <div className="h-2 max-w-[720px] bg-black" />
                <div className="h-2 max-w-[720px] bg-black" />
                <div className="h-2 max-w-[520px] bg-black" />
              </div>
            </section>

            <section className="border-b border-[#e5e5e5] py-5">
              <h2 className="font-body mb-3 text-[12px] font-bold text-[#15803d]">
                Habitat & Ecology
              </h2>

              <div className="space-y-2">
                <div className="h-2 max-w-[720px] bg-black" />
                <div className="h-2 max-w-[720px] bg-black" />
                <div className="h-2 max-w-[620px] bg-black" />
              </div>
            </section>

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
            </section>

            <section className="py-5">
              <h2 className="font-body mb-3 text-[12px] font-bold text-[#15803d]">
                Status at a glance
              </h2>

              <div className="w-full">
                <div className="flex h-7 overflow-hidden border-2 border-black text-[10px] font-bold text-white">
                  <div className="flex w-1/6 items-center justify-center bg-black">
                    SX
                  </div>
                  <div className="flex w-1/6 items-center bg-[#c71945] px-2 ring-2 ring-inset ring-white">
                    S1
                  </div>
                  <div className="flex w-1/6 items-center justify-center bg-[#d6420f]">
                    S2
                  </div>
                  <div className="flex w-1/6 items-center justify-center bg-[#b59b00]">
                    S3
                  </div>
                  <div className="flex w-1/6 items-center justify-center bg-[#4e8f12]">
                    S4
                  </div>
                  <div className="flex w-1/6 items-center justify-center bg-[#0d6b37]">
                    S5
                  </div>
                </div>

                <p className="font-body mt-2 text-sm text-[#333] md:hidden">
                  G1 · S1 · Federal: Threatened · ORBIC List 1
                </p>

                <p className="font-body mt-2 hidden text-[11px] font-bold text-[#c71945] md:block">
                  S1 — Critically Imperiled in Oregon
                </p>
              </div>

              <div className="mt-3 hidden flex-wrap gap-2 md:flex">
                <span className="font-body bg-[#c71945] px-3 py-1 text-[10px] font-bold text-white">
                  S1 Critically Imperiled globally
                </span>
                <span className="font-body bg-[#d6420f] px-3 py-1 text-[10px] font-bold text-white">
                  Federal: Threatened (ESA)
                </span>
                <span className="font-body bg-[#c71945] px-3 py-1 text-[10px] font-bold text-white">
                  ORBIC List 1
                </span>
                <span className="font-body bg-[#c71945] px-3 py-1 text-[10px] font-bold text-white">
                  USFS Sensitive
                </span>
              </div>

              <p className="font-body mt-2 text-[11px] text-gray-500">
                Full status details in Status tab
              </p>
            </section>
          </div>
        </div>
        <SpeciesSidebar />
      </div>
    </section>
  );
}
