import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "The Portland State University Capstone team behind the ORBIC Field Guide.",
};

export default function TeamPage() {
  return (
    <main>
      <section className="relative w-full overflow-hidden bg-[#032014] text-white">
        <Image
          src="/images/team/placeholder-group.svg"
          alt="The PSU Capstone team (group photo placeholder)"
          fill
          unoptimized
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[#032014]/40" />

        <div className="relative z-10 mx-auto flex min-h-[360px] w-full max-w-7xl flex-col justify-center px-6 py-16 sm:px-8 md:px-16">
          <p className="mb-3 text-xs tracking-wide text-[#6fc08f]">
            Portland State University Capstone
          </p>
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">
            Meet the Team
          </h1>
          <p className="font-body mt-4 max-w-2xl text-base leading-relaxed text-[#d4f0df] sm:text-lg">
            This field guide was built by a student team as part of the PSU
            Computer Science Capstone program, in partnership with ORBIC to
            bring Oregon&apos;s rare species data to the public.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <section className="bg-[#032014] text-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 text-center md:py-20">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Interested in working with us?
          </h2>
          <p className="font-body mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#d4f0df]">
            We&apos;re always open to connecting about future opportunities —
            reach out to any of us directly on LinkedIn above, or get in touch
            with the ORBIC team.
          </p>
          <Link
            href="/contact"
            className="font-body mt-6 inline-block bg-[#16873d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1b9947]"
          >
            Contact ORBIC →
          </Link>
        </div>
      </section>
    </main>
  );
}
