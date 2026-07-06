"use client";

import { useEffect, useRef, useState } from "react";
import StatValue from "./StatValue";
import TransparentPlanet from "./TransparentPlanet";

const HERO_PLANETS = [
  {
    id: "etheron",
    name: "Etheron",
    eyebrow: "SIGNAL LOCKED · SEC. 4 / GRID 12",
    image: "/planets/etheron.png",
    glowColor: "rgba(56, 217, 201, 0.25)",
    description: "An ancient, frozen biosphere characterized by hyper-dense polar vortices and crystalline surface geology.",
    stats: [
      { label: "Galaxy", value: "Andromeda-IV" },
      { label: "Diameter", numericValue: 56400, suffix: " km" },
      { label: "Day Length", numericValue: 26, suffix: "h" },
      { label: "Temperature", value: "-20°" },
      { label: "Climate", value: "Polar" },
    ],
  },
  {
    id: "lumenara",
    name: "Lumenara",
    eyebrow: "SIGNAL LOCKED · SEC. 2 / GRID 08",
    image: "/planets/lumenara.png",
    glowColor: "rgba(139, 124, 255, 0.25)",
    description: "A brilliant oceanic system covered in cyan-violet algae reefs that emit luminous atmospheric radiation.",
    stats: [
      { label: "Galaxy", value: "Cygnus-III" },
      { label: "Diameter", numericValue: 51240, suffix: " km" },
      { label: "Day Length", numericValue: 56, suffix: "h" },
      { label: "Temperature", value: "38°" },
      { label: "Climate", value: "Tropical" },
    ],
  },
  {
    id: "orionis",
    name: "Orionis",
    eyebrow: "SIGNAL LOCKED · SEC. 9 / GRID 23",
    image: "/planets/orionis.png",
    glowColor: "rgba(255, 138, 61, 0.25)",
    description: "A turbulent, magma-rich proto-planet characterized by active tectonic shifts and silicate heavy atmosphere.",
    stats: [
      { label: "Galaxy", value: "Pegasus-VII" },
      { label: "Diameter", numericValue: 129700, suffix: " km" },
      { label: "Day Length", numericValue: 4, suffix: "h" },
      { label: "Temperature", value: "1,200°" },
      { label: "Climate", value: "Volcanic" },
    ],
  },
];

