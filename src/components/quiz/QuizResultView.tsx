"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { Species } from "@/types/species";
import SpeciesSummarySentence from "@/components/species/SpeciesSummarySentence";
import { formatList, getEcoregionNames } from "@/lib/species-sentence";
import { buildWhyMatched } from "@/lib/quiz";
import { questions } from "@/data/questions";
import type { QuizFilters } from "@/lib/quiz";
import {
  getSpeciesImagePath,
  getCategoryIcon,
  getCategoryLabel,
} from "@/lib/speciesImage";

interface QuizResultViewProps {
  result: Species;
  answers: QuizFilters;
  onRestart: () => void;
}

const FEDERAL_LABELS: Record<string, string> = {
  E: "Endangered",
  T: "Threatened",
  PE: "Proposed Endangered",
  PT: "Proposed Threatened",
  C: "Candidate",
  SOC: "Species of Concern",
  PS: "Partial Status",
  UR: "Under Review",
  DL: "Delisted",
  PDL: "Proposed Delisted",
};

const STATE_STATUS_LABELS: Record<string, string> = {
  LE: "Listed Endangered",
  LT: "Listed Threatened",
  PE: "Proposed Endangered",
  PT: "Proposed Threatened",
  C: "Candidate",
  SC: "Species of Concern",
  S: "Sensitive",
  SGCN: "Species of Greatest Conservation Need",
  SCIN: "Species of Great Information Need",
};

const DONATE_URL =
  "https://www.givecampus.com/campaigns/50223/donations/new?designation=institutefornaturalresources";

function Badge({
  tone,
  children,
}: {
  tone: "rank" | "federal";
  children: ReactNode;
}) {
  return (
    <span
      className={`font-body px-2.5 py-1 text-[10px] font-bold tracking-wide text-white ${
        tone === "federal" ? "bg-[#d94a15]" : "bg-[#d61f4c]"
      }`}
    >
      {children}
    </span>
  );
}

