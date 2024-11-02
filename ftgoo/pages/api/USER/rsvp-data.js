import { addRSVP, deleteRSVP } from "../mockDatabase";
import { supabase } from '../../../supabaseClient';

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const {
      userID,
      eventID
    } = req.body;

    try {    
      console.log(userID, eventID);
      const { data, error } = await supabase
        .from('users')
        .select('rsvpevents')
        .eq('userid', userID)
        .single();
      
      if (error) throw error;

      // Step 2: Check if eventID is already in rsvpevents
      const rsvpevents = data.rsvpevents || [];
      if (rsvpevents.includes(eventID)) {
        return res.status(409).json({ error: "User has already RSVP'd to this event." });
      }

      data.rsvpevents.push(eventID);

      const {data: newdata, updateerror} = await supabase
        .from('users')
        .update(data)
        .eq('userid', userID)
        .select('rsvpevents')

        if (updateerror) throw updateerror;

        if (newdata){
          window.location.reload();
          return res.status(201).json({ message: `RSVP added successfully!` });
        }
        else if (!newdata){
          return res.status(401).json({ error: "Event does not exist" });
        }
    } catch (error) {
      console.error("Error in handler:", error.message);
      return res.status(400).json({ error: error.message });
    }
  }
  else if (req.method === "DELETE") {
    const {
      userID,
      eventID
    } = req.body;

    try {    
      console.log(userID, eventID);
      const { data, error } = await supabase
        .from('users')
        .select('rsvpevents')
        .eq('userid', userID)
        .single();
      
      if (error) throw error;

      // Step 2: Check if eventID is already in rsvpevents
      const rsvpevents = data.rsvpevents || [];
      if (!rsvpevents.includes(eventID)) {
        return res.status(409).json({ error: "User has not RSVP'd to this event." });
      }

      const updatedRsvpevents = data.rsvpevents.filter(id => id !== eventID);

      console.log(updatedRsvpevents);
      const {data: newdata, updateerror} = await supabase
        .from('users')
        .update({rsvpevents: updatedRsvpevents})
        .eq('userid', userID)
        .select('rsvpevents')

        if (updateerror) throw updateerror;

        if (newdata){
          window.location.reload();
          return res.status(201).json({ message: `RSVP removed successfully!` });
        }
        else if (!newdata){
          return res.status(401).json({ error: "Event does not exist" });
        }
    } catch (error) {
      console.error("Error in handler:", error.message);
      return res.status(400).json({ error: error.message });
    }
  }
  else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

