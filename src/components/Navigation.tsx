"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Browse", href: "/species" },
  { label: "Quiz", href: "/quiz" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#032014] text-white">
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between px-6 py-4 sm:px-8 md:px-16">
        <Link href="/" className="font-bold text-lg">
          ORBIC
        </Link>
        <ul className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition ${
                  isActive(link.href)
                    ? "border-b-2 border-[#16873d] font-semibold text-[#6fc08f]"
                    : "hover:text-[#6fc08f]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
