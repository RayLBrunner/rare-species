"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const touchStarted = useRef(false);

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  const handleTouchStart = () => {
    touchStarted.current = true;
    toggleMenu();
  };

  const handleClick = () => {
    if (touchStarted.current) {
      touchStarted.current = false;
      return;
    }
    toggleMenu();
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#032014] text-white">
      <div className="flex items-center justify-between px-6 py-4 sm:px-8 md:px-16">
        <Link href="/" className="font-bold text-lg">
          ORBIC
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <ul className="hidden items-center gap-6 lg:flex">
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
      </div>

      <div
        id="mobile-menu"
        className={`${isOpen ? "block" : "hidden"} lg:hidden pointer-events-auto`}
      >
        <div className="border-t border-white/10 bg-[#032014] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <ul className="space-y-1 px-6 pb-4 pt-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`block rounded px-3 py-2 transition ${
                    isActive(link.href)
                      ? "bg-[#0f3c23] font-semibold text-[#6fc08f]"
                      : "hover:bg-white/5 hover:text-[#6fc08f]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
