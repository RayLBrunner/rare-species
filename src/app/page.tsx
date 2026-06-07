import Hero from "../components/Hero";
import SpeciesCategories from "../components/ExploreBySpecies";
import ExploreByHabitat from "../components/ExploreByHabitat";
import ExploreMap from "../components/ExploreMap";

export default function Home() {
  return (
    <>
    <div className="mx-auto w-full max-w-7xl">
      <Hero />
      <main className="w-full px-6 pt-8">
        <div className="space-y-4">
          <SpeciesCategories />
          <ExploreByHabitat />
          <ExploreMap />
        </div>
      </main>
      </div>
    </>
  );
}
