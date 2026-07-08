const statusRanks = [
  {
    label: "Global Rank (G-Rank)",
    desktopLabel: "G-Rank (Global)",
    value: "G1 — Critically Imperiled Globally",
    color: "text-[#c8103a]",
  },
  {
    label: "Federal (ESA) Status",
    desktopLabel: "Federal (ESA)",
    value: "Threatened — Listed 2000",
    badge: "Federal: Threatened (ESA)",
    badgeColor: "bg-[#d94f00]",
    description: "Listed Threatened under ESA (2000)",
    color: "text-[#d94f00]",
  },
  {
    label: "ORBIC List",
    desktopLabel: "ORBIC List",
    value: "List 1 — Highest concern",
    badge: "ORBIC List 1",
    badgeColor: "bg-[#c8103a]",
    description: "Highest conservation concern in Oregon",
    color: "text-[#c8103a]",
  },
  {
    label: "ODFW Strategy Species",
    desktopLabel: "ODFW Strategy",
    value: "Yes — ODFW Strategy Species",
    color: "text-[#4d7c0f]",
  },
  {
    label: "USFS Sensitive",
    desktopLabel: "USFS",
    value: "USFS Sensitive",
    badge: "USFS Sensitive",
    badgeColor: "bg-[#c8103a]",
    color: "text-[#c8103a]",
  },
];

export default function StatusRanksTab() {
  return (
    <div>
      <div className="md:hidden">
        {statusRanks.map((status) => (
          <section
            key={status.label}
            className="border-b border-[#d8d8d8] py-5 first:pt-0 last:border-b-0"
          >
            <h3 className="font-body mb-1 text-[14px] font-bold text-black">
              {status.label}
            </h3>

            {status.badge ? (
              <div
                className={`font-body mt-3 inline-block px-3 py-2 text-[11px] font-bold text-white ${status.badgeColor}`}
              >
                {status.badge}
              </div>
            ) : (
              <p className="font-body text-[12px] text-black">{status.value}</p>
            )}

            {status.description && (
              <p className="font-body mt-3 text-[12px] text-[#777]">
                {status.description}
              </p>
            )}
          </section>
        ))}
      </div>

      <div className="hidden md:block">
        {statusRanks.map((status) => (
          <section
            key={status.desktopLabel}
            className="grid border-b border-[#d8d8d8] py-4 md:grid-cols-[220px_1fr] md:px-8"
          >
            <h3 className="font-body text-[13px] font-bold text-[#777]">
              {status.desktopLabel}
            </h3>

            <p className={`font-body text-[13px] ${status.color}`}>
              {status.value}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
