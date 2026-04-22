import type { NextApiRequest, NextApiResponse } from "next";
import { appendRsvpRow } from "@/lib/sheets";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, attending, guests, meal, message } = req.body;

  if (!name || !email || !attending) {
    return res.status(400).json({ error: "Name, email, and attendance are required." });
  }

  try {
    await appendRsvpRow({
      name: String(name),
      email: String(email),
      attending: attending === "yes" ? "yes" : "no",
      guests: Number(guests) || 1,
      meal: String(meal || ""),
      message: String(message || ""),
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Google Sheets error:", err);
    return res.status(500).json({ error: "Failed to save your RSVP. Please try again." });
  }
}
