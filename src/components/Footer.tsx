import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  target?: string;
}

const EXPLORE_LINKS: FooterLink[] = [
  { label: "Browse Species", href: "/species" },
  { label: "Take the Quiz", href: "/quiz" },
  { label: "About ORBIC", href: "/about" },
  {
    label: "Support Our Work",
    href: "https://www.givecampus.com/campaigns/50223/donations/new?designation=institutefornaturalresources",
    target: "_blank",
  },
];

const RESOURCE_LINKS: FooterLink[] = [
  {
    label: "Accessibility",
    href: "https://www.pdx.edu/accessibility/",
    target: "_blank",
  },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="font-body bg-[#032014] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 md:px-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <span className="font-heading text-xl font-bold">ORBIC</span>
            <p className="mt-3 max-w-xs text-sm text-[#b7c9bf]">
              A field guide to Oregon&apos;s rare, threatened, and endangered
              species, maintained by the Oregon Biodiversity Information Center.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#999]">
              Explore
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.target}
                    rel={
                      link.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-[#b7c9bf] transition hover:text-[#6fc08f]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#999]">
              Resources
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.target}
                    rel={
                      link.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-[#b7c9bf] transition hover:text-[#6fc08f]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[#b7c9bf] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ORBIC · Portland State University ·
            Licensed under CC BY-NC 4.0
          </p>
          <p>
            Site design by the{" "}
            <Link
              href="/team"
              className="underline transition hover:text-[#6fc08f]"
            >
              PSU Capstone Team
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
