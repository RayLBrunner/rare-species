export default function ExploreMap() {
  const regions = [
    ["CR", "Coast Range", "147 sp."],
    ["WV", "Willamette Valley", "203 sp."],
    ["KM", "Klamath Mtns", "318 sp."],
    ["WC", "West Cascades", "412 sp."],
    ["EC", "East Cascades", "289 sp."],
    ["BM", "Blue Mountains", "96 sp."],
    ["CB", "Columbia Plateau", "118 sp."],
    ["BR", "Basin & Range", "224 sp."],
  ];

  return (
    <section>
      <div className="font-body">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-heading text-s font-bold uppercase tracking-[0.25em] text-[#26382c] md:text-lg md:normal-case md:tracking-normal">
            Explore the map
          </p>

          <p className="hidden text-[10px] text-[#6d746f] md:block">
            Leaflet.js · GBIF fuzzy-match protocol · click a region to filter
            species
          </p>
        </div>

        <div className="grid border-4 border-[#183327] bg-[#d8eee4] shadow-md lg:grid-cols-[1fr_500px]">
          <div className="relative flex h-[165px] items-center justify-center overflow-hidden bg-[#d8eee4] sm:h-[220px] lg:h-[300px]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,74,48,.1)_1px,transparent_1px),linear-gradient(0deg,rgba(18,74,48,.1)_1px,transparent_1px)] bg-[size:70px_70px] md:bg-[size:120px_120px]" />

            <div className="relative text-center text-[#173327]">
              <p className="text-2xl font-bold sm:text-4xl lg:text-5xl">
                Oregon Map
              </p>
              <p className="mt-1 text-xs sm:text-sm">Static map placeholder</p>
              <p className="mt-1 hidden text-xs text-[#4f6b5b] sm:block">
                Dummy data — real map coming later
              </p>
            </div>

            <div className="absolute left-[28%] top-[35%] rounded bg-white/95 px-2 py-2 text-[10px] shadow sm:left-[18%] sm:px-4 sm:py-3 sm:text-xs">
              <p className="font-bold text-[#143222]">Willamette Valley</p>
              <p className="text-[#446151]">203 species · click to filter</p>
              <p className="mt-1 text-[#2d8b57]">View all in index →</p>
            </div>

            <button className="absolute right-2 top-2 h-6 w-6 rounded border border-[#777] bg-white text-base leading-none sm:right-3 sm:top-4 sm:h-7 sm:w-7 sm:text-lg">
              +
            </button>

            <button className="absolute right-2 top-9 h-6 w-6 rounded border border-[#777] bg-white text-base leading-none sm:right-3 sm:top-12 sm:h-7 sm:w-7 sm:text-lg">
              −
            </button>

            <div className="absolute bottom-0 left-0 right-0 border-t border-black/10 bg-white/80 px-2 py-1">
              <p className="truncate text-[9px] text-[#3d5547] sm:text-[10px]">
                Click any region to filter the species index · Locations
                fuzzy-masked per GBIF sensitivity protocol · Powered by
                Leaflet.js
              </p>
            </div>
          </div>

          <div className="hidden bg-[#c7e3ee] px-8 py-5 lg:block">
            <div className="space-y-4">
              {regions.map(([code, name, count]) => (
                <div
                  key={code}
                  className="flex items-center justify-between gap-5 text-xs text-[#173327]"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-4 w-4 bg-[#2c8b57]" />
                    <span className="w-7 font-bold">{code}</span>
                    <span>{name}</span>
                  </div>

                  <span>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
