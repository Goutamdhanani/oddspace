"use client";

import Image from "next/image";
import { useMemo } from "react";

import { Button } from "@/components/Button";
import { StatBlock } from "@/components/StatBlock";
import type { PlanetTelemetry } from "@/data/planets";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const intro = "Signal locked from the Andromeda-IV stream.";

export function Hero({ planet }: { planet: PlanetTelemetry }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const startStats = true;

  const words = useMemo(() => planet.name.split(" "), [planet.name]);

  return (
    <section id="hero" className="shell-container section-gap pt-32 md:pt-40" data-reduced-motion={prefersReducedMotion}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7">
          <p className="hero-fade text-label font-mono text-signal-400" style={{ ["--delay" as string]: "120ms" }}>
            SIGNAL LOCKED · GALAXY: {planet.galaxy.toUpperCase()}
          </p>
          <h1 className="mt-6 text-display-xl text-text-100">
            {words.map((word, index) => (
              <span
                key={word}
                className="hero-word mr-[0.3em] inline-block"
                style={{ ["--delay" as string]: `${260 + index * 20}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-2xl text-body-l text-text-500">{intro}</p>

          <div className="mt-8 grid grid-cols-2 gap-6 md:mt-10">
            <StatBlock
              label="Diameter"
              value={planet.diameterKm}
              suffix=" km"
              start={startStats}
              delay={prefersReducedMotion ? 0 : 700}
              reducedMotion={prefersReducedMotion}
            />
            <StatBlock
              label="Day Length"
              value={planet.dayLengthHours}
              suffix=" h"
              start={startStats}
              delay={prefersReducedMotion ? 0 : 720}
              reducedMotion={prefersReducedMotion}
            />
            <StatBlock
              label="Surface Temp"
              value={planet.temperatureC}
              suffix="°C"
              start={startStats}
              delay={prefersReducedMotion ? 0 : 740}
              reducedMotion={prefersReducedMotion}
            />
            <div>
              <p className="mb-2 text-label text-text-500">Climate</p>
              <p className="text-mono-data text-text-100">{planet.climate}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#catalogue" variant="primary">
              Explore Catalogue
            </Button>
            <Button href="#mission-log" variant="secondary">
              Mission Log
            </Button>
          </div>
        </div>

        <div className="hero-fade relative md:col-span-5" style={{ ["--delay" as string]: "980ms" }}>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-radial from-flare-500/30 via-space-900 to-space-900" aria-hidden />
          <div className="orbit-sweep mx-auto aspect-square max-w-[420px] rounded-full border border-hairline-700 p-6" data-active="false">
            <Image
              src={planet.imagePath}
              alt={`${planet.name} planet render`}
              width={560}
              height={560}
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
