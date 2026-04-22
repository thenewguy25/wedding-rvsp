import { useEffect, useState } from "react";

// Update these with the actual wedding date
const WEDDING_DATE = new Date("2026-12-06T10:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-cream text-center px-6 py-20">
      <p className="font-sans uppercase tracking-[0.35em] text-xs text-gold mb-6">
        Together with their families
      </p>

      <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-rose-deep leading-tight mb-4">
        Jieying &amp; John
      </h1>

      <div className="flex items-center gap-4 my-4">
        <div className="h-px w-16 bg-gold-light opacity-60" />
        <span className="text-gold text-lg">✦</span>
        <div className="h-px w-16 bg-gold-light opacity-60" />
      </div>

      <p className="font-serif text-xl text-gold-dark mb-2">December 6, 2026</p>
      <p className="font-sans text-sm tracking-widest text-blush-400 uppercase mb-12">
        Marina Del Rey · Bronx, NY
      </p>

      {/* Countdown */}
      {mounted ? (
        <div className="grid grid-cols-4 gap-4 sm:gap-8">
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit} className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl text-rose-deep tabular-nums">
                {String(timeLeft[unit]).padStart(2, "0")}
              </span>
              <span className="font-sans text-xs uppercase tracking-widest text-blush-400 mt-1">
                {unit}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-16" />
      )}
    </section>
  );
}
