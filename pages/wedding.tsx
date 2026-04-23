import Head from "next/head";
import Envelope from "@/components/Envelope";
import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";

const IMAGES: string[] = [
  // "/images/photo1.jpg",
  // "/images/photo2.jpg",
];

export default function Wedding() {
  return (
    <>
      <Head>
        <title>Jieying &amp; John — December 6, 2026</title>
        <meta name="description" content="Join us to celebrate the wedding of Jieying Liao and John Nguyen on December 6, 2026!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Envelope />

      <div id="details">
        <Hero />
        <Schedule />
        <Venue />
        {IMAGES.length > 0 && <Gallery images={IMAGES} />}
        <RSVPForm />

        <footer className="py-10 text-center bg-blush-50 border-t border-blush-100">
          <p className="font-sans text-xs uppercase tracking-widest text-blush-300">
            Made with love · Jieying &amp; John · 2026
          </p>
        </footer>
      </div>
    </>
  );
}
