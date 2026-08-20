import Link from "next/link";
import Image from "next/image";
import { getAllSpecies } from "@/lib/species";

export default function Hero() {
  const speciesCount = getAllSpecies().length.toLocaleString("en-US");

  return (
    <section className="relative w-full overflow-hidden bg-[#032014] text-white">
      <Image
        src="/images/eco-region/BlueMountains_USFS_PublicDomain_23304904443_d7a074063d_o.jpg"
        alt="Oregon forest landscape"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-[#032014]/45" />

      <div className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-7xl flex-col px-6 py-6 sm:px-8 md:justify-center md:px-16 md:py-12">
        <div className="max-w-[520px]">
          <p className="mb-3 text-[11px] tracking-wide text-[#6fc08f] sm:mb-4 sm:text-xs">
            Oregon Biodiversity Information Center
          </p>

          <h1 className="font-heading text-[34px] font-bold leading-[0.95] tracking-[-1px] sm:text-[48px] md:text-[72px] md:leading-[0.92] md:tracking-[-3px]">
            Oregon has
            <br />
            {speciesCount} rare
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
                2 minutes
              </div>
            </Link>

            <Link
              href="/species"
              className="font-body text-sm text-[#7fc49b] transition hover:text-white"
            >
              Browse all {speciesCount} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
