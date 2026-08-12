interface StatusCardProps {
  short: string;
  description: string;
  color: string;
}

export default function StatusCard({
  short,
  description,
  color,
}: StatusCardProps) {
  return (
    <div
      className={`flex h-16 flex-col items-center justify-center border-2 border-black text-center text-white shadow-[4px_4px_0px_#000] ${color}`}
    >
      <span className="font-heading text-base font-bold leading-tight">
        {short}
      </span>
      <span className="font-body text-[11px] leading-tight">
        {description}
      </span>
    </div>
  );
}
