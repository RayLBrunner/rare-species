import Image from "next/image";
import type { TeamMember } from "@/types/team";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.29 9.29 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.19C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function PortfolioIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.75 5.5 3.75 9S14.5 18.5 12 21c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3z" />
    </svg>
  );
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const links = [
    member.linkedin && { href: member.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    member.github && { href: member.github, label: "GitHub", Icon: GitHubIcon },
    member.portfolio && { href: member.portfolio, label: "Portfolio", Icon: PortfolioIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: () => React.JSX.Element }[];

  return (
    <div className="font-body flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md">
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-[#d4f0df]">
        <Image
          src={member.photoUrl || "/images/team/placeholder-avatar.svg"}
          alt={`Photo of ${member.name}`}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <h3 className="font-heading mt-4 text-lg font-bold text-[#032014]">
        {member.name}
      </h3>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#16873d]">
        {member.role}
      </p>

      {member.bio && (
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {member.bio}
        </p>
      )}

      {links.length > 0 && (
        <div className="mt-4 flex gap-3">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on ${label}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#032014] text-white transition hover:bg-[#16873d]"
            >
              <Icon />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
