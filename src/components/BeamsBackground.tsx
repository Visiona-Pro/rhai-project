"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

const intensityOpacity = {
  subtle: 0.5,
  medium: 0.7,
  strong: 0.9,
};

// Beams estáticos em CSS — GPU-accelerated, sem canvas, sem JS em runtime
export function BeamsBackground({
  className,
  children,
  intensity = "strong",
}: AnimatedGradientBackgroundProps) {
  const op = intensityOpacity[intensity];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[#0a0a0a]",
        className
      )}
    >
      {/* Beams dourados — CSS puro, GPU-accelerated via transform */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ opacity: op }}
      >
        {/* Beam 1 */}
        <div
          className="absolute"
          style={{
            top: '-20%',
            left: '10%',
            width: '80px',
            height: '120%',
            background: 'linear-gradient(180deg, transparent 0%, hsla(42,72%,55%,0.4) 30%, hsla(42,72%,62%,0.6) 50%, hsla(42,72%,55%,0.4) 70%, transparent 100%)',
            filter: 'blur(28px)',
            transform: 'skewX(-30deg)',
            animation: 'beamSlide1 12s ease-in-out infinite',
            willChange: 'transform, opacity'
          }}
        />
        {/* Beam 2 */}
        <div
          className="absolute"
          style={{
            top: '-20%',
            left: '35%',
            width: '60px',
            height: '120%',
            background: 'linear-gradient(180deg, transparent 0%, hsla(45,78%,62%,0.35) 30%, hsla(45,78%,68%,0.55) 50%, hsla(45,78%,62%,0.35) 70%, transparent 100%)',
            filter: 'blur(22px)',
            transform: 'skewX(-28deg)',
            animation: 'beamSlide2 16s ease-in-out infinite',
            willChange: 'transform, opacity'
          }}
        />
        {/* Beam 3 */}
        <div
          className="absolute"
          style={{
            top: '-20%',
            left: '60%',
            width: '100px',
            height: '120%',
            background: 'linear-gradient(180deg, transparent 0%, hsla(38,72%,52%,0.3) 30%, hsla(38,72%,58%,0.5) 50%, hsla(38,72%,52%,0.3) 70%, transparent 100%)',
            filter: 'blur(32px)',
            transform: 'skewX(-32deg)',
            animation: 'beamSlide3 20s ease-in-out infinite',
            willChange: 'transform, opacity'
          }}
        />
        {/* Beam 4 */}
        <div
          className="absolute"
          style={{
            top: '-20%',
            left: '80%',
            width: '70px',
            height: '120%',
            background: 'linear-gradient(180deg, transparent 0%, hsla(44,75%,58%,0.25) 30%, hsla(44,75%,65%,0.45) 50%, hsla(44,75%,58%,0.25) 70%, transparent 100%)',
            filter: 'blur(24px)',
            transform: 'skewX(-26deg)',
            animation: 'beamSlide4 14s ease-in-out infinite',
            willChange: 'transform, opacity'
          }}
        />
        {/* Glow central suave */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, hsla(42,60%,50%,0.08) 0%, transparent 70%)',
            animation: 'beamGlow 8s ease-in-out infinite',
            willChange: 'opacity'
          }}
        />
      </div>

      <div className="relative z-10 w-full">
        {children}
      </div>

    </div>
  );
}
