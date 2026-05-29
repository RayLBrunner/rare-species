interface HabitatCardProps {
  icon: string;
  title: string;
  count: number;
}

export default function HabitatCard({ icon, title, count }: HabitatCardProps) {
  return (
    <div className="border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
      <div className="flex h-16 items-center justify-center gap-3 px-3">
        <span className="text-xl">{icon}</span>

        <div>
          <h3 className="text-sm font-bold leading-tight">{title}</h3>
          <p className="text-[11px] text-gray-600">{count} species</p>
        </div>
      </div>
    </div>
  );
}
