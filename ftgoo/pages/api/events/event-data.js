import { getEvents } from "../mockDatabase";
import { supabase } from '../../../supabaseClient';

export default async function handler(req, res) {
  //console.log(`this is the method: ${req.method} `);
    if (req.method === "GET") {
      // Mock user data for authentication
      //const events = getEvents();

      try{
        const {data, error} = await supabase
        .from('events')
        .select()
  
        if (error) throw error;
  
        if (data) {
          // get the user data
          return res.status(201).json({ message: "Pulling Events", events: data });
        } else{
          return res.status(401).json({ error: "Event does not exist" });
        }
        
        
      } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Cant create event"})
      }


    } 
    return res.status(405).json({ error: "Method Not Allowed" });
  }