"use client";

import Image from "next/image";
import Link from "next/link";
import Slider, { Settings } from "react-slick";

const placeholderStatuses = [
  {
    label: "ORBIC",
    value: "List 1",
    description: "Threatened or endangered",
    color: "bg-[#c8103a]",
  },
  {
    label: "State Rank",
    value: "S1",
    description: "Critically imperiled in Oregon",
    color: "bg-[#c8103a]",
  },
  {
    label: "Global Rank",
    value: "G1",
    description: "Critically imperiled globally",
    color: "bg-[#c8103a]",
  },
  {
    label: "Federal Status",
    value: "T",
    description: "Listed as threatened",
    color: "bg-[#d94f00]",
  },
];

const featuredSpecies = [
  {
    name: "Emerald Cascade Lily",
    scientificName: "Lilium viridimontanum",
    image: "/images/species/emerald-cascade-lily.jpg",
    slug: "emerald-cascade-lily",
    statuses: placeholderStatuses,
  },
  {
    name: "Silver-Tailed Meadow Fox",
    scientificName: "Vulpes argenticauda",
    image: "/images/species/silver-tailed-meadow-fox.jpg",
    slug: "silver-tailed-meadow-fox",
    statuses: placeholderStatuses,
  },
  {
    name: "Willamette Blue Fern",
    scientificName: "Pteridium caeruleum",
    image: "/images/species/willamette-blue-fern.jpg",
    slug: "willamette-blue-fern",
    statuses: placeholderStatuses,
  },
  {
    name: "Crimson Gorge Butterfly",
    scientificName: "Papilio rubricaulis",
    image: "/images/species/crimson-gorge-butterfly.jpg",
    slug: "crimson-gorge-butterfly",
    statuses: placeholderStatuses,
  },
  {
    name: "Oregon Moonlight Owl",
    scientificName: "Strix lunaris",
    image: "/images/species/oregon-moonlight-owl.jpg",
    slug: "oregon-moonlight-owl",
    statuses: placeholderStatuses,
  },
  {
    name: "Golden Marsh Salamander",
    scientificName: "Ambystoma aureopaludis",
    image: "/images/species/golden-marsh-salamander.jpg",
    slug: "golden-marsh-salamander",
    statuses: placeholderStatuses,
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

        <Link
          href="/species"
          className="font-body z-40 cursor-pointer text-[13px]"
        >
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
                      className="mt-4"
                      aria-label={`${species.name} conservation status`}
                    >
                      <p className="font-body text-[20px] font-semibold uppercase tracking-widest text-white">
                        Status at a glance
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {species.statuses.map((status) => (
                          <div
                            key={status.label}
                            className="border border-white bg-white/5 p-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-body text-[15px] font-semibold uppercase tracking-wide text-white/70">
                                {status.label}
                              </span>

                              <span
                                className={`font-body shrink-0 px-2 py-1 text-xs font-bold text-white ${status.color}`}
                              >
                                {status.value}
                              </span>
                            </div>

                            <p className="font-body mt-2 text-xs leading-snug text-white/80">
                              {status.description}
                            </p>
                          </div>
                        ))}
                      </div>
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
