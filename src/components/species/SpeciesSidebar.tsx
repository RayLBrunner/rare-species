"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Species } from "@/types/species";
import { getOrEndemicFlag } from "@/lib/speciesDisplay";
import {
  getSpeciesImagePath,
  getCategoryIcon,
  getCategoryLabel,
} from "@/lib/speciesImage";

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

  const now = new Date();
  const year = now.getFullYear();
  const accessedDate = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const citation = `Oregon Biodiversity Information Center. ${year}. ${species.commonName} (${species.genusSpecies}) Species Account. Oregon Rare Species Field Guide. Accessed ${accessedDate}. Portland State University. Portland, Oregon, USA.`;

  const hasInat =
    species.iNaturalistLink && species.iNaturalistLink !== "NEEDSMANUALMATCH";
  const hasNS = !!species.nsEexplorerLink;
  const hasOdfw = !!species.odfwLink;
  const hasOregonFlora =
    species.category1 === "vascularPlants" && !!species.oregonFloraLink;
  const hasLinks = hasInat || hasNS || hasOdfw || hasOregonFlora;

  const imagePath = getSpeciesImagePath(species.elementGlobalId);
  const categoryIcon = getCategoryIcon(species.list);
  const categoryLabel = getCategoryLabel(species.list);

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

  return (
    <>
      {/* Mobile quick actions */}
      <div className="space-y-3 lg:hidden">
        <Link
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body block w-full border-b-4 border-black bg-[#15803d] px-4 py-4 text-center text-[1em] font-bold text-white"
        >
          Donate to Support →
        </Link>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden border-[#d8d8d8] bg-white pl-6 pb-10 lg:block">
        <Link
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block border-2 border-black border-b-4 bg-[#15803d] p-4 text-white transition hover:bg-[#1b9947]"
        >
          <h2 className="font-body text-base font-bold">
            Donate to Support →
          </h2>
          <p className="font-body mt-1 text-[1em] text-[#9ed2aa]">
            Help protect Oregon's rare species
          </p>
        </Link>

        {/* Quick actions */}
        <section className="mt-5">
          <h3 className="font-body mb-2 text-[1em] font-bold tracking-wide text-gray-500">
            Quick actions
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={handleShareProfile}
              className="font-body flex items-center gap-2 border-2 border-black border-b-4 bg-white px-3 py-2 text-[1em] font-bold transition hover:bg-[#f5f5f5]"
            >
              <span className="text-gray-400">🔗</span>
              {linkCopied ? "Link copied!" : "Share profile"}
            </button>
          </div>
        </section>

        {/* External links */}
        {hasLinks && (
          <section className="mt-5 border-b border-[#e5e5e5] pb-4">
            <h3 className="font-body mb-2 text-[1em] font-bold uppercase tracking-wide text-gray-500">
              More information
            </h3>
            <div className="flex flex-col gap-1.5">
              {hasInat && (
                <a
                  href={species.iNaturalistLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[1em] text-[#15803d] underline"
                >
                  iNaturalist
                </a>
              )}
              {hasNS && (
                <a
                  href={species.nsEexplorerLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[1em] text-[#15803d] underline"
                >
                  NatureServe Explorer
                </a>
              )}
              {hasOdfw && (
                <a
                  href={`https://${species.odfwLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[1em] text-[#15803d] underline"
                >
                  ODFW Wildlife Action Plan
                </a>
              )}
              {hasOregonFlora && (
                <a
                  href={species.oregonFloraLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[1em] text-[#15803d] underline"
                >
                  OregonFlora
                </a>
              )}
            </div>
          </section>
        )}

        {/* Taxonomic position */}
        <section className="mt-5 border-b border-[#e5e5e5] pb-4">
          <h3 className="font-body mb-2 text-[1em] font-bold uppercase tracking-wide text-gray-500">
            Taxonomic position
          </h3>
          {taxonomyLine1 && (
            <p className="font-body text-[1em]">{taxonomyLine1}</p>
          )}
          {taxonomyLine2 && (
            <p className="font-body text-[1em]">{taxonomyLine2}</p>
          )}
          <p className="font-scientific text-[1em] italic">
            {species.genusSpecies}
          </p>
          {isOrEndemic && (
            <span className="font-body mt-3 inline-block border border-[#15803d] px-2 py-1 text-[1em] font-bold text-[#15803d]">
              Oregon Endemic
            </span>
          )}
        </section>

        {/* Cite this record */}
        <section className="mt-4 border-b border-[#e5e5e5] pb-4">
          <h3 className="font-body mb-2 text-[1em] font-bold uppercase tracking-wide text-gray-500">
            Cite this record
          </h3>
          <div className="border-2 border-black p-3">
            <p className="font-body text-[1em] italic">{citation}</p>
            <div className="mt-3">
              <button
                onClick={handleCopyCitation}
                className="font-body border border-black px-3 py-1 text-[12px] font-bold transition hover:bg-[#f5f5f5]"
              >
                {citationCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </section>

        {/* Downloadable species card */}
        <section className="mt-4">
          <h3 className="font-body mb-2 text-[1em] font-bold uppercase tracking-wide text-gray-500">
            Species card
          </h3>
          <p className="font-body mb-3 text-[1em] text-[#4d4d4d]">
            Download a shareable mini field guide card.
          </p>
          <div className="flex gap-2 border-2 border-[#e0ddd7] p-2">
            <div className="relative h-14 w-12 shrink-0 bg-black">
              {imagePath ? (
                <Image
                  src={imagePath}
                  alt={species.commonName ?? species.scientificName ?? ""}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-1">
                  <div className="relative h-6 w-6 opacity-30">
                    <Image src={categoryIcon} alt="" fill className="object-contain" />
                  </div>
                  <p className="font-body text-center text-[8px] font-medium text-white/50">
                    {categoryLabel}
                  </p>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-heading truncate text-xs font-bold text-[#0f0f0f]">
                {species.commonName ?? species.scientificName}
              </p>
              <p className="font-scientific truncate text-[11px] italic text-[#4d4d4d]">
                {species.scientificName}
              </p>
              <p className="font-body mt-0.5 text-[10px] text-[#4d4d4d]">
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
        </section>
      </aside>
    </>
  );
}
