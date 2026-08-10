import type { NextApiRequest, NextApiResponse } from "next";
import { appendRsvpRow } from "@/lib/sheets";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, attending, plusOneCount, guestNames, kids5to12, kidsUnder5, message } = req.body;

  if (!name || !attending) {
    return res.status(400).json({ error: "Name and attendance are required." });
  }
  if (!email && !phone) {
    return res.status(400).json({ error: "Please provide an email or phone number." });
  }

  const isAttending = attending === "yes";
  const additionalGuests = isAttending ? Math.max(0, Number(plusOneCount) || 0) : 0;
  const kidsMidCount = isAttending ? Math.max(0, Number(kids5to12) || 0) : 0;
  const kidsYoungCount = isAttending ? Math.max(0, Number(kidsUnder5) || 0) : 0;
  const total = isAttending ? 1 + additionalGuests + kidsMidCount + kidsYoungCount : 0;

  try {
    await appendRsvpRow({
      name: String(name),
      email: String(email || ""),
      phone: String(phone || ""),
      attending: isAttending ? "yes" : "no",
      additionalGuests,
      guestNames: isAttending ? String(guestNames || "") : "",
      kids5to12: kidsMidCount,
      kidsUnder5: kidsYoungCount,
      total,
      message: String(message || ""),
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Google Sheets error:", err);
    return res.status(500).json({ error: "Failed to save your RSVP. Please try again." });
  }
}
