const taxonomyRows = [
  { label: "Kingdom", value: "Plantae" },
  { label: "Phylum", value: "Tracheophyta" },
  { label: "Class", value: "Magnoliopsida" },
  { label: "Order", value: "Fabales" },
  { label: "Family", value: "Fabaceae" },
  { label: "Genus", value: "Lupinus" },
  { label: "Species", value: "Lupinus oreganus", italic: true },
  { label: "Authority", value: "Heller (1936)" },
  { label: "Common name", value: "Kincaid's Lupine" },
];

export default function TaxonomyTab() {
  return (
    <div>
      <div className="md:hidden">
        <div className="border-b border-[#d8d8d8]">
          {taxonomyRows.slice(0, 8).map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[120px_1fr] border-b border-[#d8d8d8] py-3 last:border-b-0"
            >
              <p className="font-body text-[11px] font-bold text-[#777]">
                {row.label}
              </p>

              <p
                className={`font-body text-[11px] text-black ${
                  row.italic ? "font-scientific italic" : ""
                }`}
              >
                {row.value}
              </p>
            </div>
          ))}
        </div>

        <section className="border-b border-[#d8d8d8] py-5">
          <h3 className="font-body text-[13px] font-bold text-black">
            Common name
          </h3>

          <p className="font-body mt-1 text-base font-bold text-black">
            Kincaid&apos;s Lupine
          </p>
        </section>

        <div className="mt-5 inline-block rounded-[3px] bg-[#15803d] px-3 py-2">
          <p className="font-body text-[11px] font-bold text-white">
            Oregon Endemic: Found only in Oregon
          </p>
        </div>
      </div>

      <div className="hidden md:block">
        {taxonomyRows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[220px_1fr] border-b border-[#d8d8d8] px-8 py-4"
          >
            <p className="font-body text-[13px] font-bold text-[#777]">
              {row.label}
            </p>

            <p
              className={`font-body text-[13px] text-black ${
                row.italic ? "font-scientific italic" : ""
              }`}
            >
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
