import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden bg-[#032014] text-white">
      <div className="mx-auto flex min-h-[420px] w-full max-w-7xl flex-col justify-between px-6 py-6 sm:px-8 md:flex-row md:items-center md:px-16 md:py-12">
        {" "}
        <div className="max-w-[520px]">
          <p className="mb-3 text-[11px] tracking-wide text-[#6fc08f] sm:mb-4 sm:text-xs">
            Oregon Biodiversity Information Center
          </p>

          <h1 className="font-heading text-[34px] font-bold leading-[0.95] tracking-[-1px] sm:text-[48px] md:text-[72px] md:leading-[0.92] md:tracking-[-3px]">
            Oregon has
            <br />
            1,859 rare
            <br />
            species.
          </h1>

          <p className="font-body mt-2 text-[16px] text-[#b7d2c2] sm:mt-5 sm:text-[20px] md:mt-7">
            One has your name on it.
          </p>

          <div className="mt-3 flex flex-col items-start gap-3 sm:mt-5 md:mt-7 md:flex-row md:items-center md:gap-5">
            <Link
              href="/quiz"
              className="font-body group block w-full border border-white bg-[#16873d] px-4 py-3 text-left transition hover:bg-[#1b9947] sm:w-auto sm:px-5 sm:py-4"
            >
              <div className="text-[15px] font-semibold sm:text-[18px]">
                Find your species →
              </div>

              <div className="mt-1 text-xs text-[#b7d2c2] sm:text-sm">
                6 questions • 2 minutes
              </div>
            </Link>

            <Link
              href="/species"
              className="font-body text-sm text-[#7fc49b] transition hover:text-white"
            >
              Browse all 1,859 →
            </Link>
          </div>
        </div>
        <Link
          href="/species/kincaids-lupine"
          className="group relative mt-10 hidden md:mr-10 md:block"
        >
          <div className="absolute left-6 top-6 h-[290px] w-[260px] border border-[#1f5a3d] bg-[#0b3524]" />

          <div className="absolute left-3 top-3 h-[290px] w-[260px] border border-[#2a6948] bg-[#11412d]" />

          <div className="relative z-10 w-[260px] overflow-hidden border border-[#d8d8d8] bg-[#062517]">
            <div className="h-[185px] bg-[#ddd9d2]" />

            <div className="bg-[#062517] p-4">
              <h3 className="font-heading text-[15px] font-semibold">
                Kincaid&apos;s Lupine
              </h3>

              <p className="font-scientific mt-1 text-xs italic text-[#b7d2c2]">
                Lupinus oreganus
              </p>

              <div className="font-body mt-4 inline-block bg-[#cf234c] px-2 py-1 text-[10px] font-bold tracking-wide text-white">
                ORBIC LIST 1
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
