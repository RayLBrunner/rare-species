interface SpeciesCardProps {
  title: string;
  subtitle: string;
  image?: string;
  count: number;
}

export default function SpeciesCard({
  title,
  subtitle,
  image,
  count,
}: SpeciesCardProps) {
  return (
    <div className="border-2 border-black bg-white">
      <div className="h-[95px] bg-[#e7e2da] sm:h-[130px]">
        {image && (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        )}
      </div>

      <div className="px-2 py-1.5 sm:px-3 sm:py-2">
        <h3 className="text-[10px] font-bold leading-tight sm:text-[13px]">
          {title}
        </h3>

        <p className="mt-0.5 text-[9px] italic text-gray-600 sm:text-[11px]">
          {subtitle}
        </p>

        <span className="mt-1 inline-block bg-[#d94708] px-2 py-0.5 text-[8px] font-bold text-white sm:mt-2 sm:py-1 sm:text-[10px]">
          {count}
        </span>
      </div>
    </div>
  );
}
