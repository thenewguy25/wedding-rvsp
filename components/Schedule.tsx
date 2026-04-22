const events = [
  {
    time: "9:30 AM",
    title: "Guest Arrival",
    description: "Welcome! Please find your seat.",
  },
  {
    time: "10:00 AM",
    title: "Ceremony",
    description: "Join us as we exchange our vows.",
  },
  {
    time: "11:00 AM",
    title: "Cocktail Hour",
    description: "Celebrate with drinks and hors d'oeuvres.",
  },
  {
    time: "12:00 PM",
    title: "Reception & Lunch",
    description: "Lunch, toasts, and dancing to follow.",
  },
  {
    time: "4:00 PM",
    title: "Send-off",
    description: "Help us celebrate as we head into forever.",
  },
];

export default function Schedule() {
  return (
    <section className="py-24 px-6 bg-blush-50">
      <div className="max-w-2xl mx-auto">
        <SectionHeading title="The Day" />

        <div className="relative mt-12">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-blush-200" />

          <div className="flex flex-col gap-10">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={event.title}
                  className={`relative flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`w-5/12 ${isLeft ? "text-right pr-6" : "text-left pl-6"}`}>
                    <p className="font-sans text-xs uppercase tracking-widest text-gold mb-1">
                      {event.time}
                    </p>
                    <h3 className="font-serif text-lg text-rose-deep">{event.title}</h3>
                    <p className="font-sans text-sm text-blush-400 mt-1">{event.description}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold border-2 border-cream" />

                  {/* Spacer */}
                  <div className="w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="text-center">
      <p className="font-sans uppercase tracking-[0.3em] text-xs text-gold mb-3">
        {title}
      </p>
      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-12 bg-gold-light opacity-60" />
        <span className="text-gold">✦</span>
        <div className="h-px w-12 bg-gold-light opacity-60" />
      </div>
    </div>
  );
}
