"use client";

import { useState, useEffect } from "react";
import Button from "./Button";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Catalogue", href: "#catalogue" },
  { label: "Solar System", href: "#solar-system" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 5vw",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: scrolled ? "var(--space-900)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--hairline-700)" : "1px solid transparent",
          transition: "all 0.4s var(--orbit-ease)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.125rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "var(--text-100)",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          Meta Planet
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-label nav-link"
              style={{
                color: "var(--text-500)",
                textDecoration: "none",
                position: "relative",
                paddingBottom: "6px",
                transition: "color 0.3s var(--orbit-ease)",
              }}
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" href="#catalogue">
            Explore
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          style={{
            display: "none",
            background: "none",
            border: "1px solid var(--hairline-700)",
            color: "var(--text-100)",
            padding: "8px 16px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "border-color 0.3s var(--orbit-ease)",
          }}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile Slide-out Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(320px, 85vw)",
          backgroundColor: "var(--space-900)",
          borderLeft: "1px solid var(--hairline-700)",
          zIndex: 200,
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s var(--orbit-ease)",
          display: "flex",
          flexDirection: "column",
          padding: "96px 32px 32px",
          gap: "24px",
        }}
        className="mobile-panel"
      >
        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "none",
            border: "1px solid var(--hairline-700)",
            color: "var(--text-100)",
            padding: "8px 16px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Close
        </button>

        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-label"
            style={{
              color: "var(--text-500)",
              textDecoration: "none",
              padding: "12px 0",
              borderBottom: "1px solid var(--hairline-700)",
              transition: "color 0.3s var(--orbit-ease)",
            }}
          >
            {link.label}
          </a>
        ))}

        <div style={{ marginTop: "16px" }}>
          <Button variant="primary" href="#catalogue" onClick={() => setMobileOpen(false)}>
            Explore
          </Button>
        </div>

        <div
          className="text-mono-small"
          style={{
            color: "var(--signal-400)",
            marginTop: "auto",
          }}
        >
          Signal Active · Nav Module v2.1
        </div>
      </div>

      {/* Mobile backdrop overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(6, 7, 13, 0.7)",
            zIndex: 150,
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: block !important;
          }
        }
        .nav-link:hover {
          color: var(--text-100) !important;
        }
        .nav-link:hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--flare-500);
        }
      `}</style>
    </>
  );
}
