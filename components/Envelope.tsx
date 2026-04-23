"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeProps {
  standalone?: boolean;
}

export default function Envelope({ standalone = false }: EnvelopeProps) {
  const [opened, setOpened] = useState(false);

  const scrollToDetails = () => {
    document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-blush-50 px-4 py-16">
      {/* Decorative heading */}
      <p className="font-sans uppercase tracking-[0.3em] text-xs text-gold mb-10 opacity-80">
        You&apos;re invited
      </p>

      {/* Envelope wrapper */}
      <div
        className="relative w-80 sm:w-96"
        style={{ perspective: "1000px" }}
      >
        {/* Envelope body */}
        <div className="relative bg-white rounded-sm shadow-2xl overflow-visible" style={{ height: "240px" }}>

          {/* Bottom triangle crease lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 384 240"
            fill="none"
          >
            {/* Bottom-left crease */}
            <line x1="0" y1="240" x2="192" y2="130" stroke="#e8d5c4" strokeWidth="1" />
            {/* Bottom-right crease */}
            <line x1="384" y1="240" x2="192" y2="130" stroke="#e8d5c4" strokeWidth="1" />
          </svg>

          {/* Animated flap */}
          <motion.div
            className="absolute top-0 left-0 w-full origin-top z-20 cursor-pointer"
            style={{ height: "120px" }}
            animate={opened ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => !opened && setOpened(true)}
          >
            {/* Flap triangle SVG */}
            <svg
              viewBox="0 0 384 120"
              className="w-full h-full"
              style={{ display: "block" }}
            >
              <polygon
                points="0,0 384,0 192,120"
                fill="#f5d5c1"
                stroke="#e8d5c4"
                strokeWidth="1"
              />
            </svg>
            {/* Wax seal */}
            {!opened && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-md">
                <span className="font-serif text-white text-lg font-bold leading-none select-none">♡</span>
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
                className="absolute bottom-4 w-full text-center font-sans text-xs tracking-widest text-blush-400 uppercase cursor-pointer select-none"
                onClick={() => setOpened(true)}
              >
                Click to open
              </motion.p>
            )}
          </AnimatePresence>

          {/* Left triangle */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 384 240"
          >
            <polygon points="0,0 192,130 0,240" fill="#faeae0" stroke="#e8d5c4" strokeWidth="1" />
            <polygon points="384,0 192,130 384,240" fill="#faeae0" stroke="#e8d5c4" strokeWidth="1" />
          </svg>
        </div>

        {/* Save-the-date card — slides up out of envelope */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ y: 60, opacity: 0, x: "-50%" }}
              animate={{ y: -220, opacity: 1, x: "-50%" }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-1/2 w-72 sm:w-80 bg-cream rounded shadow-2xl border border-blush-100 px-8 py-10 text-center z-30"
              style={{ top: 0 }}
            >
              {/* Decorative top rule */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gold-light opacity-60" />
                <span className="text-gold text-sm">✦</span>
                <div className="flex-1 h-px bg-gold-light opacity-60" />
              </div>

              <p className="font-sans uppercase tracking-[0.25em] text-xs text-blush-400 mb-3">
                Save the Date
              </p>
              <h2 className="font-serif text-3xl text-rose-deep leading-tight mb-1">
                Jieying &amp; John
              </h2>
              <p className="font-sans text-xs tracking-widest uppercase text-blush-400 mb-4">are getting married</p>
              <p className="font-serif text-lg text-gold-dark mb-1">December 6, 2026</p>
              <p className="font-sans text-xs text-blush-400 mb-6">Marina Del Rey · Bronx, NY</p>

              {/* Decorative bottom rule */}
              <div className="flex items-center gap-3 mb-7">
                <div className="flex-1 h-px bg-gold-light opacity-60" />
                <span className="text-gold text-sm">✦</span>
                <div className="flex-1 h-px bg-gold-light opacity-60" />
              </div>

              {standalone ? (
                <p className="font-sans text-xs tracking-widest uppercase text-blush-400">
                  Formal invitation to follow
                </p>
              ) : (
                <button
                  onClick={scrollToDetails}
                  className="inline-block bg-gold hover:bg-gold-dark text-white font-sans text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-colors duration-200"
                >
                  View Details &amp; RSVP
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Extra space so card has room to animate up */}
      {opened && <div className="h-64" />}
    </section>
  );
}
