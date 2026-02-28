import Aurora from "@/components/Aurora";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const texts = ["À venir", "O tont emberr", "Coming soon"];

export const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-[45vh] md:h-full"
        style={{
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
        }}
      >
        <Aurora
          colorStops={["#f5c92c", "#8cbe4f", "#277956", "#2d9185"]}
          amplitude={1}
          blend={0.5}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={texts[index]}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              fontSize: "clamp(2rem, 8vw, 6rem)",
              fontWeight: 700,
              color: "white",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Hobo', sans-serif",
            }}
          >
            {texts[index]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
};
