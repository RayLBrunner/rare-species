export default function StatusRankBar() {
  return (
    <section className="border-y border-[#d8d8d8] bg-white px-3 py-3 md:px-10">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-[620px]">
          <p className="font-body mb-2 text-[10px] font-semibold text-[#4d4d4d]">
            State Rank
          </p>

          <div className="overflow-x-auto">
            <div className="flex h-7 min-w-[420px] overflow-hidden rounded-sm border-2 border-black text-[9px] font-bold text-white md:h-8">
              <div className="flex w-1/6 items-center bg-black px-2">SX</div>
              <div className="flex w-1/6 items-center bg-[#c71945] px-2 ring-2 ring-inset ring-white">
                S1
              </div>
              <div className="flex w-1/6 items-center bg-[#d6420f] px-2">
                S2
              </div>
              <div className="flex w-1/6 items-center bg-[#b59b00] px-2">
                S3
              </div>
              <div className="flex w-1/6 items-center bg-[#4e8f12] px-2">
                S4
              </div>
              <div className="flex w-1/6 items-center bg-[#0d6b37] px-2">
                S5
              </div>
            </div>
          </div>

          <p className="font-body mt-2 text-[10px] font-semibold text-[#c71945] md:text-[11px]">
            S1 — Critically Imperiled in Oregon
          </p>
        </div>

        <>
          <div className="hidden md:grid md:grid-cols-3 md:gap-2">
            <div className="min-w-[95px] border-2 border-black bg-white p-3">
              <p className="font-body text-sm font-bold text-[#c71945]">G1</p>
              <p className="font-body mt-1 text-[8px] uppercase text-gray-500">
                Global Rank
              </p>
              <p className="font-body text-[10px] font-semibold">
                Critically Imperiled
              </p>
            </div>

            <div className="min-w-[95px] border-2 border-black bg-white p-3">
              <p className="font-body text-sm font-bold text-[#c71945]">LT</p>
              <p className="font-body mt-1 text-[8px] uppercase text-gray-500">
                Federal ESA
              </p>
              <p className="font-body text-[10px] font-semibold">Threatened</p>
            </div>

            <div className="min-w-[95px] border-2 border-black bg-white p-3">
              <p className="font-body text-sm font-bold text-[#c71945]">
                List 1
              </p>
              <p className="font-body mt-1 text-[8px] uppercase text-gray-500">
                ORBIC
              </p>
              <p className="font-body text-[10px] font-semibold">List 1</p>
            </div>
          </div>
        </>
      </div>
    </section>
  );
}
