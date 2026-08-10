import { MetadataRoute } from "next";
import { getAllSpecies } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const species = await getAllSpecies();
  
  const speciesEntries = species.map((s) => ({
    url: `https://fieldguide.orbic.pdx.edu/species/${s.slug}`,
    // Note: Taxonomy is "always in flux" [Source 3]. 
    // Use an actual record update timestamp if available in your DB.
  }));

  return [
    { url: 'https://fieldguide.orbic.pdx.edu/' },
    { url: 'https://fieldguide.orbic.pdx.edu/species' },
    { url: 'https://fieldguide.orbic.pdx.edu/about' },
    ...speciesEntries,
  ];
}
