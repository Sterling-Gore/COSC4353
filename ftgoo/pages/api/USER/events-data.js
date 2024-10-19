import { getEvents } from "../mockDatabase";

export default function handler(req, res) {
  if (req.method === "GET") {
    const events = getEvents();

    // Check if events array is empty
    if (events && events.length > 0) {
      return res.status(200).json({ message: "Landing", events });
    } else {
      return res.status(401).json({ error: "volunteers do not exist" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
