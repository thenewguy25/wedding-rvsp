"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeProps {
  standalone?: boolean;
}

// Randomised snowflake data — generated once outside component to avoid hydration mismatch
const SNOWFLAKES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${(i * 0.7) % 8}s`,
  duration: `${8 + (i * 1.3) % 8}s`,
  size: i % 3 === 0 ? "1rem" : i % 3 === 1 ? "0.6rem" : "0.85rem",
  opacity: 0.4 + (i % 5) * 0.1,
}));

export default function Envelope({ standalone = false }: EnvelopeProps) {
  const [opened, setOpened] = useState(false);
  const [showSnow, setShowSnow] = useState(false);

  // Avoid SSR hydration mismatch for snow
  useEffect(() => { setShowSnow(true); }, []);

  const scrollToDetails = () => {
    document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
  };

  // Winter palette when standalone, warm palette otherwise
  const bg         = standalone ? "#0d1b2a" : "#fdf6f0";
  const flapFill   = standalone ? "#1e3a5f" : "#f5d5c1";
  const flapStroke = standalone ? "#2a4f7c" : "#e8d5c4";
  const sideFill   = standalone ? "#162d4a" : "#faeae0";
  const sideStroke = standalone ? "#1e3a5f" : "#e8d5c4";
  const sealBg     = standalone ? "#2a4f7c" : "#b8862a";
  const hintColor  = standalone ? "#6b9cc2" : "#d8a898";
  const headingColor = standalone ? "#a8c8e8" : "#b8862a";

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden"
      style={{ background: bg }}
    >
      {/* Snow animation */}
      {standalone && showSnow && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <style>{`
            @keyframes snowfall {
              0%   { transform: translateY(-20px) translateX(0px); opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 0.8; }
              100% { transform: translateY(110vh) translateX(30px); opacity: 0; }
            }
          `}</style>
          {SNOWFLAKES.map((flake) => (
            <div
              key={flake.id}
              style={{
                position: "absolute",
                top: "-20px",
                left: flake.left,
                fontSize: flake.size,
                opacity: flake.opacity,
                animation: `snowfall ${flake.duration} ${flake.delay} linear infinite`,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}

      {/* Decorative heading */}
      <p
        className="font-sans uppercase tracking-[0.3em] text-xs mb-10 opacity-80 z-10"
        style={{ color: headingColor }}
      >
        You&apos;re invited
      </p>

      {/* Envelope wrapper */}
      <div className="relative w-80 sm:w-96 z-10" style={{ perspective: "1000px" }}>

        {/* Envelope body */}
        <div
          className="relative rounded-sm shadow-2xl overflow-visible"
          style={{
            height: "240px",
            background: standalone ? "#1a3358" : "white",
          }}
        >
          {/* Crease lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 384 240" fill="none">
            <line x1="0" y1="240" x2="192" y2="130" stroke={sideStroke} strokeWidth="1" />
            <line x1="384" y1="240" x2="192" y2="130" stroke={sideStroke} strokeWidth="1" />
          </svg>

          {/* Animated flap */}
          <motion.div
            className="absolute top-0 left-0 w-full origin-top z-20 cursor-pointer"
            style={{ height: "120px" }}
            animate={opened ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => !opened && setOpened(true)}
          >
            <svg viewBox="0 0 384 120" className="w-full h-full" style={{ display: "block" }}>
              <polygon points="0,0 384,0 192,120" fill={flapFill} stroke={flapStroke} strokeWidth="1" />
            </svg>
            {!opened && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                style={{ background: sealBg }}
              >
                <span className="font-serif text-white text-lg font-bold leading-none select-none">
                  {standalone ? "❄" : "♡"}
                </span>
              </div>
            )}
          </motion.div>

          {/* Click hint */}
          <AnimatePresence>
            {!opened && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-4 w-full text-center font-sans text-xs tracking-widest uppercase cursor-pointer select-none"
                style={{ color: hintColor }}
                onClick={() => setOpened(true)}
              >
                Click to open
              </motion.p>
            )}
          </AnimatePresence>

          {/* Side triangles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 384 240">
            <polygon points="0,0 192,130 0,240"   fill={sideFill} stroke={sideStroke} strokeWidth="1" />
            <polygon points="384,0 192,130 384,240" fill={sideFill} stroke={sideStroke} strokeWidth="1" />
          </svg>
        </div>

        {/* Save-the-date card */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ y: 60, opacity: 0, x: "-50%" }}
              animate={{ y: -220, opacity: 1, x: "-50%" }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-1/2 w-72 sm:w-80 rounded shadow-2xl px-8 py-10 text-center z-30"
              style={{
                top: 0,
                background: standalone ? "#f0f5ff" : "#fdf8f2",
                border: `1px solid ${standalone ? "#c8d8f0" : "#f5e6dc"}`,
              }}
            >
              {/* Top rule */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px opacity-60" style={{ background: standalone ? "#7aaad4" : "#d4a96a" }} />
                <span style={{ color: standalone ? "#4a90c4" : "#b8862a" }}>{standalone ? "❄" : "✦"}</span>
                <div className="flex-1 h-px opacity-60" style={{ background: standalone ? "#7aaad4" : "#d4a96a" }} />
              </div>

              <p
                className="font-sans uppercase tracking-[0.25em] text-xs mb-3"
                style={{ color: standalone ? "#5a8ab0" : "#c9a0a0" }}
              >
                Save the Date
              </p>
              <h2
                className="font-serif text-3xl leading-tight mb-1"
                style={{ color: standalone ? "#1a3358" : "#9b5b5b" }}
              >
                Jieying &amp; John
              </h2>
              <p
                className="font-sans text-xs tracking-widest uppercase mb-4"
                style={{ color: standalone ? "#5a8ab0" : "#c9a0a0" }}
              >
                are getting married
              </p>
              <p
                className="font-serif text-lg mb-1"
                style={{ color: standalone ? "#2a5f8a" : "#8a6218" }}
              >
                December 6, 2026
              </p>

              {/* Bottom rule */}
              <div className="flex items-center gap-3 mt-5 mb-7">
                <div className="flex-1 h-px opacity-60" style={{ background: standalone ? "#7aaad4" : "#d4a96a" }} />
                <span style={{ color: standalone ? "#4a90c4" : "#b8862a" }}>{standalone ? "❄" : "✦"}</span>
                <div className="flex-1 h-px opacity-60" style={{ background: standalone ? "#7aaad4" : "#d4a96a" }} />
              </div>

              {standalone ? (
                <p
                  className="font-sans text-xs tracking-widest uppercase"
                  style={{ color: standalone ? "#5a8ab0" : "#c9a0a0" }}
                >
                  Formal invitation to follow
                </p>
              ) : (
                <button
                  onClick={scrollToDetails}
                  className="inline-block text-white font-sans text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-colors duration-200"
                  style={{ background: "#b8862a" }}
                >
                  View Details &amp; RSVP
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {opened && <div className="h-64 z-10" />}
    </section>
  );
}
