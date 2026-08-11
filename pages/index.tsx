import Head from "next/head";
import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import Tabs from "@/components/Tabs";

const IMAGES: string[] = [
  "/images/photo01.jpg",
  "/images/photo02.jpg",
  "/images/photo03.jpg",
  "/images/photo04.jpg",
  "/images/photo05.jpg",
  "/images/photo06.jpg",
  "/images/photo07.jpg",
  "/images/photo08.jpg",
  "/images/photo09.jpg",
  "/images/photo10.jpg",
  "/images/photo11.jpg",
  "/images/photo12.jpg",
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Jieying &amp; John — December 6, 2026</title>
        <meta name="description" content="Join us to celebrate the wedding of Jieying Liao and John Nguyen on December 6, 2026!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-gold-dark text-cream text-center text-sm sm:text-base font-sans py-3 px-4">
        🚧 Hold your horses! You found the site before we finished building it —
        please pardon the wet paint and duct tape. 🚧
      </div>

      <div id="details">
        <Tabs
          tabs={[
            {
              id: "home",
              label: "Home",
              content: (
                <>
                  <Hero />
                  <RSVPForm />
                </>
              ),
            },
            { id: "rsvp", label: "RSVP", content: <RSVPForm /> },
            { id: "venue", label: "Venue", content: <Venue /> },
            { id: "schedule", label: "Schedule", content: <Schedule /> },
            ...(IMAGES.length > 0
              ? [{ id: "photos", label: "Photos", content: <Gallery images={IMAGES} /> }]
              : []),
          ]}
        />

        <footer className="py-10 text-center bg-lavender-50 border-t border-lavender-100">
          <p className="font-sans text-xs uppercase tracking-widest text-lavender-400">
            Made with love · Jieying &amp; John · 2026
          </p>
        </footer>
      </div>
    </>
  );
}
