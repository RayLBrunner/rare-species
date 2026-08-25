"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavLink {
  label: string;
  href: string;
  description?: string;
  target?: string;
  isButton?: boolean;
}

const MAIN_NAV_LINKS: NavLink[] = [
  {
    label: "Browse Species",
    href: "/species",
    description: "Full index with filters",
  },
  {
    label: "Take the Quiz",
    href: "/quiz",
    description: "Find your species match",
  },
  {
    label: "About ORBIC",
    href: "/about",
    description: "50 years of rare species tracking",
  },
  {
    label: "Support Our Work",
    href: "https://www.givecampus.com/campaigns/50223/donations/new?designation=institutefornaturalresources",
    description: "Support conservation — Fall 2026",
    target: "_blank",
    isButton: true,
  },
];

const MORE_NAV_LINKS: NavLink[] = [
  {
    label: "Accessibility",
    href: "https://accessibility.oregonstate.edu/accessibility-statement",
    target: "_blank",
  },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="font-body sticky top-0 z-50 bg-[#032014] text-white">
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between px-6 py-4 sm:px-8 md:px-16">
        <Link href="/" className="group flex items-center gap-2">
          <span
            aria-hidden="true"
            className="aspect-[799/587] h-6 shrink-0 bg-white transition-colors duration-150 [mask-image:url('/images/logos/Oregon_State_Boundary.svg')] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/images/logos/Oregon_State_Boundary.svg')] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] group-hover:bg-[#6fc08f]"
          />
          <span className="font-heading font-bold text-xl transition-colors duration-150 group-hover:text-[#6fc08f]">
            ORBIC | Rare Species
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6">
          {MAIN_NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                target={link.target}
                rel={
                  link.target === "_blank" ? "noopener noreferrer" : undefined
                }
                className={
                  link.isButton
                    ? "font-body text-sm bg-[#16873d] text-white px-4 py-2 border border-white transition hover:bg-[#1b9947]"
                    : `font-body text-sm transition ${
                        isActive(link.href)
                          ? "border-b-2 border-[#16873d] font-semibold text-[#6fc08f]"
                          : "hover:text-[#6fc08f]"
                      }`
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: donate button + hamburger together */}
        <div className="flex items-center gap-3 md:hidden">
          {MAIN_NAV_LINKS.filter((l) => l.isButton).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
              className="font-body text-xs bg-[#16873d] text-white px-3 py-1.5 border border-white transition hover:bg-[#1b9947]"
            >
              {link.label}
            </Link>
          ))}
          <button
            className="relative z-50 flex flex-col gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#6fc08f] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-[#032014] transform transition-transform duration-300 ease-out z-40 md:hidden overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="px-6 py-4 border-b border-[#16873d]">
          <span className="font-heading font-bold text-lg">ORBIC</span>
        </div>

        {/* Navigation Section */}
        <div className="px-6 py-6 border-b border-[#16873d]">
          <h2 className="font-body text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">
            Navigation
          </h2>
          <ul className="space-y-4">
            {MAIN_NAV_LINKS.filter((link) => !link.isButton).map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={link.target}
                  rel={
                    link.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                  className={`block transition ${
                    isActive(link.href)
                      ? "text-[#6fc08f]"
                      : "text-white hover:text-[#6fc08f]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-heading font-bold text-base">
                    {link.label}
                  </span>
                  {link.description && (
                    <p className="text-xs text-[#999] mt-1">
                      {link.description}
                    </p>
                  )}
                  <div className="flex justify-end">
                    <svg
                      className="w-4 h-4 text-[#6fc08f]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More Section */}
        <div className="px-6 py-6">
          <h2 className="font-body text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">
            More
          </h2>
          <ul className="space-y-3">
            {MORE_NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={link.target}
                  rel={
                    link.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                  className={`block transition ${
                    isActive(link.href)
                      ? "text-[#6fc08f]"
                      : "text-white hover:text-[#6fc08f]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
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
