"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { CornerTickPanel } from "@/components/CornerTickPanel";
import { StatBlock } from "@/components/StatBlock";
import type { PlanetTelemetry } from "@/data/planets";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function TelemetryCard({ planet }: { planet: PlanetTelemetry }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(cardRef);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [sweepActive, setSweepActive] = useState(false);
  const [hasSwept, setHasSwept] = useState(false);

  useEffect(() => {
    if (!sweepActive) return;
    const timeoutId = window.setTimeout(() => setSweepActive(false), 900);
    return () => window.clearTimeout(timeoutId);
  }, [sweepActive]);

  const triggerSweep = () => {
    if (prefersReducedMotion || hasSwept) return;
    setSweepActive(true);
    setHasSwept(true);
  };

  return (
    <div ref={cardRef}>
      <CornerTickPanel className="h-full p-5 md:p-6">
        <p className="mb-4 text-label font-mono text-signal-400">
          SIGNAL LOCKED · GALAXY: {planet.galaxy.toUpperCase()}
        </p>

        <div
          className="orbit-sweep relative mx-auto mb-6 aspect-square max-w-[220px] rounded-full border border-hairline-700"
          data-active={sweepActive}
          onMouseEnter={triggerSweep}
          onFocus={triggerSweep}
        >
          <div
            className={`pointer-events-none absolute inset-0 -z-10 rounded-full ${
              planet.leadAccent === "nebula" ? "bg-nebula-500/20" : "bg-flare-500/20"
            } blur-2xl`}
            aria-hidden
          />
          <Image
            src={planet.imagePath}
            alt={`${planet.name} render`}
            width={320}
            height={320}
            className="h-full w-full object-contain p-5"
          />
        </div>

        <div className="mb-5 flex items-center justify-between border-t border-hairline-700 pt-4">
          <h3 className="text-display-l text-text-100">{planet.name}</h3>
          <p className="text-mono-data text-text-500">#{planet.orbitalSequence}</p>
        </div>

        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          <StatBlock
            label="Diameter"
            value={planet.diameterKm}
            suffix=" km"
            start={inView}
            reducedMotion={prefersReducedMotion}
          />
          <StatBlock
            label="Day Length"
            value={planet.dayLengthHours}
            suffix=" h"
            start={inView}
            reducedMotion={prefersReducedMotion}
          />
          <StatBlock
            label="Surface Temp"
            value={planet.temperatureC}
            suffix="°C"
            start={inView}
            reducedMotion={prefersReducedMotion}
          />
          <div>
            <p className="mb-2 text-label text-text-500">Climate</p>
            <p className="text-mono-data text-text-100">{planet.climate}</p>
          </div>
        </div>
      </CornerTickPanel>
    </div>
  );
}
