"use client";

import Image from "next/image";
import Link from "next/link";
import Slider, { Settings } from "react-slick";

const featuredSpecies = [
  {
    name: "Emerald Cascade Lily",
    scientificName: "Lilium viridimontanum",
    image: "/images/species/emerald-cascade-lily.jpg",
    slug: "emerald-cascade-lily",
  },
  {
    name: "Silver-Tailed Meadow Fox",
    scientificName: "Vulpes argenticauda",
    image: "/images/species/silver-tailed-meadow-fox.jpg",
    slug: "silver-tailed-meadow-fox",
  },
  {
    name: "Willamette Blue Fern",
    scientificName: "Pteridium caeruleum",
    image: "/images/species/willamette-blue-fern.jpg",
    slug: "willamette-blue-fern",
  },
  {
    name: "Crimson Gorge Butterfly",
    scientificName: "Papilio rubricaulis",
    image: "/images/species/crimson-gorge-butterfly.jpg",
    slug: "crimson-gorge-butterfly",
  },
  {
    name: "Oregon Moonlight Owl",
    scientificName: "Strix lunaris",
    image: "/images/species/oregon-moonlight-owl.jpg",
    slug: "oregon-moonlight-owl",
  },
  {
    name: "Golden Marsh Salamander",
    scientificName: "Ambystoma aureopaludis",
    image: "/images/species/golden-marsh-salamander.jpg",
    slug: "golden-marsh-salamander",
  },
];

export default function FeaturedSpecies() {
  const settings: Settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    adaptiveHeight: false,
  };

  return (
    <section aria-labelledby="featured-species-heading">
      <div className="mb-4 z-30 flex items-end justify-between">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-[#15803d]">
            Discover something rare
          </p>

          <h2
            id="featured-species-heading"
            className="font-heading text-lg font-bold"
          >
            Featured Species
          </h2>
        </div>

        <Link href="/species" className="font-body z-40 cursor-pointer text-[13px]">
          View all →
        </Link>
      </div>

      <div className="featured-species-slider relative">
        <Slider {...settings}>
          {featuredSpecies.map((species) => (
            <div key={species.slug}>
              <article className="grid min-h-[320px] overflow-hidden bg-[#032014] text-white md:grid-cols-[42%_58%]">
                <div className="min-h-[280px] p-5 md:min-h-[320px] md:p-7">
                  <div className="relative h-full min-h-[240px] w-full overflow-hidden border border-white/40 bg-[#e8e5df] text-black md:min-h-[264px]">
                    <Image
                      src={species.image}
                      alt={species.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex min-h-[280px] flex-col justify-between p-6 md:min-h-[320px] md:p-8">
                  <div>
                    <h3 className="font-heading text-2xl font-bold leading-tight md:text-3xl">
                      {species.name}
                    </h3>

                    <p className="font-scientific mt-2 text-sm italic text-[#b8dfc5]">
                      {species.scientificName}
                    </p>

                    <div
                      className="mt-5 space-y-3"
                      aria-label="Species description coming soon"
                    >
                      <div className="h-2.5 w-full max-w-[520px] bg-white/80" />
                      <div className="h-2.5 w-full max-w-[460px] bg-white/80" />
                      <div className="h-2.5 w-full max-w-[390px] bg-white/80" />
                    </div>
                  </div>

                  <Link
                    href={`/species/${species.slug}`}
                    className="font-body mt-6 w-fit border-2 border-white px-4 py-2 text-sm font-semibold hover:bg-white hover:text-[#032014]"
                  >
                    View species →
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
