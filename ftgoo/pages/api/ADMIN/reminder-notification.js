import { addReminder } from "../mockDatabase";
export default async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      const {
        userID
      } = req.body;
      
      addReminder(userID);
      return res.status(201).json({ message: `RSVP added successfully!` });
    } catch (error) {
      console.error("Error in handler:", error.message);
      return res.status(400).json({ error: error.message });
    }
  }
  else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

