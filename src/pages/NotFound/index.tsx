import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Canvas Game Constants ──────────────────────────────────────────
const GRAVITY = 0.65;
const JUMP_FORCE = -12;
const GROUND_Y_OFFSET = 30; // px from bottom of canvas
const RUNNER_W = 28;
const RUNNER_H = 36;
const RUNNER_X = 60;
const INITIAL_SPEED = 4.5;
const MAX_SPEED = 12;
const SPEED_INCREMENT = 0.003;
const MIN_OBSTACLE_GAP = 280;
const MAX_OBSTACLE_GAP = 500;

// ─── Color palette (Breton trail theme) ─────────────────────────────
const C = {
  sky: "#e8f0e4",
  skyDark: "#2c3e34",
  ground: "#8b7355",
  groundDark: "#3d2e1a",
  groundLine: "#6b5a3e",
  groundLineDark: "#2a1f12",
  hillFar: "#c5d4b8",
  hillFarDark: "#2a3d2a",
  hillNear: "#9ab88a",
  hillNearDark: "#1e2e1e",
  treeTrunk: "#5a4230",
  treeFoliage: "#3a6b3a",
  treeFoliageDark: "#1a3a1a",
  runner: "#277956",
  runnerDark: "#45c48a",
  obstacle: "#4a3728",
  obstacleDark: "#7a6a58",
  text: "#3d5a3d",
  textDark: "#a8d4a8",
  dust: "#b8a88a",
  dustDark: "#5a5040",
};

type Obstacle = {
  x: number;
  w: number;
  h: number;
  type: "stump" | "rock" | "double";
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

type BackgroundTree = {
  x: number;
  h: number;
  w: number;
};

// ─── Procedural drawing helpers ─────────────────────────────────────

function drawRunner(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frame: number,
  isJumping: boolean,
  isDark: boolean
) {
  const c = isDark ? C.runnerDark : C.runner;
  ctx.fillStyle = c;
  ctx.strokeStyle = c;
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";

  // Head
  ctx.beginPath();
  ctx.arc(x + RUNNER_W / 2, y + 6, 6, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.beginPath();
  ctx.moveTo(x + RUNNER_W / 2, y + 12);
  ctx.lineTo(x + RUNNER_W / 2, y + 24);
  ctx.stroke();

  // Arms — slight running motion
  const armSwing = isJumping ? 0.4 : Math.sin(frame * 0.3) * 0.5;
  ctx.beginPath();
  ctx.moveTo(x + RUNNER_W / 2, y + 16);
  ctx.lineTo(x + RUNNER_W / 2 - 8, y + 14 + armSwing * 6);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + RUNNER_W / 2, y + 16);
  ctx.lineTo(x + RUNNER_W / 2 + 8, y + 14 - armSwing * 6);
  ctx.stroke();

  // Legs — running cycle
  if (isJumping) {
    // Tucked legs in air
    ctx.beginPath();
    ctx.moveTo(x + RUNNER_W / 2, y + 24);
    ctx.lineTo(x + RUNNER_W / 2 - 5, y + 32);
    ctx.lineTo(x + RUNNER_W / 2 - 2, y + 35);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + RUNNER_W / 2, y + 24);
    ctx.lineTo(x + RUNNER_W / 2 + 5, y + 32);
    ctx.lineTo(x + RUNNER_W / 2 + 2, y + 35);
    ctx.stroke();
  } else {
    const legPhase = frame * 0.3;
    const leg1 = Math.sin(legPhase) * 7;
    const leg2 = Math.sin(legPhase + Math.PI) * 7;

    ctx.beginPath();
    ctx.moveTo(x + RUNNER_W / 2, y + 24);
    ctx.lineTo(x + RUNNER_W / 2 + leg1, y + 36);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + RUNNER_W / 2, y + 24);
    ctx.lineTo(x + RUNNER_W / 2 + leg2, y + 36);
    ctx.stroke();
  }
}

