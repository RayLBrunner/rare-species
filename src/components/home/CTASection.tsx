import Link from "next/link";

const DONATE_URL =
  "https://www.givecampus.com/campaigns/50223/donations/new?designation=institutefornaturalresources";

export default function CTASection() {
  return (
    <section className="bg-[#032014] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-16">

          {/* Text */}
          <div className="max-w-xl">
            <p className="font-body mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#a8e8c0]">
              Oregon Biodiversity Information Center
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
              Help protect Oregon&apos;s rarest species.
            </h2>
            <p className="font-body mt-4 text-base leading-relaxed text-[#d4f0df]">
              ORBIC tracks Oregon&apos;s rare and sensitive species and makes that
              data freely available to researchers, agencies, and the public.
              Your support keeps this work going.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:min-w-[200px] lg:flex-row lg:items-center">
            <Link
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body px-6 py-4 text-center text-sm bg-[#16873d] font-semibold bg-[$$] text-white transition hover:bg-[#1b9947] sm:flex-1 md:flex-none"
            >
              Donate to ORBIC →
            </Link>
            <Link
              href="#"
              className= "font-body bg-white px-6 py-4 text-center text-sm font-bold text-[#16873d] transition hover:bg-[#d4f0df] sm:flex-1 md:flex-none"
            >
              Join our email list
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
