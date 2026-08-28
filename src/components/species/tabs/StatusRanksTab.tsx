import type { Species } from "@/types/species";
import {
  FEDERAL_RANK_LABELS,
  STATE_STATUS_LABELS,
  ORBIC_LIST_DESCRIPTIONS,
  getGlobalRankDescription,
  getStateRankDescription,
  getStateRankColor,
} from "@/lib/speciesDisplay";

interface StatusRanksTabProps {
  species: Species;
}

interface StatusRow {
  label: string;
  desktopLabel: string;
  value: string;
  color: string;
  badge?: string;
  badgeColor?: string;
  description?: string;
}

export default function StatusRanksTab({ species }: StatusRanksTabProps) {
  const statusRows: StatusRow[] = [];

  statusRows.push({
    label: "Global Rank (G-Rank)",
    desktopLabel: "G-Rank (Global)",
    value: `${species.globalRank} — ${getGlobalRankDescription(species.globalRank)}`,
    color: "text-[#c8103a]",
  });

  statusRows.push({
    label: "State Rank (S-Rank)",
    desktopLabel: "S-Rank (Oregon)",
    value: `${species.stateRank} — ${getStateRankDescription(species.stateRank)}`,
    color: getStateRankColor(species.stateRank),
  });

  if (species.orbicList) {
    const listDesc = ORBIC_LIST_DESCRIPTIONS[species.orbicList] ?? `List ${species.orbicList}`;
    statusRows.push({
      label: "ORBIC List",
      desktopLabel: "ORBIC List",
      value: `List ${species.orbicList} — ${listDesc}`,
      badge: `ORBIC List ${species.orbicList}`,
      badgeColor: "bg-[#c8103a]",
      description: listDesc,
      color: "text-[#c8103a]",
    });
  }

  if (species.federalRank) {
    const fedLabel = FEDERAL_RANK_LABELS[species.federalRank] ?? species.federalRank;
    statusRows.push({
      label: "Federal (ESA) Status",
      desktopLabel: "Federal (ESA)",
      value: fedLabel,
      badge: `Federal: ${fedLabel}`,
      badgeColor: "bg-[#d94f00]",
      color: "text-[#d94f00]",
    });
  }

  if (species.stateStatus) {
    const stateLabel = STATE_STATUS_LABELS[species.stateStatus] ?? species.stateStatus;
    statusRows.push({
      label: "State Status",
      desktopLabel: "State Status",
      value: stateLabel,
      color: "text-[#d94f00]",
    });
  }

  if (species.odfwSGCN) {
    statusRows.push({
      label: "ODFW Strategy Species",
      desktopLabel: "ODFW Strategy",
      value: "Species of Greatest Conservation Need (SGCN)",
      color: "text-[#4d7c0f]",
    });
  }

  if (species.odfwSGIN) {
    statusRows.push({
      label: "ODFW Strategy Species",
      desktopLabel: "ODFW Strategy",
      value: "Species of Great Information Need (SGIN)",
      color: "text-[#4d7c0f]",
    });
  }

  const hasInat =
    species.iNaturalistLink &&
    species.iNaturalistLink !== "NEEDSMANUALMATCH";
  const hasNS = !!species.nsEexplorerLink;
  const hasOdfw = !!species.odfwLink;
  const hasOregonFlora =
    species.category1 === "vascularPlants" && !!species.oregonFloraLink;

  const hasLinks = hasInat || hasNS || hasOdfw || hasOregonFlora;

  return (
    <div>
      <div className="md:hidden">
        {statusRows.map((status) => (
          <section
            key={status.label}
            className="border-b border-[#d8d8d8] py-5 first:pt-0 last:border-b-0"
          >
            <h3 className="font-body mb-1 text-sm font-bold text-black">
              {status.label}
            </h3>

            {status.badge ? (
              <div
                className={`font-body mt-3 inline-block px-3 py-2 text-[12px] font-bold text-white ${status.badgeColor}`}
              >
                {status.badge}
              </div>
            ) : (
              <p className={`font-body text-[13px] ${status.color}`}>
                {status.value}
              </p>
            )}

            {status.description && (
              <p className="font-body mt-3 text-[13px] text-[#777]">
                {status.description}
              </p>
            )}
          </section>
        ))}

        {hasLinks && (
          <section className="border-b border-[#d8d8d8] py-5 last:border-b-0">
            <h3 className="font-body mb-3 text-sm font-bold text-black">
              More Information
            </h3>
            <div className="flex flex-col gap-2">
              {hasInat && (
                <a
                  href={species.iNaturalistLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-[#15803d] underline"
                >
                  iNaturalist
                </a>
              )}
              {hasNS && (
                <a
                  href={species.nsEexplorerLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-[#15803d] underline"
                >
                  NatureServe Explorer
                </a>
              )}
              {hasOdfw && (
                <a
                  href={`https://${species.odfwLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-[#15803d] underline"
                >
                  ODFW Wildlife Action Plan
                </a>
              )}
              {hasOregonFlora && (
                <a
                  href={species.oregonFloraLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-[#15803d] underline"
                >
                  OregonFlora
                </a>
              )}
            </div>
          </section>
        )}
      </div>

      <div className="hidden md:block">
        {statusRows.map((status) => (
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

        {hasLinks && (
          <section className="grid border-b border-[#d8d8d8] py-4 md:grid-cols-[220px_1fr] md:px-8">
            <h3 className="font-body text-[13px] font-bold text-[#777]">
              More Information
            </h3>
            <div className="flex flex-col gap-1">
              {hasInat && (
                <a
                  href={species.iNaturalistLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-[#15803d] underline"
                >
                  iNaturalist
                </a>
              )}
              {hasNS && (
                <a
                  href={species.nsEexplorerLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-[#15803d] underline"
                >
                  NatureServe Explorer
                </a>
              )}
              {hasOdfw && (
                <a
                  href={`https://${species.odfwLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-[#15803d] underline"
                >
                  ODFW Wildlife Action Plan
                </a>
              )}
              {hasOregonFlora && (
                <a
                  href={species.oregonFloraLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-[#15803d] underline"
                >
                  OregonFlora
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
