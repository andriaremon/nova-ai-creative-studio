import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type OrbMode = 'orbital' | 'pulse' | 'lattice';

interface NovaOrbCanvasProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  pointerOffset: { x: number; y: number };
}

interface SpherePoint {
  bx: number;
  by: number;
  bz: number;
  phase: number;
  hueShift: number;
}

export function NovaOrbCanvas({ theme, onToggleTheme, pointerOffset }: NovaOrbCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [orbMode, setOrbMode] = useState<OrbMode>('orbital');
  const pointerRef = useRef(pointerOffset);
  const modeRef = useRef(orbMode);
  const themeRef = useRef(theme);

  useEffect(() => {
    pointerRef.current = pointerOffset;
  }, [pointerOffset]);

  useEffect(() => {
    modeRef.current = orbMode;
  }, [orbMode]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Build deterministic Fibonacci sphere lattice (~340 points)
    const count = 340;
    const points: SpherePoint[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      points.push({
        bx: Math.cos(theta) * radiusAtY,
        by: y,
        bz: Math.sin(theta) * radiusAtY,
        phase: i * 0.14,
        hueShift: (i % 60) / 60,
      });
    }

    let animId = 0;
    let rotY = 0;
    let rotX = 0.25;
    let smoothPtrX = 0;
    let smoothPtrY = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (timeMs: number) => {
      const t = timeMs * 0.001;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const baseRadius = Math.min(w, h) * 0.31;
      const isDark = themeRef.current === 'dark';
      const currentMode = modeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Smooth pointer interpolation
      smoothPtrX += (pointerRef.current.x - smoothPtrX) * 0.08;
      smoothPtrY += (pointerRef.current.y - smoothPtrY) * 0.08;

      if (!prefersReducedMotion) {
        rotY += 0.0045 + smoothPtrX * 0.012;
        rotX += (0.28 + smoothPtrY * 0.55 - rotX) * 0.05;
      }

      // Outer volumetric glow core
      const glowRadius = baseRadius * 1.45;
      const coreGrad = ctx.createRadialGradient(
        cx + smoothPtrX * 18,
        cy + smoothPtrY * 18,
        baseRadius * 0.12,
        cx,
        cy,
        glowRadius
      );
      if (isDark) {
        coreGrad.addColorStop(0, 'rgba(6, 182, 212, 0.34)');
        coreGrad.addColorStop(0.38, 'rgba(37, 99, 235, 0.22)');
        coreGrad.addColorStop(0.7, 'rgba(124, 58, 237, 0.12)');
        coreGrad.addColorStop(1, 'rgba(5, 5, 8, 0)');
      } else {
        coreGrad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
        coreGrad.addColorStop(0.42, 'rgba(37, 99, 235, 0.16)');
        coreGrad.addColorStop(0.75, 'rgba(124, 58, 237, 0.08)');
        coreGrad.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner glass sphere silhouette
      const sphereGrad = ctx.createRadialGradient(
        cx - baseRadius * 0.3 + smoothPtrX * 20,
        cy - baseRadius * 0.35 + smoothPtrY * 20,
        baseRadius * 0.08,
        cx,
        cy,
        baseRadius
      );
      if (isDark) {
        sphereGrad.addColorStop(0, 'rgba(34, 211, 238, 0.24)');
        sphereGrad.addColorStop(0.5, 'rgba(30, 64, 175, 0.18)');
        sphereGrad.addColorStop(1, 'rgba(15, 23, 42, 0.45)');
      } else {
        sphereGrad.addColorStop(0, 'rgba(34, 211, 238, 0.22)');
        sphereGrad.addColorStop(0.55, 'rgba(37, 99, 235, 0.14)');
        sphereGrad.addColorStop(1, 'rgba(124, 58, 237, 0.10)');
      }
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.94, 0, Math.PI * 2);
      ctx.fill();

      // Draw 3D orbital gyroscope rings
      const drawRing = (tiltA: number, tiltB: number, radiusMult: number, color: string, lw: number) => {
        ctx.beginPath();
        const steps = 96;
        for (let s = 0; s <= steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          let rx = Math.cos(a) * baseRadius * radiusMult;
          let ry = Math.sin(a) * baseRadius * radiusMult;
          let rz = 0;

          // Tilt X
          const y1 = ry * Math.cos(tiltA) - rz * Math.sin(tiltA);
          const z1 = ry * Math.sin(tiltA) + rz * Math.cos(tiltA);
          ry = y1;
          rz = z1;

          // Tilt Y
          const x2 = rx * Math.cos(tiltB) + rz * Math.sin(tiltB);
          const z2 = -rx * Math.sin(tiltB) + rz * Math.cos(tiltB);
          rx = x2;
          rz = z2;

          const perspective = 520 / (520 - rz);
          const px = cx + rx * perspective;
          const py = cy + ry * perspective;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = lw;
        ctx.stroke();
      };

      drawRing(
        0.95 + smoothPtrY * 0.4,
        rotY * 0.65,
        1.22,
        isDark ? 'rgba(34, 211, 238, 0.32)' : 'rgba(37, 99, 235, 0.35)',
        1.25
      );
      drawRing(
        -0.7 + smoothPtrX * 0.3,
        -rotY * 0.45 + 0.8,
        1.34,
        isDark ? 'rgba(139, 92, 246, 0.30)' : 'rgba(124, 58, 237, 0.28)',
        1.1
      );

      // Transform and depth-sort 3D particles
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected: {
        x: number;
        y: number;
        z: number;
        scale: number;
        alpha: number;
        hueShift: number;
      }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        let morph = 1;
        if (currentMode === 'pulse' && !prefersReducedMotion) {
          morph = 1 + 0.14 * Math.sin(t * 2.4 + p.phase);
        } else if (currentMode === 'lattice' && !prefersReducedMotion) {
          morph = 1 + 0.08 * Math.cos(p.by * 6 + t * 1.8);
        } else if (!prefersReducedMotion) {
          morph = 1 + 0.045 * Math.sin(t * 1.4 + p.phase);
        }

        const x0 = p.bx * baseRadius * morph;
        const y0 = p.by * baseRadius * morph;
        const z0 = p.bz * baseRadius * morph;

        // Rotate Y
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;

        // Rotate X
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        const perspective = 540 / (540 - z2);
        const sx = cx + x1 * perspective;
        const sy = cy + y2 * perspective;
        const depthAlpha = Math.max(0.14, Math.min(1, (z2 + baseRadius) / (baseRadius * 1.85)));

        projected.push({
          x: sx,
          y: sy,
          z: z2,
          scale: perspective,
          alpha: depthAlpha,
          hueShift: p.hueShift,
        });
      }

      projected.sort((a, b) => a.z - b.z);

      // Lattice connective lines when in lattice mode
      if (currentMode === 'lattice') {
        ctx.lineWidth = 0.7;
        for (let i = 0; i < projected.length; i += 2) {
          const a = projected[i];
          if (a.z < -baseRadius * 0.1) continue;
          for (let j = i + 1; j < Math.min(i + 10, projected.length); j++) {
            const b = projected[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 1850) {
              ctx.strokeStyle = isDark
                ? `rgba(56, 189, 248, ${(a.alpha * 0.28).toFixed(2)})`
                : `rgba(37, 99, 235, ${(a.alpha * 0.25).toFixed(2)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles back-to-front
      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        const size = Math.max(1.1, 2.7 * pt.scale * (0.55 + pt.alpha * 0.55));
        let color: string;
        if (pt.hueShift < 0.33) {
          color = isDark
            ? `rgba(34, 211, 238, ${pt.alpha.toFixed(2)})`
            : `rgba(6, 148, 162, ${pt.alpha.toFixed(2)})`;
        } else if (pt.hueShift < 0.66) {
          color = isDark
            ? `rgba(96, 165, 250, ${pt.alpha.toFixed(2)})`
            : `rgba(37, 99, 235, ${pt.alpha.toFixed(2)})`;
        } else {
          color = isDark
            ? `rgba(167, 139, 250, ${pt.alpha.toFixed(2)})`
            : `rgba(124, 58, 237, ${pt.alpha.toFixed(2)})`;
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-between h-full min-h-[420px] lg:min-h-[520px] rounded-2xl glass-panel overflow-hidden p-5 shadow-2xl shadow-blue-950/10 dark:shadow-cyan-950/20">
      {/* Ambient Radial Aura inside frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
      />

      {/* Top viewport controls: Orb Mode Label + Accessible Theme Switch */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide">
          Interactive Spatial Core · Move cursor to steer
        </span>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors duration-150 hover:bg-slate-100 dark:hover:bg-white/10 whitespace-nowrap shrink-0 min-h-[36px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="h-3.5 w-3.5 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-3.5 w-3.5 text-violet-600" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive 3D Canvas Stage */}
      <div className="relative flex-1 w-full my-2">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Subtle mouse-reactive floating glass callouts */}
        <div
          style={{
            transform: `translate3d(${(pointerOffset.x * -14).toFixed(1)}px, ${(pointerOffset.y * -14).toFixed(1)}px, 0)`,
            transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="pointer-events-none hidden sm:block absolute top-6 left-2 rounded-xl glass-surface px-3.5 py-2.5 shadow-lg"
        >
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Visual Architecture</p>
          <p className="text-xs font-semibold text-slate-900 dark:text-white">Real-Time Brand Shaders</p>
        </div>

        <div
          style={{
            transform: `translate3d(${(pointerOffset.x * 16).toFixed(1)}px, ${(pointerOffset.y * 16).toFixed(1)}px, 0)`,
            transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="pointer-events-none hidden sm:block absolute bottom-6 right-2 rounded-xl glass-surface px-3.5 py-2.5 shadow-lg"
        >
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Output Cadence</p>
          <p className="text-xs font-semibold text-slate-900 dark:text-white">4–8 Week Launch Sprints</p>
        </div>
      </div>

      {/* Bottom Interactive Mode Segmented Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/80 dark:border-white/10">
        <span className="text-xs text-slate-500 dark:text-slate-400">Geometry Mode</span>
        <div
          role="group"
          aria-label="Orb geometry mode"
          className="inline-flex items-center gap-1 rounded-lg bg-slate-200/70 dark:bg-white/5 p-1"
        >
          {(['orbital', 'pulse', 'lattice'] as OrbMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setOrbMode(mode)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all duration-150 whitespace-nowrap shrink-0 ${
                orbMode === mode
                  ? 'bg-white dark:bg-white/15 text-slate-950 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
