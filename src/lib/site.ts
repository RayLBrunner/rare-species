/**
 * Canonical origin for the deployed site.
 *
 * Used for `metadataBase` (which resolves OG/Twitter image URLs), robots.txt,
 * and every sitemap entry. Set NEXT_PUBLIC_SITE_URL to override on preview or
 * staging deploys; the default is production.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.oregonbiodiversity.org"
).replace(/\/$/, "");
