import { MetadataRoute } from "next";
import { getAllSpecies } from "@/lib/species";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const species = await getAllSpecies();

  const speciesEntries = species.map((s) => ({
    url: `${SITE_URL}/species/${s.slug}`,
    // Note: Taxonomy is "always in flux" [Source 3].
    // Use an actual record update timestamp if available in your DB.
  }));

  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/species` },
    { url: `${SITE_URL}/about` },
    ...speciesEntries,
  ];
}
