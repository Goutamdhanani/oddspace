export type PlanetTelemetry = {
  name: string;
  galaxy: string;
  diameterKm: number;
  dayLengthHours: number;
  temperatureC: number;
  climate: string;
  orbitalSequence: number;
  imagePath: string;
  leadAccent: "flare" | "nebula";
};

export const planets: PlanetTelemetry[] = [
  {
    name: "Orionis",
    galaxy: "Andromeda-IV",
    diameterKm: 43210,
    dayLengthHours: 19,
    temperatureC: -12,
    climate: "Icy Highlands",
    orbitalSequence: 1,
    imagePath: "/planets/orionis.svg",
    leadAccent: "nebula",
  },
  {
    name: "Lumenara",
    galaxy: "Andromeda-IV",
    diameterKm: 56400,
    dayLengthHours: 26,
    temperatureC: 38,
    climate: "Ion Storm Belt",
    orbitalSequence: 2,
    imagePath: "/planets/lumenara.svg",
    leadAccent: "nebula",
  },
  {
    name: "Etheron",
    galaxy: "Andromeda-IV",
    diameterKm: 59820,
    dayLengthHours: 31,
    temperatureC: 14,
    climate: "Temperate Oceanic",
    orbitalSequence: 3,
    imagePath: "/planets/etheron.svg",
    leadAccent: "flare",
  },
];
