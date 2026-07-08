export default function OverviewTab() {
  return (
    <div>
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
