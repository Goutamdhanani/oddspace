"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "#hero", label: "Mission" },
  { href: "#catalogue", label: "Catalogue" },
  { href: "#mission-log", label: "Mission Log" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${
        scrolled ? "border-b border-hairline-700 bg-space-900/95 backdrop-blur-[1px]" : "bg-transparent"
      }`}
    >
      <div className="shell-container flex h-20 items-center justify-between">
        <Link href="#hero" className="focus-ring text-label text-text-100">
          META PLANET
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`focus-ring text-label ${
                index === 0
                  ? "text-text-100 underline decoration-flare-500 decoration-2 underline-offset-[6px]"
                  : "text-text-500 hover:text-text-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="focus-ring text-label text-text-100 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-hairline-700 bg-space-900 md:hidden"
          aria-label="Mobile"
        >
          <div className="shell-container grid gap-4 py-4">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring text-label ${
                  index === 0
                    ? "text-text-100 underline decoration-flare-500 decoration-2 underline-offset-[6px]"
                    : "text-text-500"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
