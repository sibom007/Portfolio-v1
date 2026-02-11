"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";

/* ================= TYPES ================= */

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
}

/* ================= HOOK ================= */

function useElementWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      if (ref.current) setWidth(ref.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ref]);

  return width;
}

/* ================= COMPONENT ================= */

export default function ScrollVelocity({
  scrollContainerRef,
  texts,
  velocity = 80,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
}: ScrollVelocityProps) {
  function VelocityText({ children, baseVelocity }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef
      ? { container: scrollContainerRef }
      : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);

    const smoothVelocity = useSpring(scrollVelocity, {
      damping,
      stiffness,
    });

    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping.input,
      velocityMapping.output,
      { clamp: false },
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    const x = useTransform(baseX, (v) =>
      copyWidth
        ? `${(((v % copyWidth) + copyWidth) % copyWidth) - copyWidth}px`
        : "0px",
    );

    const direction = useRef(1);

    useAnimationFrame((_, delta) => {
      let move = direction.current * baseVelocity * (delta / 1000);
      direction.current = velocityFactor.get() < 0 ? -1 : 1;
      move += direction.current * move * velocityFactor.get();
      baseX.set(baseX.get() + move);
    });

    return (
      <div className="relative overflow-hidden">
        <motion.div className="flex whitespace-nowrap" style={{ x }}>
          {Array.from({ length: numCopies }).map((_, i) => (
            <span
              key={i}
              ref={i === 0 ? copyRef : null}
              className={`flex items-center gap-3 shrink-0 ${className}`}>
              {children}
            </span>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((item, i) => (
        <VelocityText key={i} baseVelocity={i % 2 ? -velocity : velocity}>
          {item}
        </VelocityText>
      ))}
    </section>
  );
}
