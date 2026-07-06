"use client";

/**
 * Button — primary and secondary variants per the design system.
 * Primary: flare-500 bg, void-950 text
 * Secondary: transparent, hairline border, text-100
 */
export default function Button({ children, variant = "primary", href, onClick, className = "" }) {
  const baseStyles = {
    fontFamily: "var(--font-body)",
    fontSize: "clamp(0.6875rem, 0.75vw, 0.75rem)",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    lineHeight: 1,
    padding: "14px 32px",
    borderRadius: "2px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s var(--orbit-ease)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
  };

  const variants = {
    primary: {
      backgroundColor: "var(--flare-500)",
      color: "var(--void-950)",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "var(--text-100)",
      border: "1px solid var(--hairline-700)",
    },
  };

  const hoverClass = variant === "primary" ? "btn-primary" : "btn-secondary";
  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`${hoverClass} ${className}`}
      style={{ ...baseStyles, ...variants[variant] }}
    >
      {children}
    </Tag>
  );
}
