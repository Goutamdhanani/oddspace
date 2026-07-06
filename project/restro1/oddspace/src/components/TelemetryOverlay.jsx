"use client";

import { useEffect, useState, useRef } from "react";

export default function TelemetryOverlay() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timestamp, setTimestamp] = useState("");
  const [coords, setCoords] = useState({ lat: "45.09.12 N", lng: "120.33.54 W" });
  const [glitchActive, setGlitchActive] = useState(true);
  
  // Custom cursor states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. Scroll progress
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 2. Telemetry tracking mouse coordinates
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Determine if cursor is hovering over interactive elements
      const target = e.target;
      const isClickable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest(".planet-card") || 
        target.closest("button") || 
        target.closest("a");
      setIsHoveringClickable(!!isClickable);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Lerp the custom cursor for weightiness
    let animationFrameId;
    const lerpCursor = () => {
      setCursorPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(lerpCursor);
    };
    animationFrameId = requestAnimationFrame(lerpCursor);

    // 3. Ticking telemetry timestamp
    const timer = setInterval(() => {
      const now = new Date();
      setTimestamp(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    }, 1000);

    // 4. Telemetry coordinate drift
    const coordTimer = setInterval(() => {
      setCoords({
        lat: `45.09.${Math.floor(Math.random() * 60)} N`,
        lng: `120.33.${Math.floor(Math.random() * 60)} W`,
      });
    }, 4000);

    // 5. Glitch flash on load
    const glitchTimer = setTimeout(() => {
      setGlitchActive(false);
    }, 800);

    // 6. Interactive Canvas Starfield Background
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let stars = [];
      const numStars = 100;
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
      };
      
      const initStars = () => {
        stars = [];
        for (let i = 0; i < numStars; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.05,
            speedY: (Math.random() - 0.5) * 0.05,
            alpha: Math.random() * 0.7 + 0.3,
            pulseSpeed: Math.random() * 0.02 + 0.005,
            pulseDir: 1
          });
        }
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      let starAnimationId;
      const animateStars = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach((star) => {
          // Drifting
          star.x += star.speedX;
          star.y += star.speedY;

          // Mouse interaction (stars push away slightly from cursor)
          const dx = mousePos.x - star.x;
          const dy = mousePos.y - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            star.x -= (dx / dist) * force * 0.4;
            star.y -= (dy / dist) * force * 0.4;
          }

          // Pulsing brightness
          star.alpha += star.pulseSpeed * star.pulseDir;
          if (star.alpha >= 1 || star.alpha <= 0.2) {
            star.pulseDir *= -1;
          }

          // Boundary wrap
          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;

          // Render
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(237, 239, 247, ${star.alpha})`;
          ctx.fill();
        });

        starAnimationId = requestAnimationFrame(animateStars);
      };
      starAnimationId = requestAnimationFrame(animateStars);

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        cancelAnimationFrame(starAnimationId);
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearInterval(timer);
      clearInterval(coordTimer);
      clearTimeout(glitchTimer);
    };
  }, [mousePos]);

  return (
    <>
      {/* ─── Scroll Progress Bar ─── */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* ─── Glitch Screen Effect Overlay ─── */}
      <div className={`fixed inset-0 pointer-events-none z-[999] telemetry-glitch ${glitchActive ? 'telemetry-glitch-active' : ''}`} />

      {/* ─── Canvas Particle Starfield Background ─── */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-[2]" 
        style={{ opacity: 0.7 }}
      />

      {/* ─── Cinematic Ambient Space Scenery (Behind everything) ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* Floating Nebulae */}
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[1000px] rounded-full nebula-glow-1 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] max-w-[900px] rounded-full nebula-glow-2 blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[50vw] h-[50vw] max-w-[700px] rounded-full nebula-glow-3 blur-[90px]" />

        {/* Global Grid Overlay */}
        <div className="absolute inset-0 cinematic-grid opacity-60" />

        {/* Global Scanlines Overlay */}
        <div className="absolute inset-0 cinematic-scanlines opacity-[0.25]" />
      </div>

      {/* ─── Custom Telemetry Cursor ─── */}
      <div
        style={{
          position: "fixed",
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          pointerEvents: "none",
          transition: "width 0.2s, height 0.2s, background-color 0.2s",
          width: isHoveringClickable ? "40px" : "18px",
          height: isHoveringClickable ? "40px" : "18px",
          border: isHoveringClickable 
            ? "1px dashed var(--flare-500)" 
            : "1px solid var(--signal-400)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        className="hidden md:flex"
      >
        {/* Inner core pointer */}
        <div 
          style={{ 
            width: "4px", 
            height: "4px", 
            backgroundColor: isHoveringClickable ? "var(--flare-500)" : "var(--signal-400)",
            borderRadius: "50%" 
          }} 
        />
        
        {/* Cursor coords tag */}
        <span 
          style={{ 
            position: "absolute",
            left: "24px",
            top: "12px",
            fontSize: "8px",
            fontFamily: "var(--font-mono)",
            color: "var(--text-500)",
            whiteSpace: "nowrap",
            letterSpacing: "0.05em",
            opacity: 0.7
          }}
        >
          X:{Math.round(mousePos.x)} Y:{Math.round(mousePos.y)}
        </span>
      </div>

      {/* ─── Edge Instrument / Telemetry Graphics ─── */}
      <div className="fixed inset-0 pointer-events-none z-[90] hidden md:block text-label text-text-500 font-telemetry select-none">
        {/* Top border hairline with ticks */}
        <div className="absolute top-0 left-[5vw] right-[5vw] h-[1px] bg-[var(--hairline-700)]">
          <div className="absolute left-0 bottom-0 w-2 h-1 bg-[var(--text-500)]" />
          <div className="absolute right-0 bottom-0 w-2 h-1 bg-[var(--text-500)]" />
        </div>

        {/* Bottom border hairline with ticks */}
        <div className="absolute bottom-0 left-[5vw] right-[5vw] h-[1px] bg-[var(--hairline-700)]">
          <div className="absolute left-0 top-0 w-2 h-1 bg-[var(--text-500)]" />
          <div className="absolute right-0 top-0 w-2 h-1 bg-[var(--text-500)]" />
        </div>

        {/* Left vertical border hairline */}
        <div className="absolute top-[72px] bottom-12 left-[5vw] w-[1px] bg-[var(--hairline-700)]" />

        {/* Right vertical border hairline */}
        <div className="absolute top-[72px] bottom-12 right-[5vw] w-[1px] bg-[var(--hairline-700)]" />

        {/* Live indicator (Top-Left) */}
        <div className="absolute top-[84px] left-[6vw] flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--signal-400)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--signal-400)]"></span>
          </span>
          <span className="text-[10px] tracking-[0.2em] font-mono text-[var(--signal-400)]">LIVE FEED DECODE</span>
        </div>

        {/* Active Timestamp (Top-Right) */}
        <div className="absolute top-[84px] right-[6vw] text-[10px] tracking-[0.15em] font-mono text-[var(--text-500)]">
          {timestamp || "LOADING TELEMETRY..."}
        </div>

        {/* Space Coordinates (Bottom-Left) */}
        <div className="absolute bottom-[24px] left-[6vw] text-[10px] tracking-[0.2em] font-mono">
          SECTOR_09 // COORDS: {coords.lat} / {coords.lng}
        </div>

        {/* Status code / Connection quality (Bottom-Right) */}
        <div className="absolute bottom-[24px] right-[6vw] text-[10px] tracking-[0.15em] font-mono text-[var(--signal-400)]">
          TRANS_RATE: {(Math.random() * 4 + 12).toFixed(2)} MB/S // SIGNAL: STABLE
        </div>

        {/* Corner Crosshairs */}
        <div className="absolute top-[72px] left-[5vw] -translate-x-[4px] -translate-y-[4px] w-2 h-2 border-t border-l border-[var(--text-500)]" />
        <div className="absolute top-[72px] right-[5vw] translate-x-[4px] -translate-y-[4px] w-2 h-2 border-t border-r border-[var(--text-500)]" />
        <div className="absolute bottom-12 left-[5vw] -translate-x-[4px] translate-y-[4px] w-2 h-2 border-b border-l border-[var(--text-500)]" />
        <div className="absolute bottom-12 right-[5vw] translate-x-[4px] translate-y-[4px] w-2 h-2 border-b border-r border-[var(--text-500)]" />
      </div>
    </>
  );
}