function drawStump(
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  w: number,
  h: number,
  isDark: boolean
) {
  const c = isDark ? C.obstacleDark : C.obstacle;
  ctx.fillStyle = c;
  // Main trunk
  const radius = 3;
  ctx.beginPath();
  ctx.moveTo(x + radius, groundY - h);
  ctx.lineTo(x + w - radius, groundY - h);
  ctx.quadraticCurveTo(x + w, groundY - h, x + w, groundY - h + radius);
  ctx.lineTo(x + w, groundY);
  ctx.lineTo(x, groundY);
  ctx.lineTo(x, groundY - h + radius);
  ctx.quadraticCurveTo(x, groundY - h, x + radius, groundY - h);
  ctx.fill();

  // Bark lines
  ctx.strokeStyle = isDark ? "#9a8a78" : "#3a2a18";
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.3;
  for (let i = 1; i < 3; i++) {
    const ly = groundY - h + (h / 3) * i;
    ctx.beginPath();
    ctx.moveTo(x + 2, ly);
    ctx.lineTo(x + w - 2, ly);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawRock(
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  w: number,
  h: number,
  isDark: boolean
) {
  ctx.fillStyle = isDark ? "#6a6058" : "#7a6e60";
  ctx.beginPath();
  ctx.moveTo(x + 2, groundY);
  ctx.lineTo(x, groundY - h * 0.6);
  ctx.lineTo(x + w * 0.3, groundY - h);
  ctx.lineTo(x + w * 0.7, groundY - h * 0.85);
  ctx.lineTo(x + w, groundY - h * 0.5);
  ctx.lineTo(x + w - 1, groundY);
  ctx.closePath();
  ctx.fill();

  // Highlight
  ctx.fillStyle = isDark ? "#7a7068" : "#8a7e70";
  ctx.beginPath();
  ctx.moveTo(x + w * 0.3, groundY - h);
  ctx.lineTo(x + w * 0.5, groundY - h * 0.8);
  ctx.lineTo(x + w * 0.15, groundY - h * 0.5);
  ctx.lineTo(x, groundY - h * 0.6);
  ctx.closePath();
  ctx.fill();
}

// ─── Component ──────────────────────────────────────────────────────

export const NotFound = () => {
  const { t } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem("bbyard_404_hi") || "0", 10);
    } catch {
      return 0;
    }
  });

  // Game state ref — mutable state for the game loop (never triggers re-render)
  const gs = useRef({
    playing: false,
    gameOver: false,
    score: 0,
    speed: INITIAL_SPEED,
    // Runner
    runnerY: 0, // 0 = on ground
    vy: 0,
    frame: 0,
    // Obstacles
    obstacles: [] as Obstacle[],
    nextObstacleIn: 300,
    // Particles
    particles: [] as Particle[],
    // Background
    bgTrees: [] as BackgroundTree[],
    hillOffset: 0,
    groundOffset: 0,
    // Effects
    shake: 0,
    isDark: false,
  });

  const spawnObstacle = (canvasW: number) => {
    const types: Obstacle["type"][] = ["stump", "rock", "double"];
    const type = types[Math.floor(Math.random() * types.length)];
    let w: number, h: number;
    switch (type) {
      case "stump":
        w = 14 + Math.random() * 6;
        h = 24 + Math.random() * 12;
        break;
      case "rock":
        w = 20 + Math.random() * 10;
        h = 16 + Math.random() * 8;
        break;
      case "double":
        w = 30 + Math.random() * 8;
        h = 22 + Math.random() * 14;
        break;
    }
    gs.current.obstacles.push({ x: canvasW + 10, w, h, type });
    gs.current.nextObstacleIn =
      MIN_OBSTACLE_GAP + Math.random() * (MAX_OBSTACLE_GAP - MIN_OBSTACLE_GAP);
  };

  const spawnDust = (x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      gs.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 2 - 0.5,
        life: 20 + Math.random() * 15,
        maxLife: 35,
        size: 2 + Math.random() * 3,
      });
    }
  };

  const initBgTrees = (canvasW: number) => {
    gs.current.bgTrees = [];
    for (let i = 0; i < 8; i++) {
      gs.current.bgTrees.push({
        x: Math.random() * canvasW,
        h: 20 + Math.random() * 30,
        w: 8 + Math.random() * 12,
      });
    }
  };

  // ─── Main game loop (canvas) ────────────────────────────────────
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = gs.current;
    if (!s.playing) return;

    const W = parseFloat(canvas.dataset.logicW || "600");
    const H = parseFloat(canvas.dataset.logicH || "200");
    const groundY = H - GROUND_Y_OFFSET;

    // ── Update ──
    s.frame++;
    s.score += s.speed * 0.08;
    s.speed = Math.min(MAX_SPEED, s.speed + SPEED_INCREMENT);

    // Day/night cycle every 500 points
    s.isDark = Math.floor(s.score / 500) % 2 === 1;

    // Runner physics
    s.vy += GRAVITY;
    s.runnerY += s.vy;
    if (s.runnerY >= 0) {
      s.runnerY = 0;
      s.vy = 0;
    }

    // Ground scroll
    s.groundOffset = (s.groundOffset + s.speed) % 24;
    // Don't wrap hillOffset with % W — the sin functions aren't periodic
    // over W, so wrapping causes a visible jump. Just let it accumulate.
    s.hillOffset += s.speed * 0.2;

    // Move background trees
    for (const tree of s.bgTrees) {
      tree.x -= s.speed * 0.3;
      if (tree.x < -20) {
        tree.x = W + Math.random() * 60;
        tree.h = 20 + Math.random() * 30;
        tree.w = 8 + Math.random() * 12;
      }
    }

    // Move obstacles
    for (let i = s.obstacles.length - 1; i >= 0; i--) {
      s.obstacles[i].x -= s.speed;
      if (s.obstacles[i].x < -50) {
        s.obstacles.splice(i, 1);
      }
    }

    // Spawn obstacles
    s.nextObstacleIn -= s.speed;
    if (s.nextObstacleIn <= 0) {
      spawnObstacle(W);
    }

    // Particles update
    for (let i = s.particles.length - 1; i >= 0; i--) {
      const p = s.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.life--;
      if (p.life <= 0) s.particles.splice(i, 1);
    }

    // Running dust
    if (s.runnerY === 0 && s.frame % 6 === 0) {
      spawnDust(RUNNER_X + RUNNER_W / 2, groundY, 1);
    }

    // Collision detection
    const rx = RUNNER_X + 4;
    const rw = RUNNER_W - 8;
    const ry = groundY - RUNNER_H + s.runnerY;
    const rh = RUNNER_H - 2;

    for (const obs of s.obstacles) {
      const ox = obs.x + 2;
      const ow = obs.w - 4;
      const oy = groundY - obs.h;
      const oh = obs.h;

      if (rx < ox + ow && rx + rw > ox && ry < oy + oh && ry + rh > oy) {
        // Collision!
        s.gameOver = true;
        s.playing = false;
        s.shake = 8;
        // Explosion particles
        spawnDust(RUNNER_X + RUNNER_W / 2, groundY - RUNNER_H / 2, 12);

        const score = Math.floor(s.score);
        setFinalScore(score);
        setIsGameOver(true);
        setIsPlaying(false);
        if (score > highScore) {
          setHighScore(score);
          try {
            localStorage.setItem("bbyard_404_hi", String(score));
          } catch {
            /* noop */
          }
        }
        // Draw one more frame with shake, then stop
        drawFrame(ctx, W, H, groundY, s, true);
        return;
      }
    }

    // Shake decay
    if (s.shake > 0) s.shake *= 0.8;

    // ── Draw ──
    drawFrame(ctx, W, H, groundY, s, false);

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [highScore]);

  function drawFrame(
    ctx: CanvasRenderingContext2D,
    W: number,
    H: number,
    groundY: number,
    s: (typeof gs)["current"],
    isFinalFrame: boolean
  ) {
    const dark = s.isDark;

    ctx.save();
    // Screen shake
    if (s.shake > 0.5) {
      const shakeX = (Math.random() - 0.5) * s.shake;
      const shakeY = (Math.random() - 0.5) * s.shake;
      ctx.translate(shakeX, shakeY);
    }

    // Sky
    ctx.fillStyle = dark ? C.skyDark : C.sky;
    ctx.fillRect(0, 0, W, H);

    // Far hills (parallax)
    ctx.fillStyle = dark ? C.hillFarDark : C.hillFar;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    for (let x = 0; x <= W; x += 2) {
      const y =
        groundY -
        20 -
        Math.sin((x + s.hillOffset * 0.5) * 0.008) * 18 -
        Math.sin((x + s.hillOffset * 0.3) * 0.015) * 10;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, groundY);
    ctx.closePath();
    ctx.fill();

    // Near hills
    ctx.fillStyle = dark ? C.hillNearDark : C.hillNear;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    for (let x = 0; x <= W; x += 2) {
      const y =
        groundY -
        10 -
        Math.sin((x + s.hillOffset) * 0.012) * 14 -
        Math.cos((x + s.hillOffset * 0.7) * 0.02) * 6;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, groundY);
    ctx.closePath();
    ctx.fill();

    // Ground
    ctx.fillStyle = dark ? C.groundDark : C.ground;
    ctx.fillRect(0, groundY, W, H - groundY);

    // Ground texture lines
    ctx.strokeStyle = dark ? C.groundLineDark : C.groundLine;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    for (let x = -s.groundOffset; x < W; x += 24) {
      const len = 4 + (((x * 7) % 11) * 0.8);
      ctx.beginPath();
      ctx.moveTo(x, groundY + 6);
      ctx.lineTo(x + len, groundY + 6);
      ctx.stroke();
    }
    for (let x = 12 - s.groundOffset; x < W; x += 24) {
      const len = 2 + (((x * 13) % 7) * 0.6);
      ctx.beginPath();
      ctx.moveTo(x, groundY + 14);
      ctx.lineTo(x + len, groundY + 14);
      ctx.stroke();
    }
    for (let x = 6 - s.groundOffset; x < W; x += 24) {
      const len = 3 + (((x * 3) % 9) * 0.5);
      ctx.beginPath();
      ctx.moveTo(x, groundY + 22);
      ctx.lineTo(x + len, groundY + 22);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Ground top line
    ctx.strokeStyle = dark ? "#4a3a28" : "#6a5a40";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(W, groundY);
    ctx.stroke();

    // Background trees (silhouettes) — drawn after ground so trunks overlap naturally
    for (const tree of s.bgTrees) {
      const tx = tree.x;
      const treeBase = groundY; // sits exactly on the ground line
      ctx.fillStyle = dark ? C.treeFoliageDark : C.treeFoliage;
      ctx.globalAlpha = 0.3;
      // Triangle tree rooted at the ground
      ctx.beginPath();
      ctx.moveTo(tx, treeBase + 2); // slight overlap into ground
      ctx.lineTo(tx + tree.w / 2, treeBase - tree.h);
      ctx.lineTo(tx + tree.w, treeBase + 2);
      ctx.closePath();
      ctx.fill();
      // Small trunk rectangle
      ctx.globalAlpha = 0.2;
      const trunkW = tree.w * 0.25;
      ctx.fillRect(tx + tree.w / 2 - trunkW / 2, treeBase, trunkW, 4);
      ctx.globalAlpha = 1;
    }

    // Obstacles
    for (const obs of s.obstacles) {
      if (obs.type === "rock") {
        drawRock(ctx, obs.x, groundY, obs.w, obs.h, dark);
      } else if (obs.type === "double") {
        // Two stumps close together
        drawStump(ctx, obs.x, groundY, obs.w * 0.4, obs.h, dark);
        drawStump(
          ctx,
          obs.x + obs.w * 0.55,
          groundY,
          obs.w * 0.45,
          obs.h * 0.8,
          dark
        );
      } else {
        drawStump(ctx, obs.x, groundY, obs.w, obs.h, dark);
      }
    }

    // Particles
    for (const p of s.particles) {
      ctx.globalAlpha = p.life / p.maxLife;
      ctx.fillStyle = dark ? C.dustDark : C.dust;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Runner
    const runnerScreenY = groundY - RUNNER_H + s.runnerY;
    drawRunner(
      ctx,
      RUNNER_X,
      runnerScreenY,
      s.frame,
      s.runnerY < -1,
      dark
    );

    // Score (top right)
    ctx.fillStyle = dark ? C.textDark : C.text;
    ctx.font = "bold 14px 'Courier New', monospace";
    ctx.textAlign = "right";
    const scoreStr = String(Math.floor(s.score)).padStart(5, "0");
    ctx.fillText(scoreStr, W - 16, 24);

    // High score
    const hi = Math.max(
      Math.floor(s.score),
      parseInt(localStorage.getItem("bbyard_404_hi") || "0", 10)
    );
    if (hi > 0) {
      ctx.globalAlpha = 0.5;
      ctx.fillText(`HI ${String(hi).padStart(5, "0")}`, W - 80, 24);
      ctx.globalAlpha = 1;
    }

    ctx.restore();

    // If final frame, add a red flash
    if (isFinalFrame) {
      ctx.fillStyle = "rgba(200, 50, 40, 0.12)";
      ctx.fillRect(0, 0, W, H);
    }
  }

  // ─── Controls ─────────────────────────────────────────────────────
  const jump = useCallback(() => {
    const s = gs.current;
    if (s.playing && !s.gameOver && s.runnerY === 0) {
      s.vy = JUMP_FORCE;
      const canvas = canvasRef.current;
      if (canvas) {
        const logicH = parseFloat(canvas.dataset.logicH || "200");
        const groundY = logicH - GROUND_Y_OFFSET;
        spawnDust(RUNNER_X + RUNNER_W / 2, groundY, 4);
      }
    } else if (!s.playing || s.gameOver) {
      startGame();
    }
  }, []);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    gs.current = {
      playing: true,
      gameOver: false,
      score: 0,
      speed: INITIAL_SPEED,
      runnerY: 0,
      vy: 0,
      frame: 0,
      obstacles: [],
      nextObstacleIn: 300,
      particles: [],
      bgTrees: gs.current.bgTrees,
      hillOffset: 0,
      groundOffset: 0,
      shake: 0,
      isDark: false,
    };

    const logicW = parseFloat(canvas.dataset.logicW || "600");
    initBgTrees(logicW);
    setIsPlaying(true);
    setIsGameOver(false);

    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  // Keyboard controls
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

  // Resize canvas to container
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = 200 * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = "200px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      // Reset internal dimensions for game logic
      canvas.dataset.logicW = String(rect.width);
      canvas.dataset.logicH = "200";
      // Re-init bg trees on resize
      initBgTrees(rect.width);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Draw idle frame
  useEffect(() => {
    if (isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const logicW = parseFloat(canvas.dataset.logicW || "600");
    const logicH = parseFloat(canvas.dataset.logicH || "200");
    const groundY = logicH - GROUND_Y_OFFSET;

    // Draw a still scene
    ctx.fillStyle = C.sky;
    ctx.fillRect(0, 0, logicW, logicH);

    // Hills
    ctx.fillStyle = C.hillFar;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    for (let x = 0; x <= logicW; x += 2) {
      ctx.lineTo(
        x,
        groundY - 20 - Math.sin(x * 0.008) * 18 - Math.sin(x * 0.015) * 10
      );
    }
    ctx.lineTo(logicW, groundY);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = C.hillNear;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    for (let x = 0; x <= logicW; x += 2) {
      ctx.lineTo(
        x,
        groundY - 10 - Math.sin(x * 0.012) * 14 - Math.cos(x * 0.02) * 6
      );
    }
    ctx.lineTo(logicW, groundY);
    ctx.closePath();
    ctx.fill();

    // Ground
    ctx.fillStyle = C.ground;
    ctx.fillRect(0, groundY, logicW, logicH - groundY);
    ctx.strokeStyle = "#6a5a40";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(logicW, groundY);
    ctx.stroke();

    // Static runner
    drawRunner(ctx, RUNNER_X, groundY - RUNNER_H, 0, false, false);
  }, [isPlaying]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      style={{
        background: "#EFEFEF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        className="page-header-inner"
        style={{
          background:
            "linear-gradient(135deg, #277956 0%, #1a4d36 60%, #164030 100%)",
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
        <div
          className="page-container"
          style={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
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
            {t("notfound.title", "404 - Hors course")}
          </motion.h1>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1.1rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {t(
              "notfound.desc",
              "Il semble que vous ayez quitté la boucle. Aidez le coureur à sauter par-dessus les sapins en attendant de retrouver votre chemin !"
            )}
          </p>
        </div>
        {/* Wave */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            style={{
              display: "block",
              width: "100%",
              height: "60px",
              fill: "#EFEFEF",
            }}
          >
            <path d="M0,20 C360,60 720,0 1080,40 C1260,55 1380,25 1440,20 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </div>

      {/* Game area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem 1rem 4rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "640px",
            textAlign: "center",
          }}
        >
          {/* Canvas container */}
          <div
            ref={containerRef}
            onClick={jump}
            onTouchStart={(e) => {
              e.preventDefault();
              jump();
            }}
            style={{
              position: "relative",
              width: "100%",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow:
                "0 4px 24px rgba(39,121,86,0.12), 0 1px 3px rgba(0,0,0,0.08)",
              border: "2px solid rgba(39,121,86,0.15)",
              marginBottom: "1.5rem",
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "manipulation",
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                display: "block",
                width: "100%",
                height: "200px",
                imageRendering: "auto",
              }}
            />

            {/* Start overlay */}
            {!isPlaying && !isGameOver && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(232,240,228,0.85)",
                  backdropFilter: "blur(2px)",
                  gap: "0.75rem",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startGame();
                  }}
                  className="btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                  }}
                >
                  <Play size={18} /> {t("notfound.btn_play", "Jouer")}
                </button>
                {highScore > 0 && (
                  <span
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.8rem",
                      color: "#5a7a5a",
                    }}
                  >
                    HI {String(highScore).padStart(5, "0")}
                  </span>
                )}
              </div>
            )}

            {/* Game Over overlay */}
            {isGameOver && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(232,240,228,0.9)",
                  backdropFilter: "blur(2px)",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#c0392b",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t("notfound.game_over", "Game Over!")}
                </div>
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    color: "#4a6b56",
                    fontSize: "1rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {t("notfound.score", "Score")}:{" "}
                  {String(finalScore).padStart(5, "0")}
                </div>
                {finalScore >= highScore && finalScore > 0 && (
                  <div
                    style={{
                      fontFamily: "'Courier New', monospace",
                      color: "#d4a017",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      marginBottom: "0.25rem",
                    }}
                  >
                    ★ NEW BEST ★
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startGame();
                  }}
                  className="btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                  }}
                >
                  <RotateCcw size={16} /> {t("notfound.btn_replay", "Rejouer")}
                </button>
              </div>
            )}
          </div>

          <p
            style={{
              fontSize: "0.82rem",
              color: "#888",
              marginBottom: "2rem",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {t(
              "notfound.controls_help",
              "Appuyez sur Espace, Flèche Haut ou touchez l'écran pour sauter."
            )}
          </p>

          <Link
            to="/"
            className="btn-primary"
            style={{ display: "inline-flex", padding: "0.75rem 1.5rem" }}
          >
            <ArrowLeft size={18} />
            {t("notfound.btn_home", "Retour à l'accueil")}
          </Link>
        </div>
      </div>
    </div>
  );
};
