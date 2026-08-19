const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=1+Marina+Dr,+Bronx,+NY+10465&output=embed";

export default function Venue() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="Venue &amp; Travel" />

        {/* Venue details */}
        <div className="mt-10 text-center mb-10">
          <h3 className="font-serif text-2xl text-rose-deep mb-1">Marina Del Rey</h3>
          <p className="font-sans text-sm text-lavender-500">
            1 Marina Dr, Bronx, NY 10465
          </p>
          <a
            href="https://maps.google.com/?q=1+Marina+Dr,+Bronx,+NY+10465"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 font-sans text-xs uppercase tracking-widest text-gold hover:text-gold-dark transition-colors"
          >
            Get Directions →
          </a>
        </div>

        {/* Map embed */}
        <div className="w-full rounded overflow-hidden shadow-md" style={{ height: "340px" }}>
          <iframe
            src={MAP_EMBED_SRC}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue map"
          />
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="text-center">
      <p
        className="font-sans uppercase tracking-[0.3em] text-xs text-gold mb-3"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-12 bg-gold-light opacity-60" />
        <span className="text-gold">✦</span>
        <div className="h-px w-12 bg-gold-light opacity-60" />
      </div>
    </div>
  );
}
