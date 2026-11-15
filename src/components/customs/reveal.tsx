import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface Offset {
  /** Start offset in px (the element slides from there). */
  x?: number;
  y?: number;
  /** Start scale (1 = none). */
  scale?: number;
  /** Seconds. */
  delay?: number;
  duration?: number;
}

/**
 * Style for an element with className "bbu-enter" (fade and slide) or "bbu-fade" (fade only):
 * a CSS animation that plays from the first paint, so pre-rendered content never waits for
 * JavaScript to become visible (which is what delayed the largest paint on every page).
 */
export const enter = ({ x = 0, y = 0, scale = 1, delay = 0, duration = 0.6 }: Offset = {}) =>
  ({
    "--enter-x": `${x}px`,
    "--enter-y": `${y}px`,
    "--enter-scale": scale,
    "--enter-delay": `${delay}s`,
    "--enter-duration": `${duration}s`,
  }) as CSSProperties;

interface RevealProps extends Offset {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

/**
 * Fades and slides its content in when it scrolls into view.
 * The content is visible in the pre-rendered HTML and on the first render; only blocks that start
 * below the fold are hidden after hydration, then revealed. Blocks already on screen don't animate,
 * and nothing animates when the visitor asks for reduced motion.
 */
export const Reveal = ({ children, className, style, id, x = 0, y = 0, scale = 1, delay = 0, duration = 0.6 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) return;

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const vars = {
    "--reveal-x": `${x}px`,
    "--reveal-y": `${y}px`,
    "--reveal-scale": scale,
    "--reveal-delay": `${delay}s`,
    "--reveal-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      data-reveal={state === "static" ? undefined : state}
      // Once shown, drop the attribute so the element's own transitions (card hovers) apply again.
      onTransitionEnd={(e) => e.target === e.currentTarget && state === "shown" && setState("static")}
      style={{ ...vars, ...style }}
    >
      {children}
    </div>
  );
};
