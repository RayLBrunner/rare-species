import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://fieldguide.orbic.pdx.edu/sitemap.xml',
    host: 'https://fieldguide.orbic.pdx.edu',
  };
}
