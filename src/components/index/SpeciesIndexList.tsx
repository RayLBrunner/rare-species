import Link from "next/link";

const species = [
  {
    name: "Kincaid's Lupine",
    scientificName: "Lupinus oreganus",
    slug: "kincaids-lupine",
    list: "List 1",
    listColor: "bg-[#c8103a]",
  },
  {
    name: "OR Spotted Frog",
    scientificName: "Rana pretiosa",
    slug: "or-spotted-frog",
    list: "LT",
    listColor: "bg-[#d94f00]",
  },
  {
    name: "Fender's Blue Butterfly",
    scientificName: "Icaricia icarioides fenderi",
    slug: "fenders-blue-butterfly",
    list: "List 1",
    listColor: "bg-[#c8103a]",
  },
  {
    name: "Whitebark Pine",
    scientificName: "Pinus albicaulis",
    slug: "whitebark-pine",
    list: "List 2",
    listColor: "bg-[#d94f00]",
  },
  {
    name: "Pink Sand Verbena",
    scientificName: "Abronia umbellata",
    slug: "pink-sand-verbena",
    list: "List 1",
    listColor: "bg-[#c8103a]",
  },
  {
    name: "Western Pond Turtle",
    scientificName: "Actinemys marmorata",
    slug: "western-pond-turtle",
    list: "List 2",
    listColor: "bg-[#d94f00]",
  },
  {
    name: "Golden Paintbrush",
    scientificName: "Castilleja levisecta",
    slug: "golden-paintbrush",
    list: "List 1",
    listColor: "bg-[#c8103a]",
  },
  {
    name: "Bristly Sculpin",
    scientificName: "Cottus asperrimus",
    slug: "bristly-sculpin",
    list: "List 3",
    listColor: "bg-[#9f8500]",
  },
];

interface SpeciesListMetadata {
  group: string;
  gRank: string;
  sRank: string;
  esa?: string;
  tracking: string;
}

const speciesListMetadata: Record<string, SpeciesListMetadata> = {
  "kincaids-lupine": {
    group: "Plant",
    gRank: "G1",
    sRank: "S1",
    esa: "LT",
    tracking: "Fully",
  },
  "or-spotted-frog": {
    group: "Animal",
    gRank: "G2",
    sRank: "S2",
    esa: "LT",
    tracking: "Fully",
  },
  "fenders-blue-butterfly": {
    group: "Animal",
    gRank: "G5T1",
    sRank: "S1",
    esa: "LT",
    tracking: "Fully",
  },
  "whitebark-pine": {
    group: "Plant",
    gRank: "G3G4",
    sRank: "S2",
    esa: "LT",
    tracking: "Fully",
  },
  "pink-sand-verbena": {
    group: "Plant",
    gRank: "G4G5T2",
    sRank: "S1",
    tracking: "Fully",
  },
  "western-pond-turtle": {
    group: "Animal",
    gRank: "G3G4",
    sRank: "S2",
    tracking: "Fully",
  },
  "golden-paintbrush": {
    group: "Plant",
    gRank: "G2",
    sRank: "S1",
    esa: "LT",
    tracking: "Fully",
  },
  "bristly-sculpin": {
    group: "Animal",
    gRank: "G3",
    sRank: "S3",
    tracking: "Fully",
  },
};

const fallbackMetadata: SpeciesListMetadata = {
  group: "—",
  gRank: "—",
  sRank: "—",
  tracking: "—",
};

export default function SpeciesIndexList() {
  return (
    <section className="font-body overflow-x-auto">
      <table className="w-full min-w-[850px] border-collapse text-left text-xs">
        <thead>
          <tr className="bg-[#101018] text-[10px] uppercase tracking-wide text-white">
            <th className="px-4 py-3">Group</th>
            <th className="px-4 py-3">Scientific ↕</th>
            <th className="px-4 py-3">Common ↕</th>
            <th className="px-4 py-3">G-Rank</th>
            <th className="px-4 py-3">S-Rank</th>
            <th className="px-4 py-3">ESA</th>
            <th className="px-4 py-3">State Status</th>
            <th className="px-4 py-3">Tracking</th>
            <th className="px-4 py-3">PDF</th>
          </tr>
        </thead>

        <tbody>
          {species.map((item) => {
            const metadata = speciesListMetadata[item.slug] ?? fallbackMetadata;

            return (
              <tr key={item.slug} className="border-b border-[#d8d8d8]">
                <td className="px-4 py-3">{metadata.group}</td>

                <td className="px-4 py-3">
                  <Link
                    href={`/species/${item.slug}`}
                    className="font-scientific italic hover:underline"
                  >
                    {item.scientificName}
                  </Link>
                </td>

                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{metadata.gRank}</td>
                <td className="px-4 py-3">{metadata.sRank}</td>

                <td className="px-4 py-3 font-bold text-[#c8103a]">
                  {metadata.esa ?? "—"}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-[10px] font-bold text-white ${item.listColor}`}
                  >
                    {item.list}
                  </span>
                </td>

                <td className="px-4 py-3">{metadata.tracking}</td>

                <td className="px-4 py-3">
                  <button className="border border-black px-3 py-1 text-[10px] font-bold">
                    PDF
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
