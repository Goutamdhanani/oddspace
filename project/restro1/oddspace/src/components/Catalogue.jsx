"use client";

import PlanetCard from "./PlanetCard";

const PLANETS = [
  {
    name: "Orionis",
    galaxy: "Pegasus-VII",
    diameter: 129700,
    dayLength: 4,
    temp: "1,200°",
    climate: "Volcanic",
    image: "/planets/orionis.png",
    glowColor: "#FF8A3D", // flare
  },
  {
    name: "Lumenara",
    galaxy: "Cygnus-III",
    diameter: 51240,
    dayLength: 56,
    temp: "38°",
    climate: "Tropical",
    image: "/planets/lumenara.png",
    glowColor: "#8B7CFF", // nebula
  },
  {
    name: "Etheron",
    galaxy: "Andromeda-IV",
    diameter: 56400,
    dayLength: 26,
    temp: "-20°",
    climate: "Polar",
    image: "/planets/etheron.png",
    glowColor: "#38D9C9", // signal
  },
];

export default function Catalogue() {
  return (
    <section
      id="catalogue"
      style={{
        position: "relative",
        padding: "0 5vw",
        paddingTop: "clamp(64px, 8vw, 128px)",
        paddingBottom: "clamp(64px, 8vw, 128px)",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
        <div
          className="text-mono-small"
          style={{
            color: "var(--signal-400)",
            marginBottom: "16px",
          }}
        >
          Transmission Data · Orbital Sequence
        </div>
        <h2
          className="text-display-l"
          style={{
            color: "var(--text-100)",
            marginBottom: "16px",
          }}
        >
          Planetary Catalogue
        </h2>
        <p
          className="text-body-l"
          style={{
            color: "var(--text-500)",
            maxWidth: "560px",
          }}
        >
          Three worlds charted by distance from their host star. Each signal
          carries surface telemetry, atmospheric composition, and orbital
          parameters decoded in real time.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "24px",
        }}
      >
        {PLANETS.map((planet, index) => (
          <PlanetCard key={planet.name} planet={planet} index={index} />
        ))}
      </div>
    </section>
  );
}
