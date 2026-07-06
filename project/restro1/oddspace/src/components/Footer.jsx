"use client";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        backgroundColor: "var(--space-900)",
        borderTop: "1px solid var(--hairline-700)",
        padding: "64px 5vw 32px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px",
          paddingBottom: "48px",
          borderBottom: "1px solid var(--hairline-700)",
        }}
      >
        {/* Wordmark */}
        <div>
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
              display: "block",
              marginBottom: "16px",
            }}
          >
            Meta Planet
          </a>
          <p
            className="text-body-m"
            style={{ color: "var(--text-500)", maxWidth: "280px" }}
          >
            Decoding signals from the far reaches of the cosmos. Every world has
            a story — we just need to listen.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4
            className="text-label"
            style={{ color: "var(--text-500)", marginBottom: "20px" }}
          >
            Navigation
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {["Home", "About", "Catalogue", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-body-m"
                style={{
                  color: "var(--text-500)",
                  textDecoration: "none",
                  transition: "color 0.3s var(--orbit-ease)",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--nebula-500)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--text-500)")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <h4
            className="text-label"
            style={{ color: "var(--text-500)", marginBottom: "20px" }}
          >
            Transmissions
          </h4>
          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { name: "X", icon: "𝕏" },
              { name: "GitHub", icon: "⌨" },
              { name: "Discord", icon: "◉" },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--hairline-700)",
                  color: "var(--text-500)",
                  textDecoration: "none",
                  fontSize: "1rem",
                  transition: "all 0.3s var(--orbit-ease)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--nebula-500)";
                  e.currentTarget.style.color = "var(--nebula-500)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--hairline-700)";
                  e.currentTarget.style.color = "var(--text-500)";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mission log sign-off */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span
          className="text-mono-small"
          style={{ color: "var(--signal-400)" }}
        >
          Transmission Ends · © 2026
        </span>
        <span
          className="text-mono-small"
          style={{ color: "var(--text-500)" }}
        >
          Meta Planet Observatory · All Systems Nominal
        </span>
      </div>
    </footer>
  );
}
