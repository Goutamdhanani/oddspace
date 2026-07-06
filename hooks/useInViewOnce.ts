"use client";

import { RefObject, useEffect, useState } from "react";

export function useInViewOnce<T extends HTMLElement>(
  ref: RefObject<T | null>,
  rootMargin = "0px 0px -10% 0px"
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isInView, ref, rootMargin]);

  return isInView;
}
