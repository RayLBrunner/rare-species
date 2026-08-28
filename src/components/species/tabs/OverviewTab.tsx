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

  const now = new Date();
  const year = now.getFullYear();
  const accessedDate = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const citation = `Oregon Biodiversity Information Center. ${year}. ${species.commonName} (${species.genusSpecies}) Species Account. Oregon Rare Species Field Guide. Accessed ${accessedDate}. Portland State University. Portland, Oregon, USA.`;

  function handleDownloadPDF() {
    const speciesUrl = `${window.location.origin}/species/${species.slug}`;
    const commonName = species.commonName ?? species.scientificName ?? "";
    const scientificName = species.scientificName ?? "";
    const statusParts = [
      species.globalRank,
      species.stateRank,
      species.federalRank ? `ESA: ${species.federalRank}` : null,
    ]
      .filter(Boolean)
      .join(" · ");
    const downloadedDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const absImage = imagePath ? `${window.location.origin}${imagePath}` : null;
    const absIcon = `${window.location.origin}${categoryIcon}`;

    const imageHtml = absImage
      ? `<img src="${absImage}" alt="${commonName}" style="width:100%;height:180px;object-fit:cover;display:block;" />`
      : `<div style="width:100%;height:120px;background:#e7e2da;display:flex;align-items:center;justify-content:center;">
           <img src="${absIcon}" alt="" style="width:48px;height:48px;opacity:0.3;" />
         </div>`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${commonName} – Oregon Rare Species Field Guide</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Georgia, serif; background: #f5f5f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    .card { border: 2px solid #222; box-shadow: 4px 4px 0 #222; max-width: 280px; width: 100%; background: #fff; }
    .content { padding: 14px; }
    .orbic-label { font-family: sans-serif; font-size: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em; color: #15803d; margin-bottom: 8px; }
    h1 { font-size: 17px; font-weight: bold; line-height: 1.3; color: #0f0f0f; margin-bottom: 3px; }
    .sci { font-style: italic; font-size: 11px; color: #4d4d4d; margin-bottom: 8px; }
    .status { font-family: sans-serif; font-size: 10px; color: #4d4d4d; margin-bottom: 12px; }
    .divider { border: none; border-top: 1px solid #e0ddd7; margin: 10px 0; }
    .link-label { font-family: sans-serif; font-size: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 3px; }
    .link { font-family: sans-serif; font-size: 9px; color: #15803d; word-break: break-all; }
    .footer { font-family: sans-serif; font-size: 8px; color: #bbb; margin-top: 10px; }
    @media print { body { background: #fff; min-height: auto; padding: 0; } }
  </style>
</head>
<body>
  <div class="card">
    ${imageHtml}
    <div class="content">
      <p class="orbic-label">Oregon Rare Species Field Guide</p>
      <h1>${commonName}</h1>
      <p class="sci">${scientificName}</p>
      <p class="status">${statusParts}</p>
      <hr class="divider" />
      <p class="link-label">Full species profile</p>
      <p class="link">${speciesUrl}</p>
      <p class="footer">Oregon Biodiversity Information Center (ORBIC) · Institute for Natural Resources · Downloaded ${downloadedDate}</p>
    </div>
  </div>
</body>
</html>`;

    const win = window.open("", "_blank", "width=420,height=640");
    if (win) {
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(() => win.print(), 500);
    }
  }

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

          <div>
            <h3 className="font-body mb-2 text-[1em] font-bold uppercase tracking-wide text-gray-500">
              Species card
            </h3>
            <p className="font-body mb-3 text-[1em] text-[#4d4d4d]">
              Download a shareable mini field guide card.
            </p>
            <div className="flex gap-3 border-2 border-[#e0ddd7] p-3">
              <div className="relative h-20 w-16 shrink-0 bg-black">
                {imagePath ? (
                  <Image
                    src={imagePath}
                    alt={species.commonName ?? species.scientificName ?? ""}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1.5">
                    <div className="relative h-8 w-8 opacity-30">
                      <Image src={categoryIcon} alt="" fill className="object-contain" />
                    </div>
                    <p className="font-body text-center text-[9px] font-medium text-white/50">
                      {categoryLabel}
                    </p>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-heading truncate text-sm font-bold text-[#0f0f0f]">
                  {species.commonName ?? species.scientificName}
                </p>
                <p className="font-scientific truncate text-xs italic text-[#4d4d4d]">
                  {species.scientificName}
                </p>
                <p className="font-body mt-1 text-[11px] text-[#4d4d4d]">
                  {species.globalRank} · {species.stateRank}
                  {species.federalRank ? ` · ESA: ${species.federalRank}` : ""}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="font-body mt-3 w-full border-2 border-[#1a1a1a] bg-white px-4 py-2 text-[1em] font-bold text-[#0f0f0f] transition hover:bg-[#f5f7f3]"
            >
              ⬇ Download species card
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
