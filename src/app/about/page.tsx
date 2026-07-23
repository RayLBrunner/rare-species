import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 pt-8 pb-16">
      <div className="mx-auto max-w-3xl">
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

        <div className="relative mt-10 w-full overflow-hidden rounded-lg">
          <Image
            src="/images/about/orbic-canyon.jpg"
            alt="A river winding through a rocky Oregon canyon under a clear blue sky"
            width={2048}
            height={1536}
            className="w-full h-auto"
          />
        </div>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-[#032014]">
            Methods
          </h2>
          <div className="font-body text-gray-600 mt-4 space-y-4 text-base leading-relaxed">
            <p>
              ORBIC is Oregon&apos;s local member of the{" "}
              <a
                href="https://www.natureserve.org/natureserve-network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                NatureServe Network
              </a>{" "}
              of Natural Heritage Programs, utilizing their rigorous core
              standards and methodologies to assess status, risk, and condition
              of the state&apos;s biodiversity. Standardized methods allow
              sharing of conservation information across jurisdictional
              boundaries.
            </p>
            <p>
              ORBIC helps preserve these species and habitats in Oregon by
              cataloging rare species locations,{" "}
              <a
                href="https://inr.oregonstate.edu/orbic/rare-species/oregon-rare-species-publications"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                ranking species
              </a>{" "}
              by their rarity and risk of extirpation, mapping ecosystem types
              and habitats, creating species distribution models, monitoring
              snowy plovers on the Oregon coast, allocating Section 6 funds to{" "}
              <a
                href="https://inr.oregonstate.edu/rare-species/endangered-invertebrates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                endangered invertebrate
              </a>{" "}
              projects, and participating in a variety of local and regional
              projects with a wide range of agencies, organizations, and
              partnerships.
            </p>
            <p>
              You can learn more about the species on our rare species list and
              contribute your own observations to assist in conservation efforts
              on our{" "}
              <a
                href="https://www.inaturalist.org/projects/rare-threatened-endangered-species-of-oregon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                Rare, Threatened and Endangered Species of Oregon iNaturalist
                Project
              </a>
              . The Oregon Department of Fish and Wildlife also has an{" "}
              <a
                href="https://www.inaturalist.org/projects/oregon-wildlife-conservation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                Oregon Wildlife Conservation iNaturalist Project
              </a>{" "}
              focusing on Oregon Conservation Strategy Species and other Oregon
              wildlife.
            </p>
            <p>
              One of the Oregon Biodiversity Information Center&apos;s main
              tasks is to list and rank rare, threatened, and endangered (RTE)
              species in Oregon. Using our Biotics biodiversity database of
              species occurrences throughout the state and by consulting with
              agencies, specialists, academics, and the public, ORBIC reviews
              and publishes{" "}
              <a
                href="https://inr.oregonstate.edu/orbic/rare-species/oregon-rare-species-publications"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                this list
              </a>{" "}
              every two to three years. Recent publications are archived in the{" "}
              <a
                href="https://pdxscholar.library.pdx.edu/naturalresources_pub/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                Institute for Natural Resources PDX Scholar collection
              </a>
              .
            </p>
            <p>
              Species ranks are important for natural resource management,
              prioritization of restoration or conservation efforts, and to
              highlight species that need more research or protection. The ranks
              that ORBIC produces are shared internationally through the{" "}
              <a
                href="http://www.natureserve.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                NatureServe network
              </a>{" "}
              of natural heritage programs and conservation data centers.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-[#032014]">
            History
          </h2>
          <div className="font-body text-gray-600 mt-4 space-y-4 text-base leading-relaxed">
            <p>
              We&apos;ve been known by a few names over the years: starting in
              1974 as a conservation data program with The Nature Conservancy,
              then established by the Oregon Legislature as the Oregon Natural
              Heritage Program in the Natural Heritage Act of 1979 (ORS
              273.561-.591 [SB 448]), we later became the Oregon Natural
              Heritage Information Center and now the Oregon Biodiversity
              Information Center, to reflect our wider set of programs and
              research. We became part of the Institute for Natural Resources
              when it was established in 2001 under{" "}
              <a
                href="https://oregon.public.law/statutes/ors_352.808"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                ORS 352.808
              </a>
              .
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-[#032014]">
            Our Partners
          </h2>
          <div className="font-body text-gray-600 mt-4 space-y-4 text-base leading-relaxed">
            <p>
              ORBIC is Oregon&apos;s local member of the{" "}
              <a
                href="https://www.natureserve.org/natureserve-network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                NatureServe Network
              </a>{" "}
              of Natural Heritage Programs, utilizing their rigorous core
              standards and methodologies to assess status, risk, and condition
              of the state&apos;s biodiversity. We also work closely with local,
              state, and federal partners.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-[#032014]">
            Contact
          </h2>
          <div className="font-body text-gray-600 mt-4 space-y-4 text-base leading-relaxed">
            <p>
              Please contact{" "}
              <a
                href="https://inr.oregonstate.edu/directory/jesse-laney"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                Jesse Laney
              </a>{" "}
              for animal inquiries,{" "}
              <a
                href="https://inr.oregonstate.edu/directory/nora-dunkirk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                Nora Dunkirk
              </a>{" "}
              for plants and fungi inquiries, or{" "}
              <a
                href="https://inr.oregonstate.edu/directory/eleanor-gaines"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                Eleanor Gaines
              </a>{" "}
              for general inquiries.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
