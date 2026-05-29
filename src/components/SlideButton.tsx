"use client";

import { useRef, useState, useCallback } from "react";
import { ArrowRight, Check } from "lucide-react";

interface SlideButtonProps {
  label: string;
  onComplete: () => void;
  variant?: "primary" | "outline" | "gold";
  className?: string;
}

const HANDLE_SIZE = 56;
const THRESHOLD = 0.88;
const RESET_DELAY = 1800;

export function SlideButton({
  label,
  onComplete,
  variant = "primary",
  className = "",
}: SlideButtonProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [completed, setCompleted] = useState(false);

  const getMax = useCallback(() => {
    return (trackRef.current?.clientWidth ?? 0) - HANDLE_SIZE - 4;
  }, []);

  const complete = useCallback(() => {
    if (completed) return;
    const max = getMax();
    setCompleted(true);
    setIsDragging(false);
    setDragX(max);
    onComplete();
    setTimeout(() => {
      setCompleted(false);
      setDragX(0);
    }, RESET_DELAY);
  }, [completed, getMax, onComplete]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (completed) return;
      // Prevents scroll on mobile during drag
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
      startXRef.current = e.clientX - dragX;
    },
    [completed, dragX]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || completed) return;
      const max = getMax();
      const next = Math.min(Math.max(0, e.clientX - startXRef.current), max);
      setDragX(next);
      if (next >= max * THRESHOLD) complete();
    },
    [isDragging, completed, getMax, complete]
  );

  const onPointerUp = useCallback(() => {
    if (!isDragging || completed) return;
    setIsDragging(false);
    setDragX(0);
  }, [isDragging, completed]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        complete();
      }
    },
    [complete]
  );

  const max = getMax();
  const progress = max > 0 ? dragX / max : 0;

  const styles = {
    primary: {
      track: "bg-acento-primario/15 border border-acento-primario/40",
      fill: `rgba(0,242,254,${0.08 + progress * 0.15})`,
      fillDone: "rgba(0,242,254,0.22)",
      handle: "bg-transparent border-2 border-acento-primario backdrop-blur-sm",
      icon: "text-acento-primario",
      label: "text-acento-primario",
    },
    outline: {
      track: "bg-transparent border border-border-sutil",
      fill: `rgba(0,242,254,${progress * 0.1})`,
      fillDone: "rgba(0,242,254,0.12)",
      handle: "bg-transparent border-2 border-text-secundario backdrop-blur-sm",
      icon: "text-text-primario",
      label: "text-text-primario",
    },
    gold: {
      track: "bg-[#C19A5B]/15 border border-[#C19A5B]/40",
      fill: `rgba(193,154,91,${0.08 + progress * 0.15})`,
      fillDone: "rgba(193,154,91,0.22)",
      handle: "bg-transparent border-2 border-[#C19A5B] backdrop-blur-sm",
      icon: "text-[#C19A5B]",
      label: "text-[#C19A5B]",
    },
  }[variant];

  return (
    <div
      ref={trackRef}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`relative h-[60px] rounded-full select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-acento-primario ${styles.track} ${className}`}
      style={{
        minWidth: 220,
        // touchAction en el track para bloquear scroll durante drag en iOS/Android
        touchAction: "none",
      }}
    >
      {/* Progress fill */}
      <div
        className="absolute inset-y-0 left-0 rounded-full pointer-events-none"
        style={{
          width: `${dragX + HANDLE_SIZE / 2}px`,
          background: completed ? styles.fillDone : styles.fill,
          transition: isDragging
            ? "none"
            : "width 0.38s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease",
        }}
      />

      {/* Label principal */}
      <span
        className={`absolute inset-0 flex items-center justify-center text-sm font-bold tracking-wide pointer-events-none z-10 ${styles.label}`}
        style={{
          opacity: completed ? 0 : Math.max(0, 1 - progress * 1.8),
          transition: "opacity 0.2s ease",
        }}
      >
        {label}
      </span>

      {/* Label de éxito */}
      <span
        className="absolute inset-0 flex items-center justify-center text-sm font-bold tracking-wide pointer-events-none z-10 text-acento-secundario"
        style={{ opacity: completed ? 1 : 0, transition: "opacity 0.2s ease" }}
      >
        ¡Listo! Abriendo...
      </span>

      {/* Handle draggable */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`absolute top-[2px] left-[2px] z-20 flex items-center justify-center rounded-full ${styles.handle}`}
        style={{
          width: HANDLE_SIZE,
          height: HANDLE_SIZE,
          transform: `translateX(${dragX}px)`,
          transition: isDragging
            ? "none"
            : "transform 0.38s cubic-bezier(0.34,1.56,0.64,1)",
          cursor: completed ? "default" : "grab",
          // touchAction en el handle también para asegurar captura en todos los browsers
          touchAction: "none",
        }}
      >
        <span className={`transition-all duration-200 ${styles.icon}`}>
          {completed ? (
            <Check className="w-5 h-5" strokeWidth={2.5} />
          ) : (
            <ArrowRight
              className="w-5 h-5"
              style={{
                transform: `translateX(${progress * 4}px)`,
                transition: isDragging ? "none" : undefined,
              }}
            />
          )}
        </span>
      </div>

      {/* Shimmer idle */}
      {!isDragging && !completed && dragX === 0 && (
        <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 bottom-0 w-[60px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
            style={{ animation: "shimmer 2.6s ease-in-out infinite" }}
          />
        </div>
      )}
    </div>
  );
}
