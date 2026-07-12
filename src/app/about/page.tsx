import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 pt-8 pb-16">
      <div className="mx-auto max-w-3xl">
        <Image
          src="/images/about/ORBIC_OregonLogo.png"
          alt="Oregon Biodiversity Information Center logo"
          width={300}
          height={100}
          className="mx-auto"
        />
        <h1 className="font-heading text-4xl font-bold text-[#032014]">
          About
        </h1>
        <p className="font-body text-gray-600 mt-2">
          Learn more about ORBIC and the work behind this field guide.
        </p>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-[#032014]">
            Our Mission
          </h2>
          <div className="font-body text-gray-600 mt-4 space-y-4 text-base leading-relaxed">
            <p>
              The{" "}
              <a
                href="https://inr.oregonstate.edu/orbic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                Oregon Biodiversity Information Center&apos;s (ORBIC)
              </a>{" "}
              primary mission is to track the distribution and status of as much
              of Oregon&apos;s flora and fauna as possible. For{" "}
              <a
                href="https://inr.oregonstate.edu/rare-species/rare-species-ranking-definitions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                species considered to be at-risk in Oregon
              </a>
              , we manage location and population data for all observations and
              occurrences in the state.
            </p>
            <p>
              For each taxon that makes up Oregon&apos;s biodiversity, we work
              to answer three questions: What is it? Where is it? How is it
              doing?
            </p>
            <p>
              We were formed in large part to aid in the conservation of{" "}
              <a
                href="https://inr.oregonstate.edu/orbic/rare-species"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                Oregon&apos;s rare species
              </a>{" "}
              and ecosystems. The rich diversity of ecosystems and native plants
              and animals is one of Oregon&apos;s most distinctive and valued
              qualities. Oregon has rain forests, dry Ponderosa pine forests,
              oak woodlands, alpine meadows, prairies, deserts, marshes,
              estuaries, dunes, rocky headlands, lakes and streams, and an
              abundance of plants, animals, fungi, algae, and other species that
              inhabit them.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
