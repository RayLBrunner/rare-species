import type { Species } from "@/types/species";
import { buildSpeciesSentenceSegments } from "@/lib/species-sentence";

interface SpeciesSummarySentenceProps {
  species: Species;
  className?: string;
}

export default function SpeciesSummarySentence({
  species,
  className,
}: SpeciesSummarySentenceProps) {
  const segments = buildSpeciesSentenceSegments(species);

  return (
    <p className={className}>
      {segments.map((segment, index) =>
        segment.type === "scientificName" ? (
          <span key={index} className="italic">
            {segment.value}
          </span>
        ) : (
          segment.value
        ),
      )}
    </p>
  );
}
