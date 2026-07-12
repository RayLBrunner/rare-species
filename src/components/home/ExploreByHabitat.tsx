import HabitatCard from "./HabitatCard";

const habitats = [
  { icon: "🌊", title: "Coast", count: 147 },
  { icon: "🏜️", title: "Desert", count: 289 },
  { icon: "⛰️", title: "Alpine", count: 96 },
  { icon: "🌲", title: "Forest", count: 412 },
  { icon: "💧", title: "Wetlands", count: 203 },
  { icon: "🌾", title: "Prairie", count: 118 },
];

export default function ExploreByHabitat() {
  return (
    <section>
      <h2 className="font-heading mb-4 text-lg font-bold">Explore by Habitat</h2>
      <div className="grid auto-cols-[150px] grid-flow-col grid-rows-2 gap-4 overflow-x-auto pb-4 md:auto-cols-fr md:grid-rows-1 md:grid-cols-6 md:overflow-visible">
        {habitats.map((habitat) => (
          <HabitatCard key={habitat.title} {...habitat} />
        ))}
      </div>
    </section>
  );
}
