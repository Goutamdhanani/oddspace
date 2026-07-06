"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useCountUp } from "@/hooks/useCountUp";
import TransparentPlanet from "./TransparentPlanet";

/**
 * PlanetCard — the "Live Telemetry Card" signature element.
 * Corner ticks, orbit ring with hover sweep, count-up stats.
 */
export default function PlanetCard({ planet, index }) {
  const [hovered, setHovered] = useState(false);
  const [sweepDone, setSweepDone] = useState(false);
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  // Count-up hooks for stats
  const diameter = useCountUp(planet.diameter, { suffix: " km", duration: 1800 });
  const dayLength = useCountUp(planet.dayLength, { suffix: "h", duration: 1200 });

  // IntersectionObserver for card entrance
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle orbit sweep — single run only
  const handleMouseEnter = () => {
    setHovered(true);
    if (!sweepDone) {
      setTimeout(() => setSweepDone(true), 1200);
    }
  };

  const showSweep = hovered && !sweepDone;
  const sequenceNum = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={cardRef}
      className="planet-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "32px",
        border: "1px solid var(--hairline-700)",
        backgroundColor: "rgba(15, 20, 40, 0.6)",
        backdropFilter: "blur(8px)",
        cursor: "pointer",
        transition: "all 0.5s var(--orbit-ease)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Glare Line Overlay on hover */}
      <div className="glare-line" />

      {/* Corner Ticks */}
      <CornerTick position="top-left" />
      <CornerTick position="top-right" />
      <CornerTick position="bottom-left" />
      <CornerTick position="bottom-right" />

      {/* Eyebrow — signal status */}
      <div
        className="text-mono-small"
        style={{
          color: "var(--signal-400)",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--signal-400)",
            display: "inline-block",
            boxShadow: "0 0 8px var(--signal-400)",
          }}
        />
        Signal Locked · Galaxy: {planet.galaxy}
      </div>

      {/* Sequence Number + Planet Name */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" }}>
        <span
          className="text-mono-data"
          style={{ color: "var(--flare-500)", fontSize: "0.875rem" }}
        >
          {sequenceNum}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 2vw, 1.75rem)",
            fontWeight: 600,
            color: "var(--text-100)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {planet.name}
        </h3>
      </div>

      {/* Planet Image with Orbit Ring */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1",
          margin: "0 auto 28px",
          maxWidth: "240px",
        }}
      >
        {/* Static orbit ring */}
        <div
          style={{
            position: "absolute",
            inset: "-8%",
            border: "1px solid var(--hairline-700)",
            borderRadius: "50%",
            transition: "border-color 0.3s var(--orbit-ease)",
            borderColor: hovered ? "rgba(139, 124, 255, 0.4)" : "var(--hairline-700)",
          }}
        />

        {/* Rotating technical compass ring */}
        <div
          className="hero-pulsing-ring-inner"
          style={{
            position: "absolute",
            inset: "-12%",
            borderColor: hovered ? "rgba(56, 217, 201, 0.2)" : "rgba(36, 43, 71, 0.3)",
            transition: "border-color 0.3s ease",
            opacity: 0.8,
          }}
        />

        {/* Sweep orbit ring — single run on first hover */}
        <div
          style={{
            position: "absolute",
            inset: "-8%",
            border: "1.5px solid transparent",
            borderTopColor: "var(--nebula-500)",
            borderRightColor: "var(--nebula-500)",
            borderRadius: "50%",
            opacity: showSweep ? 1 : 0,
            transform: showSweep ? "rotate(360deg)" : "rotate(0deg)",
            transition: showSweep
              ? "transform 1.2s var(--orbit-ease), opacity 0.2s ease"
              : "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        {/* Planet glow */}
        <div
          style={{
            position: "absolute",
            inset: "5%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${planet.glowColor}20 0%, transparent 70%)`,
            filter: "blur(20px)",
            opacity: hovered ? 0.8 : 0.4,
            transition: "opacity 0.5s var(--orbit-ease)",
            pointerEvents: "none",
          }}
        />

        <TransparentPlanet
          src={planet.image}
          alt={`Planet ${planet.name} — ${planet.climate} world in ${planet.galaxy}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.5s var(--orbit-ease)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          borderTop: "1px solid var(--hairline-700)",
          paddingTop: "20px",
        }}
      >
        <div>
          <span
            className="text-label"
            style={{ color: "var(--text-500)", display: "block", marginBottom: "4px" }}
          >
            Diameter
          </span>
          <span className="text-mono-data" ref={diameter.ref} style={{ color: "var(--text-100)" }}>
            {diameter.displayValue}
          </span>
        </div>
        <div>
          <span
            className="text-label"
            style={{ color: "var(--text-500)", display: "block", marginBottom: "4px" }}
          >
            Day Length
          </span>
          <span className="text-mono-data" ref={dayLength.ref} style={{ color: "var(--text-100)" }}>
            {dayLength.displayValue}
          </span>
        </div>
        <div>
          <span
            className="text-label"
            style={{ color: "var(--text-500)", display: "block", marginBottom: "4px" }}
          >
            Temperature
          </span>
          <span className="text-mono-data" style={{ color: "var(--text-100)" }}>
            {planet.temp}
          </span>
        </div>
        <div>
          <span
            className="text-label"
            style={{ color: "var(--text-500)", display: "block", marginBottom: "4px" }}
          >
            Climate
          </span>
          <span className="text-mono-data" style={{ color: "var(--text-100)" }}>
            {planet.climate}
          </span>
        </div>
      </div>
    </div>
  );
}

function CornerTick({ position }) {
  const styles = {
    position: "absolute",
    width: "10px",
    height: "10px",
    pointerEvents: "none",
  };

  const positionStyles = {
    "top-left": {
      top: "-1px",
      left: "-1px",
      borderTop: "2px solid var(--text-500)",
      borderLeft: "2px solid var(--text-500)",
    },
    "top-right": {
      top: "-1px",
      right: "-1px",
      borderTop: "2px solid var(--text-500)",
      borderRight: "2px solid var(--text-500)",
    },
    "bottom-left": {
      bottom: "-1px",
      left: "-1px",
      borderBottom: "2px solid var(--text-500)",
      borderLeft: "2px solid var(--text-500)",
    },
    "bottom-right": {
      bottom: "-1px",
      right: "-1px",
      borderBottom: "2px solid var(--text-500)",
      borderRight: "2px solid var(--text-500)",
    },
  };

  return <div style={{ ...styles, ...positionStyles[position] }} />;
}
