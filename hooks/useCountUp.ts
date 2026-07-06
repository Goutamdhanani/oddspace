"use client";

import { useEffect, useMemo, useState } from "react";

type UseCountUpOptions = {
  end: number;
  duration?: number;
  start: boolean;
  delay?: number;
  reducedMotion?: boolean;
};

export function useCountUp({
  end,
  duration = 1000,
  start,
  delay = 0,
  reducedMotion = false,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start || reducedMotion) return;

    let frame = 0;
    let rafId = 0;
    let timeoutId = 0;
    const frameDuration = 16;
    const totalFrames = Math.max(1, Math.round(duration / frameDuration));

    const update = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    timeoutId = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(update);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(rafId);
    };
  }, [delay, duration, end, reducedMotion, start]);

  return useMemo(() => {
    if (reducedMotion) return end;
    if (!start) return 0;
    return value;
  }, [end, reducedMotion, start, value]);
}
