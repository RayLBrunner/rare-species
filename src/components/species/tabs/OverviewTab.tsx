"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Species } from "@/types/species";
import SpeciesSummarySentence from "@/components/species/SpeciesSummarySentence";
import {
  getSpeciesImagePath,
  getPhotoAttribution,
  getCategoryIcon,
  getCategoryLabel,
} from "@/lib/speciesImage";

const DONATE_URL =
  "https://www.givecampus.com/campaigns/50223/donations/new?designation=institutefornaturalresources";

interface OverviewTabProps {
  species: Species;
}

export default function OverviewTab({ species }: OverviewTabProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [citationCopied, setCitationCopied] = useState(false);

  const imagePath = getSpeciesImagePath(species.elementGlobalId);
  const attr = getPhotoAttribution(species.elementGlobalId);
  const categoryIcon = getCategoryIcon(species.list);
  const categoryLabel = getCategoryLabel(species.list);

  const citation = `ORBIC. 2026. ${species.commonName} (${species.genusSpecies}), Oregon Rare Species Field Guide.`;

  function handleShare() {
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
    <div>
      <section className="border-b border-[#e5e5e5] pb-5">
        <h2 className="font-body mb-3 text-[13px] font-bold text-[#15803d]">
          About this species
        </h2>

        <SpeciesSummarySentence
          species={species}
          className="font-body max-w-[720px] text-sm leading-6 text-black"
        />
      </section>

      {species.habitatDescription && (
        <section className="border-b border-[#e5e5e5] py-5">
          <h2 className="font-body mb-3 text-[13px] font-bold text-[#15803d]">
            Habitat &amp; Ecology
          </h2>
          <p
            className="font-body max-w-[720px] text-sm leading-6 text-black"
            dangerouslySetInnerHTML={{ __html: species.habitatDescription }}
          />
        </section>
      )}

      {species.physicalDescription && (
        <section className="border-b border-[#e5e5e5] py-5">
          <h2 className="font-body mb-3 text-[13px] font-bold text-[#15803d]">
            Identification
          </h2>
          <p
            className="font-body max-w-[720px] text-sm leading-6 text-black"
            dangerouslySetInnerHTML={{ __html: species.physicalDescription }}
          />
        </section>
      )}

      {species.ecologyComments && (
        <section className="border-b border-[#e5e5e5] py-5">
          <h2 className="font-body mb-3 text-[13px] font-bold text-[#15803d]">
            Ecology
          </h2>
          <p
            className="font-body max-w-[720px] text-sm leading-6 text-black"
            dangerouslySetInnerHTML={{ __html: species.ecologyComments }}
          />
        </section>
      )}

      {species.globalRangeComments && (
        <section className="border-b border-[#e5e5e5] py-5">
          <h2 className="font-body mb-3 text-[13px] font-bold text-[#15803d]">
            Global Range
          </h2>
          <p
            className="font-body max-w-[720px] text-sm leading-6 text-black"
            dangerouslySetInnerHTML={{ __html: species.globalRangeComments }}
          />
        </section>
      )}

      <section className="border-b border-[#e5e5e5] py-5">
        <h2 className="font-body mb-3 text-[13px] font-bold text-[#15803d]">
          Photos
        </h2>

        <div className="relative h-48 w-full max-w-sm bg-black sm:h-56">
          {imagePath ? (
            <Image
              src={imagePath}
              alt={attr?.altText ?? species.commonName ?? ""}
              fill
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-contain"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <div className="relative h-16 w-16 opacity-30">
                <Image src={categoryIcon} alt="" fill className="object-contain" />
              </div>
              <p className="font-body text-xs font-medium text-white/50">{categoryLabel}</p>
            </div>
          )}
        </div>

        {attr && imagePath && (
          <p className="font-body mt-1.5 text-[10px] text-[#777]">
            {attr.photographer} ·{" "}
            <a
              href={attr.sourceImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {attr.source}
            </a>{" "}
            · {attr.license}
          </p>
        )}
        <div className="mt-6 space-y-3 lg:hidden">
          <Link
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body block w-full bg-[#15803d] px-4 py-4 text-center text-sm font-bold text-white transition hover:bg-[#1b9947]"
          >
            Donate to Support →
          </Link>

          <button
            onClick={handleShare}
            className="font-body w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-[#f5f5f5]"
          >
            {linkCopied ? "Link copied!" : "🔗 Share profile"}
          </button>

          <div className="border-2 border-black p-3">
            <h3 className="font-body mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">
              Cite this record
            </h3>
            <p className="font-body text-[12px] italic">{citation}</p>
            <button
              onClick={handleCopyCitation}
              className="font-body mt-3 border border-black px-3 py-1 text-[12px] font-bold transition hover:bg-[#f5f5f5]"
            >
              {citationCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
