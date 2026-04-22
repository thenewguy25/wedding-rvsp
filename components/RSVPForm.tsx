import { useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  attending: "yes" | "no" | "";
  guests: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  attending: "",
  guests: "1",
  message: "",
};

export default function RSVPForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.attending) return;

    setSubmitState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, meal: "" }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setSubmitState("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setSubmitState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (submitState === "success") {
    return (
      <section className="py-24 px-6 bg-cream" id="rsvp">
        <div className="max-w-lg mx-auto text-center">
          <SectionHeading title="RSVP" />
          <div className="mt-12">
            <p className="text-5xl mb-4">✉️</p>
            <h3 className="font-serif text-2xl text-rose-deep mb-3">We can&apos;t wait to see you!</h3>
            <p className="font-sans text-sm text-blush-400">
              Your RSVP has been received. We&apos;ll be in touch with more details.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-cream" id="rsvp">
      <div className="max-w-lg mx-auto">
        <SectionHeading title="RSVP" />

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          {/* Name */}
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email *</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>

          {/* Attending */}
          <div>
            <label className={labelClass}>Will you be attending? *</label>
            <div className="flex gap-4 mt-1">
              {(["yes", "no"] as const).map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value={val}
                    checked={form.attending === val}
                    onChange={handleChange}
                    className="accent-gold"
                  />
                  <span className="font-sans text-sm text-rose-deep capitalize">
                    {val === "yes" ? "Joyfully accepts" : "Regretfully declines"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {form.attending === "yes" && (
          <div>
              <label className={labelClass}>Number of Guests (including yourself)</label>
              <select name="guests" value={form.guests} onChange={handleChange} className={inputClass}>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          )}

          {/* Message */}
          <div>
            <label className={labelClass}>Message for the Couple (optional)</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Share your well wishes…"
              className={inputClass}
            />
          </div>

          {/* Error */}
          {submitState === "error" && (
            <p className="text-sm text-red-500">{errorMsg}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitState === "loading"}
            className="w-full bg-gold hover:bg-gold-dark disabled:opacity-50 text-white font-sans text-xs uppercase tracking-[0.2em] py-4 rounded-sm transition-colors duration-200"
          >
            {submitState === "loading" ? "Sending…" : "Send RSVP"}
          </button>
        </form>
      </div>
    </section>
  );
}

const labelClass = "block font-sans text-xs uppercase tracking-widest text-blush-400 mb-1";
const inputClass =
  "w-full font-sans text-sm text-rose-deep bg-blush-50 border border-blush-100 rounded-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold placeholder-blush-200";

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
