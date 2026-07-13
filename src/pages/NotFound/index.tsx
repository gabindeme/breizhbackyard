import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, TreePine, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

export const NotFound = () => {
  const { t } = useTranslation();
  
  const runnerRef = useRef<HTMLDivElement>(null);
  const obstacleRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const gameState = useRef({
    isPlaying: false,
    isGameOver: false,
    score: 0,
    runnerY: 0,
    velocity: 0,
    obstacleX: 600,
    speed: 6,
  });

  const jump = useCallback(() => {
    const state = gameState.current;
    if (state.isPlaying && !state.isGameOver && state.runnerY === 0) {
      state.velocity = 16; // Stronger jump
    } else if (!state.isPlaying || state.isGameOver) {
      startGame();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  const gameLoop = useCallback(() => {
    const state = gameState.current;
    if (!state.isPlaying || state.isGameOver) return;

    // Physics
    state.velocity -= 1.2; // Stronger gravity for snappier jump
    state.runnerY += state.velocity;
    
    if (state.runnerY <= 0) {
      state.runnerY = 0;
      state.velocity = 0;
    }

    // Obstacle movement
    state.obstacleX -= state.speed;
    const containerWidth = containerRef.current?.clientWidth || 600;

    if (state.obstacleX < -50) {
      state.obstacleX = containerWidth + Math.random() * 200;
      state.speed += 0.2; // Increase speed over time
    }

    // Score
    state.score += 0.1;

    // Collision detection
    // Runner visual bounds: X from 50 to 98. 
    // Hitbox (fairer): Left 65, Right 85.
    const runnerLeft = 65;
    const runnerRight = 85;
    
    // Obstacle bounds (Tree is 32px wide)
    const obstacleLeft = state.obstacleX + 8; // Shrink hitbox slightly
    const obstacleRight = state.obstacleX + 24;

    const isXCollision = obstacleLeft < runnerRight && obstacleRight > runnerLeft;
    const isYCollision = state.runnerY < 35; // Tree is 48px, but top is thin

    if (isXCollision && isYCollision) {
      // Game Over
      state.isGameOver = true;
      state.isPlaying = false;
      setIsGameOver(true);
      setIsPlaying(false);
      setFinalScore(Math.floor(state.score));
    }

    // Render DOM
    if (runnerRef.current) {
      runnerRef.current.style.transform = `translateY(${-state.runnerY}px)`;
    }
    if (obstacleRef.current) {
      obstacleRef.current.style.transform = `translateX(${state.obstacleX}px)`;
    }
    if (scoreRef.current) {
      scoreRef.current.innerText = `${t("notfound.score", "Score")}: ${Math.floor(state.score)}`;
    }

    if (!state.isGameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  }, []);

  const startGame = () => {
    const containerWidth = containerRef.current?.clientWidth || 600;
    gameState.current = {
      isPlaying: true,
      isGameOver: false,
      score: 0,
      runnerY: 0,
      velocity: 0,
      obstacleX: containerWidth,
      speed: 6,
    };
    setIsPlaying(true);
    setIsGameOver(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div style={{ background: "#EFEFEF", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header avec la wave */}
      <div
        className="page-header-inner"
        style={{
          background: "linear-gradient(135deg, #277956 0%, #1a4d36 60%, #164030 100%)",
          paddingTop: "8rem",
          paddingBottom: "5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 80% 50%, rgba(245,201,44,0.08) 0%, transparent 60%)`,
          }}
        />
        <div className="page-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: "'Hobo', sans-serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            {t("notfound.title", "404 - Hors piste")}
          </motion.h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            {t("notfound.desc", "Il semble que vous ayez quitté la boucle. Aidez le coureur à sauter par-dessus les sapins en attendant de retrouver votre chemin !")}
          </p>
        </div>
        {/* Wave du bas du header (transition vers EFEFEF) */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", fill: "#EFEFEF" }}>
            <path d="M0,20 C360,60 720,0 1080,40 C1260,55 1380,25 1440,20 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </div>

      {/* Zone de jeu (Corps clair) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "4rem 1rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: "600px" }}>
          {/* Game Container */}
          <div
            ref={containerRef}
            onClick={jump}
            style={{
              position: "relative",
              width: "100%",
              height: "250px",
              margin: "0 auto 2rem",
              borderBottom: "4px solid #4a6b56",
              background: "#fff",
              borderRadius: "1rem 1rem 0 0",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(39,121,86,0.08)"
            }}
          >
            {/* Score Display */}
            <div
              ref={scoreRef}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1.5rem",
                fontFamily: "monospace",
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#4a6b56",
              }}
            >
              {t("notfound.score", "Score")}: 0
            </div>

            {/* Clouds decoration */}
            <div style={{ position: "absolute", top: "20px", left: "20%", opacity: 0.1 }}><TreePine size={32} color="#277956" /></div>
            <div style={{ position: "absolute", top: "40px", right: "20%", opacity: 0.1 }}><TreePine size={24} color="#277956" /></div>

            {/* Runner */}
            <div
              ref={runnerRef}
              style={{
                position: "absolute",
                bottom: "0",
                left: "50px",
                width: "48px",
                height: "48px",
                zIndex: 10,
              }}
            >
              <img 
                src="/runner.svg" 
                alt="Runner" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                }} 
              />
            </div>

            {/* Obstacle (Tree) */}
            <div
              ref={obstacleRef}
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "32px",
                height: "48px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <TreePine size={48} color="#277956" />
            </div>

            {/* Overlays */}
            {!isPlaying && !isGameOver && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.7)" }}>
                <button onClick={startGame} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem" }}>
                  <Play size={18} /> {t("notfound.btn_play", "Jouer")}
                </button>
              </div>
            )}

            {isGameOver && (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.85)" }}>
                <div style={{ color: "#d9423e", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "0.5rem" }}>{t("notfound.game_over", "Game Over!")}</div>
                <div style={{ color: "#4a6b56", marginBottom: "1rem" }}>{t("notfound.final_score", "Score final")}: {finalScore}</div>
                <button onClick={startGame} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem" }}>
                  <RotateCcw size={16} /> {t("notfound.btn_replay", "Rejouer")}
                </button>
              </div>
            )}
          </div>

          <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "2rem" }}>
            {t("notfound.controls_help", "Appuyez sur Espace, Flèche Haut ou touchez l'écran pour sauter.")}
          </p>

          <Link to="/" className="btn-primary" style={{ display: "inline-flex", padding: "0.75rem 1.5rem" }}>
            <ArrowLeft size={18} />
            {t("notfound.btn_home", "Retour au camp de base")}
          </Link>
        </div>
      </div>
    </div>
  );
};
