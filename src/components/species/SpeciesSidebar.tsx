"use client";

import { useState } from "react";
import Link from "next/link";
import type { Species } from "@/types/species";
import { getOrEndemicFlag } from "@/lib/speciesDisplay";

const DONATE_URL =
  "https://www.givecampus.com/campaigns/50223/donations/new?designation=institutefornaturalresources";

interface SpeciesSidebarProps {
  species: Species;
}

export default function SpeciesSidebar({ species }: SpeciesSidebarProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [citationCopied, setCitationCopied] = useState(false);

  const isOrEndemic = getOrEndemicFlag(species.orEndemic);

  const taxonomyLine1 = [species.kingdom, species.phylum, species.taxonClass]
    .filter(Boolean)
    .join(" · ");
  const taxonomyLine2 = [species.taxonOrder, species.family]
    .filter(Boolean)
    .join(" · ");

  const citation = `ORBIC. 2026. ${species.commonName} (${species.genusSpecies}), Oregon Rare Species Field Guide.`;

  const hasInat =
    species.iNaturalistLink && species.iNaturalistLink !== "NEEDSMANUALMATCH";
  const hasNS = !!species.nsEexplorerLink;
  const hasOdfw = !!species.odfwLink;
  const hasOregonFlora =
    species.category1 === "vascularPlants" && !!species.oregonFloraLink;
  const hasLinks = hasInat || hasNS || hasOdfw || hasOregonFlora;

  function handleShareProfile() {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  function handleCopyCitation() {
    navigator.clipboard.writeText(citation);
    setCitationCopied(true);
    setTimeout(() => setCitationCopied(false), 2000);
  }

  return (
    <>
      {/* Mobile quick actions */}
      <div className="space-y-3 lg:hidden">
        <Link
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body block w-full border-b-4 border-black bg-[#15803d] px-4 py-4 text-center text-sm font-bold text-white"
        >
          Donate to Support →
        </Link>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden border-[#d8d8d8] bg-white pl-6 py- lg:block">
        <Link
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block border-2 border-black border-b-4 bg-[#15803d] p-4 text-white transition hover:bg-[#1b9947]"
        >
          <h2 className="font-body text-base font-bold">
            Donate to Support →
          </h2>
          <p className="font-body mt-1 text-[11px] text-[#9ed2aa]">
            Help protect Oregon's rare species
          </p>
        </Link>

        {/* Quick actions */}
        <section className="mt-5">
          <h3 className="font-body mb-2 text-[10px] font-bold tracking-wide text-gray-500">
            Quick actions
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={handleShareProfile}
              className="font-body flex items-center gap-2 border-2 border-black border-b-4 bg-white px-3 py-2 text-[10px] font-bold transition hover:bg-[#f5f5f5]"
            >
              <span className="text-gray-400">🔗</span>
              {linkCopied ? "Link copied!" : "Share profile"}
            </button>
          </div>
        </section>

        {/* External links */}
        {hasLinks && (
          <section className="mt-5 border-b border-[#e5e5e5] pb-4">
            <h3 className="font-body mb-2 text-[10px] font-bold uppercase tracking-wide text-gray-500">
              More information
            </h3>
            <div className="flex flex-col gap-1.5">
              {hasInat && (
                <a
                  href={species.iNaturalistLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[11px] text-[#15803d] underline"
                >
                  iNaturalist
                </a>
              )}
              {hasNS && (
                <a
                  href={species.nsEexplorerLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[11px] text-[#15803d] underline"
                >
                  NatureServe Explorer
                </a>
              )}
              {hasOdfw && (
                <a
                  href={`https://${species.odfwLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[11px] text-[#15803d] underline"
                >
                  ODFW Wildlife Action Plan
                </a>
              )}
              {hasOregonFlora && (
                <a
                  href={species.oregonFloraLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[11px] text-[#15803d] underline"
                >
                  OregonFlora
                </a>
              )}
            </div>
          </section>
        )}

        {/* Taxonomic position */}
        <section className="mt-5 border-b border-[#e5e5e5] pb-4">
          <h3 className="font-body mb-2 text-[10px] font-bold uppercase tracking-wide text-gray-500">
            Taxonomic position
          </h3>
          {taxonomyLine1 && (
            <p className="font-body text-[11px]">{taxonomyLine1}</p>
          )}
          {taxonomyLine2 && (
            <p className="font-body text-[11px]">{taxonomyLine2}</p>
          )}
          <p className="font-scientific text-[11px] italic">
            {species.genusSpecies}
          </p>
          {isOrEndemic && (
            <span className="font-body mt-3 inline-block border border-[#15803d] px-2 py-1 text-[10px] font-bold text-[#15803d]">
              Oregon Endemic
            </span>
          )}
        </section>

        {/* Cite this record */}
        <section className="mt-4">
          <h3 className="font-body mb-2 text-[10px] font-bold uppercase tracking-wide text-gray-500">
            Cite this record
          </h3>
          <div className="border-2 border-black p-3">
            <p className="font-body text-[10px] italic">{citation}</p>
            <div className="mt-3">
              <button
                onClick={handleCopyCitation}
                className="font-body border border-black px-3 py-1 text-[9px] font-bold transition hover:bg-[#f5f5f5]"
              >
                {citationCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
}
