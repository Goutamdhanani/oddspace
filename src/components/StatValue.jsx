"use client";

/**
 * StatValue — vertical label-above-value telemetry readout.
 * Uses count-up animation when animated=true.
 */
import { useCountUp } from "@/hooks/useCountUp";

export default function StatValue({ label, value, numericValue, suffix = "", prefix = "", animated = true }) {
  const { ref, displayValue, isComplete } = useCountUp(numericValue ?? 0, {
    suffix,
    prefix,
    duration: 1800,
    useCommas: true,
  });

  const showAnimated = animated && numericValue != null;

  return (
    <div ref={showAnimated ? ref : undefined} className="flex flex-col gap-1">
      <span className="text-label" style={{ color: "var(--text-500)" }}>
        {label}
      </span>
      <span className="text-mono-data" style={{ color: "var(--text-100)" }}>
        {showAnimated ? displayValue : value}
      </span>
    </div>
  );
}
