import { addRSVP, deleteRSVP } from "../mockDatabase";
export default async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      const {
        userID,
        eventID
      } = req.body;
      
      //console.log('Request Body:', body);  // Log the parsed body

      // Make sure addRSVP is awaited if it's asynchronous
      addRSVP(userID, eventID);  // DEBUGGING HERE
      return res.status(201).json({ message: `RSVP added successfully!` });
    } catch (error) {
      console.error("Error in handler:", error.message);
      return res.status(400).json({ error: error.message });
    }
  }
  else if (req.method === "DELETE"){
    try {
      const {
        userID,
        eventID
      } = req.body;
      
      //console.log('Request Body:', body);  // Log the parsed body

      // Make sure addRSVP is awaited if it's asynchronous
      deleteRSVP(userID, eventID);  // DEBUGGING HERE
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

