import { getUsers, getEvents } from "../mockDatabase";
import { supabase } from '../../../supabaseClient';

export default async function handler(req, res) {
  //console.log(`this is the method: ${req.method} `);
    if (req.method === "GET") {
      // Mock user data for authentication

      try {
        const {data: volunteers, UsersError} = await supabase
        .from('users')
        .select()
        .eq('role', 'user')

        if (UsersError) throw UsersError;

        const {data: events, EventsError} = await supabase
        .from('events')
        .select()

        if (EventsError) throw EventsError;






        


        if (volunteers && events) {
          // get the user data
          return res.status(200).json({ message: "Landing", volunteers: volunteers, events : events});
        } else{
          return res.status(401).json({ error: "volunteers do not exist" });
        }
      }catch(err){
        console.log(err)
        return res.status(500).json({ error: "Cant get data"})
      }

      /*
      const users = getUsers();
      const events = getEvents();
      const volunteers = users.filter((user) => user.role === 'user');
      //console.log(volunteers);
      //return res.status(401);
      
        
      if (volunteers && events) {
        // get the user data
        return res.status(200).json({ message: "Landing", volunteers, events });
      } else{
        return res.status(401).json({ error: "volunteers do not exist" });
      }
        */
    } 
    return res.status(405).json({ error: "Method Not Allowed" });
  }