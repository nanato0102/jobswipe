"use client";

import React, { useEffect, useRef, useState } from "react";

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "none";
}

export default function FadeInView({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentDom = domRef.current;
    if (currentDom) {
      observer.observe(currentDom);
    }

    return () => {
      if (currentDom) {
        observer.unobserve(currentDom);
      }
    };
  }, []);

  const translateClass =
    direction === "up"
      ? isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-8 opacity-0"
      : isVisible
      ? "opacity-100"
      : "opacity-0";

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: "800ms",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all ${translateClass} ${className}`}
    >
      {children}
    </div>
  );
}
