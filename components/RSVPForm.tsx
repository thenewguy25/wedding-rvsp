import { useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  attending: "yes" | "no" | "";
  plusOneCount: string;
  guestNames: string[];
  kids5to12: string;
  kidsUnder5: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  attending: "",
  plusOneCount: "0",
  guestNames: [],
  kids5to12: "0",
  kidsUnder5: "0",
  message: "",
};

export default function RSVPForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [touchedSubmit, setTouchedSubmit] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setCount = (name: "plusOneCount" | "kids5to12" | "kidsUnder5", delta: number) => {
    setForm((prev) => {
      const next = Math.min(10, Math.max(0, Number(prev[name]) + delta));
      if (name === "plusOneCount") {
        const guestNames = Array.from({ length: next }, (_, i) => prev.guestNames[i] ?? "");
        return { ...prev, plusOneCount: String(next), guestNames };
      }
      return { ...prev, [name]: String(next) };
    });
  };

  const handleGuestNameChange = (index: number, value: string) => {
    setForm((prev) => {
      const guestNames = [...prev.guestNames];
      guestNames[index] = value;
      return { ...prev, guestNames };
    });
  };

  const contactMissing = !form.email && !form.phone;
  const showContactError = touchedSubmit && contactMissing;

  const totalGuests =
    form.attending === "yes"
      ? 1 + Number(form.plusOneCount || 0) + Number(form.kids5to12 || 0) + Number(form.kidsUnder5 || 0)
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedSubmit(true);
    if (!form.name || !form.attending || contactMissing) return;

    setSubmitState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          guestNames: form.guestNames.map((n) => n.trim()).filter(Boolean).join(", "),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setSubmitState("success");
      setForm(EMPTY_FORM);
      setTouchedSubmit(false);
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
            <p className="font-sans text-sm text-lavender-500">
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
        <p className="mt-6 text-center font-sans text-sm text-lavender-500">
          Just a few quick questions — it only takes a minute.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-10">
          {/* Step 1: Contact info */}
          <FormStep number={1} title="Your Info">
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={inputClass}
                />
                {touchedSubmit && !form.name && (
                  <p className={errorTextClass}>Please enter your name.</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className={inputClass}
                />
              </div>

              <p className={showContactError ? errorTextClass : hintTextClass}>
                {showContactError
                  ? "Please fill in at least one — email or phone."
                  : "Please fill in at least one of email or phone, so we can reach you."}
              </p>
            </div>
          </FormStep>

          {/* Step 2: Attending */}
          <FormStep number={2} title="Will You Be There?">
            <div className="flex gap-3">
              {(["yes", "no"] as const).map((val) => {
                const selected = form.attending === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, attending: val }))}
                    className={`flex-1 rounded-sm border py-4 px-3 font-sans text-sm text-center transition-colors duration-150 ${
                      selected
                        ? "bg-gold border-gold text-white"
                        : "bg-lavender-50 border-lavender-100 text-rose-deep hover:border-gold"
                    }`}
                  >
                    {val === "yes" ? "🎉 Yes, I'll be there!" : "😢 Sorry, can't make it"}
                  </button>
                );
              })}
            </div>
            {touchedSubmit && !form.attending && (
              <p className={errorTextClass}>Please let us know if you can make it.</p>
            )}
          </FormStep>

          {/* Step 3: Guests — only relevant once they've said yes */}
          {form.attending === "yes" && (
            <FormStep number={3} title="Who's Coming With You?">
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Additional Adults</label>
                  <p className={hintTextClass}>Not counting yourself.</p>
                  <Stepper
                    value={Number(form.plusOneCount)}
                    onDecrement={() => setCount("plusOneCount", -1)}
                    onIncrement={() => setCount("plusOneCount", 1)}
                  />
                </div>

                {form.guestNames.length > 0 && (
                  <div className="space-y-3">
                    {form.guestNames.map((guestName, i) => (
                      <div key={i}>
                        <label className={labelClass}>Guest {i + 1} Name</label>
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => handleGuestNameChange(i, e.target.value)}
                          placeholder="Full name"
                          className={inputClass}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 border-t border-lavender-100">
                  <p className={hintTextClass + " mb-3"}>
                    Bringing little ones? Our venue&apos;s pricing is different for each age group,
                    so a headcount by age helps us plan seating, meals, and budget accurately.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Kids Ages 5–12</label>
                      <Stepper
                        value={Number(form.kids5to12)}
                        onDecrement={() => setCount("kids5to12", -1)}
                        onIncrement={() => setCount("kids5to12", 1)}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Kids Under 5</label>
                      <Stepper
                        value={Number(form.kidsUnder5)}
                        onDecrement={() => setCount("kidsUnder5", -1)}
                        onIncrement={() => setCount("kidsUnder5", 1)}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-sm bg-lavender-50 border border-lavender-100 px-4 py-3 text-center">
                  <span className="font-sans text-xs uppercase tracking-widest text-lavender-500">
                    Total Attending in Your Party:{" "}
                  </span>
                  <span className="font-serif text-lg text-rose-deep">{totalGuests}</span>
                </div>
              </div>
            </FormStep>
          )}

          {/* Step 4: Message */}
          <FormStep number={form.attending === "yes" ? 4 : 3} title="Anything Else?" optional>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Share your well wishes… (optional)"
              className={inputClass}
            />
          </FormStep>

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

function Stepper({
  value,
  onDecrement,
  onIncrement,
}: {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= 0}
        aria-label="Decrease"
        className="w-10 h-10 rounded-full border border-lavender-200 text-rose-deep text-lg font-sans flex items-center justify-center disabled:opacity-30 hover:border-gold transition-colors"
      >
        −
      </button>
      <span className="font-serif text-xl text-rose-deep w-6 text-center tabular-nums">{value}</span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={value >= 10}
        aria-label="Increase"
        className="w-10 h-10 rounded-full border border-lavender-200 text-rose-deep text-lg font-sans flex items-center justify-center disabled:opacity-30 hover:border-gold transition-colors"
      >
        +
      </button>
    </div>
  );
}

function FormStep({
  number,
  title,
  optional,
  children,
}: {
  number: number;
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-6 h-6 rounded-full bg-gold text-white text-xs font-sans flex items-center justify-center shrink-0">
          {number}
        </span>
        <h3 className="font-serif text-lg text-rose-deep">{title}</h3>
        {optional && (
          <span className="font-sans text-xs uppercase tracking-widest text-lavender-300">
            (optional)
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

const labelClass = "block font-sans text-xs uppercase tracking-widest text-lavender-500 mb-1";
const hintTextClass = "font-sans text-xs text-lavender-400 mt-1";
const errorTextClass = "font-sans text-xs text-red-500 mt-1";
const inputClass =
  "w-full font-sans text-sm text-rose-deep bg-lavender-50 border border-lavender-100 rounded-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold placeholder-lavender-200";

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
