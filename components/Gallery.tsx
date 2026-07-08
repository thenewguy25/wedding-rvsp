import Image from "next/image";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  if (images.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-lavender-50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Our Story" />

        <div className="mt-10 columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
          {images.map((src, i) => (
            <div
              key={src}
              className="relative w-full mb-3 overflow-hidden rounded shadow-sm break-inside-avoid"
            >
              <Image
                src={src}
                alt={`Wedding photo ${i + 1}`}
                width={800}
                height={1200}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="text-center">
      <p className="font-sans uppercase tracking-[0.3em] text-xs text-gold mb-3">{title}</p>
      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-12 bg-gold-light opacity-60" />
        <span className="text-gold">✦</span>
        <div className="h-px w-12 bg-gold-light opacity-60" />
      </div>
    </div>
  );
}
