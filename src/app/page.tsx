import Hero from "../components/home/Hero";
import SpeciesCategories from "../components/home/ExploreBySpecies";
import ExploreByHabitat from "../components/home/ExploreByHabitat";
import ExploreMap from "../components/home/ExploreMap";
import FeaturedSpecies from "@/components/home/FeaturedSpecies";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="mx-auto w-full max-w-7xl px-6 pt-8">
        <div className="space-y-4">
          <FeaturedSpecies />
          <SpeciesCategories />
          <ExploreByHabitat />
          <ExploreMap />
        </div>
      </main>
    </>
  );
}