export default function QuizResultView({
  result,
  answers,
  onRestart,
}: QuizResultViewProps) {
  const nameHeadingRef = useRef<HTMLHeadingElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    nameHeadingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isShareOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsShareOpen(false);
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareRef.current &&
        !shareRef.current.contains(event.target as Node)
      ) {
        setIsShareOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShareOpen]);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeout = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const imagePath = getSpeciesImagePath(result.elementGlobalId);
  const categoryIcon = getCategoryIcon(result.list);
  const categoryLabel = getCategoryLabel(result.list);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `I matched with the ${result.commonName} on ORBIC's Oregon rare species quiz!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } finally {
      setCopied(true);
    }
  };

  function handleDownloadPDF() {
    const speciesUrl = `${window.location.origin}/species/${result.slug}`;
    const commonName = result.commonName ?? result.scientificName ?? "";
    const scientificName = result.scientificName ?? "";
    const statusParts = [
      result.globalRank,
      result.stateRank,
      result.federalRank ? `ESA: ${result.federalRank}` : null,
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

  const federalLabel = result.federalRank
    ? (FEDERAL_LABELS[result.federalRank] ?? result.federalRank)
    : undefined;
  const stateStatusLabel = result.stateStatus
    ? (STATE_STATUS_LABELS[result.stateStatus] ?? result.stateStatus)
    : undefined;
  const statusLine =
    [
      federalLabel && `${federalLabel} (ESA)`,
      stateStatusLabel && `${stateStatusLabel} (Oregon)`,
    ]
      .filter(Boolean)
      .join(" · ") || "Not currently listed";

  const hasInat = !!result.iNaturalistLink;
  const hasNS = !!result.nsEexplorerLink;
  const hasOdfw = !!result.odfwLink;
  const hasOregonFlora = !!result.oregonFloraLink;
  const hasLinks = hasInat || hasNS || hasOdfw || hasOregonFlora;

  return (
    <div className="font-body">
      <div className="bg-[#0a2818] text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10 md:px-16 lg:grid lg:grid-cols-[340px_1fr] lg:items-center lg:py-16">
          <div className="mx-auto w-full max-w-sm border-2 border-white/20 bg-[#0d2419] p-2">
            <div className="border border-white/10 bg-[#0d2419] p-4">
              <div className="relative aspect-[4/3] w-full bg-black">
                {imagePath ? (
                  <Image
                    src={imagePath}
                    alt={result.commonName ?? result.scientificName ?? ""}
                    fill
                    sizes="(max-width: 640px) 100vw, 340px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3">
                    <div className="relative h-16 w-16 opacity-30">
                      <Image
                        src={categoryIcon}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="font-body text-xs font-medium text-white/50">
                      {categoryLabel}
                    </p>
                  </div>
                )}
              </div>

              <div aria-live="polite" className="mt-4">
                <h2
                  ref={nameHeadingRef}
                  tabIndex={-1}
                  className="font-heading text-xl font-bold leading-tight focus:outline-none"
                >
                  {result.commonName ?? result.scientificName}
                </h2>
                <p className="font-scientific mt-1 text-sm italic text-[#9ecfaf]">
                  {result.scientificName}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {result.orbicList && (
                    <Badge tone="rank">ORBIC List {result.orbicList}</Badge>
                  )}
                  <Badge tone="rank">{result.globalRank}</Badge>
                  <Badge tone="rank">{result.stateRank}</Badge>
                  {result.federalRank && (
                    <Badge tone="federal">ESA: {result.federalRank}</Badge>
                  )}
                </div>
                <p className="font-body mt-3 text-[10px] uppercase tracking-[0.2em] text-[#6dbf8a]">
                  {result.family}
                  {result.authorNameFull ? ` · ${result.authorNameFull}` : ""}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-[#6dbf8a] sm:text-sm">
              Your match
            </p>
            <p className="font-heading mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              This one found you.
            </p>
            <SpeciesSummarySentence
              species={result}
              className="font-body mt-4 max-w-2xl text-sm leading-7 text-[#c9ddd0] sm:text-base"
            />
            <p
              className="font-body mt-4 max-w-2xl text-sm leading-7 text-[#c9ddd0] sm:text-base"
              dangerouslySetInnerHTML={{
                __html:
                  result.habitatDescription ??
                  "No description available for this species yet.",
              }}
            />

            <div className="mt-6 flex flex-wrap items-start gap-3">
              <Link
                href={`/species/${result.slug}`}
                className="font-body rounded-md bg-[#16873d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1b9947] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
              >
                See full species profile →
              </Link>
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body rounded-md border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
              >
                Donate →
              </a>

              <div className="relative w-full sm:w-auto" ref={shareRef}>
                <button
                  type="button"
                  onClick={() => setIsShareOpen((open) => !open)}
                  aria-expanded={isShareOpen}
                  className="font-body rounded-md border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
                >
                  🔗 Share
                </button>

                {isShareOpen && (
                  <div
                    role="dialog"
                    aria-label="Share your result"
                    className="absolute left-0 top-full z-20 mt-2 w-[280px] rounded-md border border-[#d8d8d8] bg-white p-3 text-[#0f0f0f] shadow-lg sm:left-auto sm:right-0 sm:w-[300px]"
                  >
                    <p className="font-body text-xs font-bold">
                      🔗 Share your result
                    </p>
                    <div className="mt-3 flex items-center gap-2 rounded-sm border border-[#d8d8d8] bg-[#f7f7f0] px-2 py-1.5">
                      <p className="flex-1 truncate font-body text-[11px] text-[#4d4d4d]">
                        {shareUrl}
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="font-body rounded-md bg-[#0f0f0f] px-2 py-1 text-[10px] font-bold text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
                      >
                        Copy
                      </button>
                    </div>

                    <p className="font-body mt-3 text-[11px] font-semibold text-[#4d4d4d]">
                      Share on
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-1.5">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body rounded-md bg-[#1da1f2] px-2 py-1.5 text-center text-[10px] font-bold text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
                      >
                        Twitter/X
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body rounded-md bg-[#1877f2] px-2 py-1.5 text-center text-[10px] font-bold text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
                      >
                        Facebook
                      </a>
                      <a
                        href={`https://bsky.app/intent/compose?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body rounded-md bg-[#0057ff] px-2 py-1.5 text-center text-[10px] font-bold text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
                      >
                        Bluesky
                      </a>
                      <a
                        href={`mailto:?subject=${encodeURIComponent("My ORBIC species match")}&body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                        className="font-body rounded-md border border-[#d8d8d8] bg-[#f7f7f0] px-2 py-1.5 text-center text-[10px] font-bold text-[#0f0f0f] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
                      >
                        Email link
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10 md:px-16 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div>
          <div className="border-t border-[#e0ddd7] pt-6">
            <h3 className="font-heading text-lg font-bold text-[#0f0f0f]">
              Why you matched
            </h3>
            <p className="font-body mt-2 max-w-2xl text-sm leading-7 text-[#4d4d4d]">
              {buildWhyMatched(answers, questions)}
            </p>
          </div>

          <dl className="mt-6 grid gap-4 border-t border-[#e0ddd7] pt-6 sm:grid-cols-3">
            <div>
              <dt className="font-body text-xs font-bold text-[#0f0f0f]">
                Ecoregions
              </dt>
              <dd className="font-body mt-1 text-sm text-[#4d4d4d]">
                {formatList(getEcoregionNames(result.ecoregion)) || "-"}
              </dd>
            </div>
            <div>
              <dt className="font-body text-xs font-bold text-[#0f0f0f]">
                Occurrences
              </dt>
              <dd className="font-body mt-1 text-sm text-[#4d4d4d]">
                {result.nEo ?? "—"} records ({result.nEoPre2000 ?? "—"} before
                2000, {result.nEoPost2000 ?? "—"} since)
              </dd>
            </div>
            <div>
              <dt className="font-body text-xs font-bold text-[#0f0f0f]">
                Status
              </dt>
              <dd className="font-body mt-1 text-sm text-[#4d4d4d]">
                {statusLine}
              </dd>
            </div>
          </dl>

          {/* External links */}
          {hasLinks && (
            <div className="mt-6 border-t border-[#e0ddd7] pt-6">
              <p className="font-body text-xs font-bold text-[#0f0f0f]">
                More information
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                {hasInat && (
                  <a
                    href={result.iNaturalistLink!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-[#16873d] underline"
                  >
                    iNaturalist
                  </a>
                )}
                {hasNS && (
                  <a
                    href={result.nsEexplorerLink!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-[#16873d] underline"
                  >
                    NatureServe Explorer
                  </a>
                )}
                {hasOdfw && (
                  <a
                    href={`https://${result.odfwLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-[#16873d] underline"
                  >
                    ODFW Wildlife Action Plan
                  </a>
                )}
                {hasOregonFlora && (
                  <a
                    href={result.oregonFloraLink!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-[#16873d] underline"
                  >
                    OregonFlora
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-[#4d4d4d]">
            Your species card
          </p>
          <p className="font-body mt-1 text-sm text-[#4d4d4d]">
            Download a shareable mini field guide card.
          </p>

          <div className="mt-3 flex gap-3 border-2 border-[#e0ddd7] p-3">
            <div className="relative h-20 w-16 shrink-0 bg-black">
              {imagePath ? (
                <Image
                  src={imagePath}
                  alt={result.commonName ?? result.scientificName ?? ""}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-1.5">
                  <div className="relative h-8 w-8 opacity-30">
                    <Image
                      src={categoryIcon}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="font-body text-center text-[9px] font-medium text-white/50">
                    {categoryLabel}
                  </p>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-heading truncate text-sm font-bold text-[#0f0f0f]">
                {result.commonName ?? result.scientificName}
              </p>
              <p className="font-scientific truncate text-xs italic text-[#4d4d4d]">
                {result.scientificName}
              </p>
              <p className="font-body mt-1 text-[11px] text-[#4d4d4d]">
                {result.globalRank} · {result.stateRank}
                {result.federalRank ? ` · ESA: ${result.federalRank}` : ""}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="font-body rounded-md border-2 border-[#1a1a1a] bg-white px-4 py-2 text-xs font-bold text-[#0f0f0f] transition hover:bg-[#f5f7f3] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            >
              ⬇ Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-10 text-center sm:px-8 md:px-16">
        <button
          type="button"
          onClick={onRestart}
          className="font-body rounded-md text-sm font-semibold text-[#16873d] transition hover:text-[#0f0f0f] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
        >
          ↻ Take it again
        </button>
      </div>

      {copied && (
        <div
          aria-live="polite"
          className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:inset-x-auto sm:right-4 sm:justify-end"
        >
          <div className="flex items-start gap-3 rounded-md border-l-4 border-[#16873d] bg-[#0d1f14] px-4 py-3 text-white shadow-lg">
            <div>
              <p className="font-body text-sm font-semibold">
                🔗 Link copied to clipboard
              </p>
              <p className="font-body text-xs text-[#8fce9d]">
                Fades out after 3s
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
