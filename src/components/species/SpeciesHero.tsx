export default function SpeciesHero() {
  return (
    <section className="bg-[#1f3426] text-white md:grid md:min-h-[360px] md:grid-cols-[1.6fr_1fr]">
      <div className="px-4 py-8 md:px-10 md:py-10">
        <p className="font-body mb-4 text-[11px] font-semibold text-[#57c783]">
          Plants → Fabaceae → Oregon
        </p>

        <h1 className="font-heading text-5xl font-bold leading-none md:text-6xl">
          Kincaid&apos;s
          <br />
          Lupine
        </h1>

        <p className="font-scientific mt-4 text-base italic text-[#9ecfaf]">
          Lupinus oreganus
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="font-body bg-[#d61f4c] px-3 py-1 text-[10px] font-bold text-white">
            ORBIC List 1
          </span>
          <span className="font-body bg-[#d61f4c] px-3 py-1 text-[10px] font-bold text-white">
            S1
          </span>
          <span className="font-body bg-[#d94a15] px-3 py-1 text-[10px] font-bold text-white">
            LT
          </span>
        </div>
      </div>

      <div className="font-body hidden min-h-[240px] items-center justify-center bg-[#ddd9d2] text-center text-xs font-bold uppercase tracking-widest text-[#aaa59c] md:flex">
        Species Photo
        <br />
        full bleed · 500 × 360
      </div>
    </section>
  );
}
