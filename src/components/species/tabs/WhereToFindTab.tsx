const ecoregions = [
  { name: "Willamette Valley", color: "bg-[#15803d]" },
  { name: "Klamath Mtns", color: "bg-[#4d7c0f]" },
  { name: "West Cascades", color: "bg-[#9f8500]" },
  { name: "East Cascades", color: "bg-[#d94f00]" },
  { name: "Blue Mtns", color: "bg-[#5b4bb7]" },
  { name: "Coast Range", color: "bg-[#8a4f08]" },
];

const counties = [
  "Benton",
  "Lane",
  "Linn",
  "Polk",
  "Yamhill",
  "Lincoln",
  "Marion",
  "Douglas",
];

export default function WhereToFindTab() {
  return (
    <div>
      <section className="border-b border-[#e5e5e5] pb-5">
        <h2 className="font-body mb-3 text-[12px] font-bold text-black">
          Ecoregions
        </h2>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {ecoregions.map((region) => (
            <div
              key={region.name}
              className={`font-body rounded-[3px] px-3 py-2 text-[11px] font-bold text-white ${region.color}`}
            >
              {region.name}
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[#e5e5e5] py-5">
        <h2 className="font-body mb-2 text-[12px] font-bold text-black">
          Counties
        </h2>

        <p className="font-body text-[11px] text-[#555]">
          {counties.join(" · ")}
        </p>
      </section>

      <section className="border-b border-[#e5e5e5] py-5">
        <h2 className="font-body mb-2 text-[12px] font-bold text-black">
          Other states / provinces
        </h2>

        <p className="font-body text-[11px] italic text-[#555]">
          Not found outside Oregon
        </p>

        <div className="font-body mt-4 inline-block rounded-[3px] bg-[#15803d] px-3 py-2 text-[11px] font-bold text-white">
          Oregon Endemic: Found only in Oregon
        </div>
      </section>

      <section className="pt-5">
        <h2 className="font-body mb-3 text-[12px] font-bold text-black">
          Range map
        </h2>

        <div className="font-body flex h-48 items-center justify-center border border-[#d6d0c8] bg-[#ddd9d2] text-[11px] font-bold text-[#777] md:h-64">
          RANGE MAP
        </div>

        <p className="font-body mt-3 text-[10px] italic text-[#777]">
          Locations fuzzy-masked per GBIF sensitivity protocol
        </p>
      </section>
    </div>
  );
}
