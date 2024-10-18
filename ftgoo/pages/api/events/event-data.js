import { getEvents } from "../mockDatabase";

export default function handler(req, res) {
  //console.log(`this is the method: ${req.method} `);
    if (req.method === "GET") {
      // Mock user data for authentication
      const events = getEvents();

      if (events) {
        // get the user data
        return res.status(200).json({ message: "Landing", events });
      } else{
        return res.status(401).json({ error: "Event does not exist" });
      }
    } 
    return res.status(405).json({ error: "Method Not Allowed" });
  }