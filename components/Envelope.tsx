"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeProps {
  standalone?: boolean;
}

const SNOWFLAKES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${(i * 0.7) % 8}s`,
  duration: `${9 + (i * 1.3) % 8}s`,
  size: i % 3 === 0 ? "1.1rem" : i % 3 === 1 ? "0.55rem" : "0.8rem",
  opacity: 0.35 + (i % 5) * 0.1,
}));

export default function Envelope({ standalone = false }: EnvelopeProps) {
  const [opened, setOpened] = useState(false);
  const [showSnow, setShowSnow] = useState(false);

  useEffect(() => { setShowSnow(true); }, []);

  const scrollToDetails = () => {
    document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
  };

  // Light winter palette vs warm palette
  const bg          = standalone ? "#deeef9" : "#fdf6f0";
  const flapFill    = standalone ? "#b8d8f0" : "#f5d5c1";
  const flapStroke  = standalone ? "#90bede" : "#e8d5c4";
  const sideFill    = standalone ? "#c8e4f5" : "#faeae0";
  const sideStroke  = standalone ? "#a0c8e8" : "#e8d5c4";
  const envelopeBg  = standalone ? "#e8f4fb" : "white";
  const sealBg      = standalone ? "#5a9fc8" : "#b8862a";
  const hintColor   = standalone ? "#5a8fad" : "#d8a898";
  const headingColor = standalone ? "#2a6080" : "#b8862a";

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden"
      style={{ background: bg }}
    >
      {/* Snowfall animation */}
      {standalone && showSnow && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <style>{`
            @keyframes snowfall {
              0%   { transform: translateY(-20px) translateX(0px); opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 0.7; }
              100% { transform: translateY(110vh) translateX(25px); opacity: 0; }
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
                color: "#7ab8d8",
                animation: `snowfall ${flake.duration} ${flake.delay} linear infinite`,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}

      {/* Heading */}
      <p
        className="font-sans uppercase tracking-[0.3em] text-xs mb-10 opacity-90 z-10"
        style={{ color: headingColor }}
      >
        You&apos;re invited
      </p>

      {/* Envelope wrapper */}
      <div className="relative w-80 sm:w-96 z-10" style={{ perspective: "1000px" }}>
        <div
          className="relative rounded-sm shadow-xl overflow-visible"
          style={{ height: "240px", background: envelopeBg }}
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
                <span className="text-white text-lg font-bold leading-none select-none">
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
            <polygon points="0,0 192,130 0,240"    fill={sideFill} stroke={sideStroke} strokeWidth="1" />
            <polygon points="384,0 192,130 384,240" fill={sideFill} stroke={sideStroke} strokeWidth="1" />
          </svg>
        </div>

        {/* Save-the-date card */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ y: 60, opacity: 0, x: "-50%" }}
              animate={{ y: -100, opacity: 1, x: "-50%" }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-1/2 w-72 sm:w-80 rounded shadow-2xl px-8 py-10 text-center z-30"
              style={{
                top: 0,
                background: "white",
                border: `1px solid ${standalone ? "#b8d8f0" : "#f0e0d0"}`,
              }}
            >
              {/* Corner snowflakes — only on standalone */}
              {standalone && (
                <>
                  <span className="absolute top-2 left-2 text-lg" style={{ color: "#90c0e0" }}>❄</span>
                  <span className="absolute top-2 right-2 text-lg" style={{ color: "#90c0e0" }}>❄</span>
                  <span className="absolute bottom-2 left-2 text-lg" style={{ color: "#90c0e0" }}>❄</span>
                  <span className="absolute bottom-2 right-2 text-lg" style={{ color: "#90c0e0" }}>❄</span>
                </>
              )}

              {/* Top snowflake row divider */}
              {standalone ? (
                <div className="flex items-center justify-center gap-1 mb-6">
                  {["0.6rem","0.9rem","0.6rem","0.9rem","0.6rem"].map((size, i) => (
                    <span key={i} style={{ fontSize: size, color: "#7ab8d8", opacity: 0.8 }}>❄</span>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px opacity-60" style={{ background: "#d4a96a" }} />
                  <span style={{ color: "#b8862a" }}>✦</span>
                  <div className="flex-1 h-px opacity-60" style={{ background: "#d4a96a" }} />
                </div>
              )}

              <p
                className="font-sans uppercase tracking-[0.25em] text-xs mb-3"
                style={{ color: standalone ? "#5a90b8" : "#c9a0a0" }}
              >
                Save the Date
              </p>
              <h2
                className="font-serif text-3xl leading-tight mb-1"
                style={{ color: standalone ? "#1a4060" : "#9b5b5b" }}
              >
                Jie &amp; John
              </h2>
              <p
                className="font-sans text-xs tracking-widest uppercase mb-4"
                style={{ color: standalone ? "#5a90b8" : "#c9a0a0" }}
              >
                are getting married
              </p>
              <p
                className="font-serif text-lg mb-1"
                style={{ color: standalone ? "#1e6090" : "#8a6218" }}
              >
                December 6, 2026
              </p>

              {/* Bottom snowflake row divider */}
              {standalone ? (
                <div className="flex items-center justify-center gap-1 mt-5 mb-7">
                  {["0.6rem","0.9rem","0.6rem","0.9rem","0.6rem"].map((size, i) => (
                    <span key={i} style={{ fontSize: size, color: "#7ab8d8", opacity: 0.8 }}>❄</span>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 mt-5 mb-7">
                  <div className="flex-1 h-px opacity-60" style={{ background: "#d4a96a" }} />
                  <span style={{ color: "#b8862a" }}>✦</span>
                  <div className="flex-1 h-px opacity-60" style={{ background: "#d4a96a" }} />
                </div>
              )}

              {standalone ? (
                <p className="font-sans text-xs tracking-widest uppercase" style={{ color: "#5a90b8" }}>
                  Formal invitation to follow
                </p>
              ) : (
                <button
                  onClick={scrollToDetails}
                  className="inline-block text-white font-sans text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-colors duration-200 hover:opacity-90"
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
