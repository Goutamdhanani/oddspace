"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useCountUp — animates a number from 0 → target once on viewport entry.
 * Respects prefers-reduced-motion.
 *
 * @param {number} target – the final number to reach
 * @param {number} duration – animation duration in ms (default 1500)
 * @param {string} suffix – optional suffix string (e.g. " km", "°", "h")
 * @param {string} prefix – optional prefix string
 * @param {boolean} useCommas – format with commas
 * @returns {{ ref, displayValue, isComplete }}
 */
export function useCountUp(target, { duration = 1500, suffix = "", prefix = "", useCommas = true } = {}) {
  const [displayValue, setDisplayValue] = useState(prefix + "0" + suffix);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const format = useCallback(
    (n) => {
      const rounded = Math.round(n);
      const formatted = useCommas ? rounded.toLocaleString("en-US") : String(rounded);
      return prefix + formatted + suffix;
    },
    [prefix, suffix, useCommas]
  );

  useEffect(() => {
    hasAnimated.current = false;
  }, [target]);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayValue(format(target));
      setIsComplete(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = null;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            setDisplayValue(format(current));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(format(target));
              setIsComplete(true);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, format]);

  return { ref, displayValue, isComplete };
}

