"use client";

import { useCountUp } from "@/hooks/useCountUp";

type StatBlockProps = {
  label: string;
  value: number;
  suffix?: string;
  start: boolean;
  delay?: number;
  reducedMotion: boolean;
};

export function StatBlock({
  label,
  value,
  suffix = "",
  start,
  delay = 0,
  reducedMotion,
}: StatBlockProps) {
  const countedValue = useCountUp({
    end: Math.abs(value),
    start,
    delay,
    reducedMotion,
  });
  const displayValue = `${value < 0 ? "-" : ""}${countedValue.toLocaleString()}${suffix}`;

  return (
    <div>
      <p className="mb-2 text-label text-text-500">{label}</p>
      <p className="text-mono-data text-text-100">{displayValue}</p>
    </div>
  );
}
