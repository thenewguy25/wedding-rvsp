const VENMO_HANDLE = "JieYing-Liao";
const VENMO_URL = `https://venmo.com/u/${VENMO_HANDLE}`;
const VENMO_QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(
  VENMO_URL
)}`;

const ZELLE_NAME = "JieYing Liao";
const ZELLE_CONTACT = "jieying32@gmail.com";

export default function Honeymoon() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-2xl mx-auto">
        <SectionHeading title="Honeymoon Fund" />

        <p className="mt-8 text-center font-sans text-sm text-lavender-500 max-w-md mx-auto leading-relaxed">
          Your presence at our wedding is the greatest gift of all. But if you&apos;d like to help
          send us off on our next adventure together, a contribution to our honeymoon fund would
          mean the world to us.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {/* Venmo — live */}
          <div className="rounded-2xl border border-lavender-200 bg-white p-8 text-center shadow-sm">
            <p className="font-sans text-xs uppercase tracking-widest text-lavender-400 mb-2">
              Venmo
            </p>
            <h3 className="font-serif text-xl text-rose-deep mb-4">@{VENMO_HANDLE}</h3>

            <img
              src={VENMO_QR_SRC}
              alt="Scan to pay on Venmo"
              width={160}
              height={160}
              className="mx-auto mb-4 rounded-lg border border-lavender-100"
            />

            <a
              href={VENMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-gold hover:bg-gold-dark text-white font-sans text-xs uppercase tracking-[0.2em] py-3 rounded-sm transition-colors duration-200"
            >
              Pay on Venmo
            </a>
          </div>

          {/* Zelle */}
          <div className="rounded-2xl border border-lavender-200 bg-white p-8 text-center shadow-sm">
            <p className="font-sans text-xs uppercase tracking-widest text-lavender-400 mb-2">
              Zelle
            </p>
            <h3 className="font-serif text-xl text-rose-deep mb-4">{ZELLE_NAME}</h3>

            <div className="mx-auto mb-4 w-[160px] h-[160px] rounded-lg border border-lavender-100 flex items-center justify-center bg-lavender-50 px-3">
              <span className="font-sans text-sm text-rose-deep break-all">{ZELLE_CONTACT}</span>
            </div>

            <p className="font-sans text-xs text-lavender-400 leading-relaxed">
              Send via Zelle in your banking app using the email above.
            </p>
          </div>
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
