"use client";
import { useState, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Lets any component (e.g. a "View RSVP" link in Hero) switch tabs without
// prop-drilling: window.dispatchEvent(new CustomEvent("switch-tab", { detail: "rsvp" }))
export function switchTab(tabId: string) {
  window.dispatchEvent(new CustomEvent("switch-tab", { detail: tabId }));
}

export interface TabDef {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabDef[];
  defaultTab?: string;
}

export default function Tabs({ tabs, defaultTab }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  useEffect(() => {
    const handler = (e: Event) => {
      const tabId = (e as CustomEvent<string>).detail;
      if (tabs.some((t) => t.id === tabId)) {
        setActive(tabId);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("switch-tab", handler);
    return () => window.removeEventListener("switch-tab", handler);
  }, [tabs]);

  return (
    <div>
      {/* Tab bar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-lavender-100 shadow-sm">
        <div className="max-w-3xl mx-auto flex overflow-x-auto no-scrollbar px-4">
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="relative shrink-0 px-4 sm:px-6 py-4 font-sans text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-200"
                style={{ color: isActive ? "#654a7d" : "#b39ac2" }}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute left-4 right-4 sm:left-6 sm:right-6 -bottom-px h-0.5"
                    style={{ background: "#b8862a" }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Active tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab?.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {activeTab?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