export default function Hero() {
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [textTrigger, setTextTrigger] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handlePlanetSelect = (index) => {
    if (index === selectedPlanetIndex) return;
    // Trigger quick reset of text animation
    setTextTrigger(false);
    setSelectedPlanetIndex(index);
    setTimeout(() => setTextTrigger(true), 50);
  };

  const planet = HERO_PLANETS[selectedPlanetIndex];

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "120px 5vw 80px",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Background starfield */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/space-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
          zIndex: 0,
        }}
      />

      {/* Floating Dynamic Planet Glow (updates color on change) */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${planet.glowColor} 0%, rgba(15, 20, 40, 0.05) 50%, transparent 70%)`,
          filter: "blur(80px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -40%)",
          zIndex: 0,
          pointerEvents: "none",
          transition: "background 1s ease",
        }}
      />

      {/* Content HUD Wrapper */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", width: "100%" }}>
        
        {/* Planet Switcher Controls */}
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "12px", 
            marginBottom: "32px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-10px)",
            transition: "all 0.6s var(--orbit-ease)",
          }}
        >
          {HERO_PLANETS.map((item, idx) => {
            const isActive = idx === selectedPlanetIndex;
            return (
              <button
                key={item.id}
                onClick={() => handlePlanetSelect(idx)}
                style={{
                  background: "none",
                  border: isActive ? "1px solid var(--signal-400)" : "1px solid var(--hairline-700)",
                  color: isActive ? "var(--signal-400)" : "var(--text-500)",
                  padding: "8px 18px",
                  fontSize: "9px",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s var(--orbit-ease)",
                  backgroundColor: isActive ? "rgba(56, 217, 201, 0.05)" : "transparent",
                  boxShadow: isActive ? "0 0 15px rgba(56, 217, 201, 0.15)" : "none"
                }}
                className="hover:border-[var(--text-100)]"
              >
                DECODE: {item.name}
              </button>
            );
          })}
        </div>

        {/* Eyebrow */}
        <div
          className="text-mono-small"
          style={{
            color: "var(--signal-400)",
            marginBottom: "16px",
            opacity: textTrigger ? 1 : 0,
            transform: textTrigger ? "translateY(0)" : "translateY(-5px)",
            transition: "all 0.4s var(--orbit-ease)",
          }}
        >
          {planet.eyebrow}
        </div>

        {/* Planet Name — Display XL with staggered letter reveal */}
        <h1
          className="text-display-xl font-display"
          style={{
            color: "var(--text-100)",
            marginBottom: "20px",
            letterSpacing: "0.15em",
            height: "clamp(3.5rem, 6vw, 6rem)"
          }}
        >
          {textTrigger && planet.name.toUpperCase().split("").map((char, i) => (
            <span
              key={`${planet.id}-${i}`}
              style={{
                display: "inline-block",
                opacity: 0,
                transform: "translateY(20px)",
                animation: `fade-rise 0.6s var(--orbit-ease) ${i * 40}ms forwards`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Short Planet Bio */}
        <p
          className="text-body-m"
          style={{
            color: "var(--text-500)",
            maxWidth: "520px",
            margin: "0 auto 40px",
            opacity: textTrigger ? 1 : 0,
            transform: textTrigger ? "translateY(0)" : "translateY(5px)",
            transition: "all 0.6s var(--orbit-ease) 0.2s",
            height: "48px"
          }}
        >
          {planet.description}
        </p>

        {/* Stat Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(24px, 4vw, 56px)",
            flexWrap: "wrap",
            marginBottom: "64px",
            opacity: textTrigger ? 1 : 0,
            transform: textTrigger ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s var(--orbit-ease) 0.3s",
          }}
        >
          {planet.stats.map((stat) => (
            <StatValue
              key={`${planet.id}-${stat.label}`}
              label={stat.label}
              value={stat.value}
              numericValue={stat.numericValue}
              suffix={stat.suffix}
              animated={!!stat.numericValue}
            />
          ))}
        </div>

        {/* Planet Image & Technical Readout */}
        <div
          style={{
            position: "relative",
            width: "clamp(280px, 42vw, 440px)",
            height: "clamp(280px, 42vw, 440px)",
            margin: "0 auto",
            opacity: textTrigger ? 1 : 0,
            filter: textTrigger ? "blur(0px) brightness(1)" : "blur(25px) brightness(0.2)",
            transition: "all 1s var(--orbit-ease) 0.1s",
          }}
        >
          {/* Animated Orbit Rings */}
          <div
            className="hero-pulsing-ring"
            style={{
              position: "absolute",
              inset: "-15%",
              borderColor: "rgba(139, 124, 255, 0.2)",
            }}
          />
          <div
            className="hero-pulsing-ring-inner"
            style={{
              position: "absolute",
              inset: "-25%",
              borderColor: "rgba(56, 217, 201, 0.15)",
            }}
          />

          {/* Compass / Crosshair Lines */}
          <div className="absolute top-1/2 left-[-35%] right-[-35%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(36,43,71,0.4)] to-transparent pointer-events-none" />
          <div className="absolute left-1/2 top-[-35%] bottom-[-35%] w-[1px] bg-gradient-to-b from-transparent via-[rgba(36,43,71,0.4)] to-transparent pointer-events-none" />

          {/* Atmosphere glow */}
          <div
            style={{
              position: "absolute",
              inset: "-10%",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${planet.glowColor} 30%, rgba(56, 217, 201, 0.08) 60%, transparent 75%)`,
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />

          {/* Crosshair markers */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--signal-400)] opacity-70" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--signal-400)] opacity-70" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--signal-400)] opacity-70" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--signal-400)] opacity-70" />

          {/* Planet image blended seamlessly and with fully removed background */}
          <TransparentPlanet
            src={planet.image}
            alt={`Planet ${planet.name} — ${planet.climate} world`}
            style={{ 
              width: "100%",
              height: "100%",
              objectFit: "contain",
              mixBlendMode: "screen",
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: loaded ? 0.5 : 0,
          transition: "opacity 1s var(--orbit-ease) 1.2s",
        }}
      >
        <span className="text-mono-small" style={{ color: "var(--text-500)" }}>
          Scroll to Explore
        </span>
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, var(--text-500), transparent)",
          }}
        />
      </div>
    </section>
  );
}
