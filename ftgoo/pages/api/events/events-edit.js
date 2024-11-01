import { findEventByID, updateEvent, eventUpdateNotification } from "../mockDatabase";
import { supabase } from '../../../supabaseClient';

export default async function handler(req, res) {
  //console.log(`this is the method: ${req.method} `);
    if (req.method === "POST") {
      const { eventID } = req.body;
      
      try {
        const {data, error} = await supabase
        .from('events')
        .select()
        .eq("eventid", eventID)
        .single()

        if (error) throw error;

        if (data) {
          // get the user data
          return res.status(200).json({ message: "Landing", event: data });
        } else if (!data) {
          return res.status(401).json({ error: "Event does not exist" });
        } else {
          return res.status(401).json({ error: "Event is not there" });
        }
      } catch(err) {
        return res.status(500).json({ error: "Couldnt find event" });
      }
      /*
      const event = findEventByID(eventID);
      if (event) {
        // get the user data
        return res.status(200).json({ message: "Landing", event });
      } else if (!event) {
        return res.status(401).json({ error: "Event does not exist" });
      } else {
        return res.status(401).json({ error: "Event is not there" });
      }*/

    }
    else if(req.method === "PATCH")
    {
      const { 
        eventID,
        eventName,
        urgency,
        address,
        city,
        state,
        zipCode,
        description,
        skills,
        eventDate,
        selectedDay
       } = req.body;

       try {
        const {data, error} = await supabase
        .from('events')
        .update([
          {
          "eventname" : eventName,
          "urgency" : urgency,
          "address" : address,
          "city" : city,
          "state" : state,
          "zipcode" : zipCode,
          "description" : description,
          "skills" : skills,
          "eventdate" : eventDate,
          "day" : selectedDay,
            
          }
        ])
        .eq("eventid", eventID)
        .select()
        .single()

        if (error) throw error;

        if (data) {
          // get the user data
          return res.status(200).json({ message: "Landing", event: data });
        } else if (!data) {
          return res.status(401).json({ error: "Event does not exist" });
        } else {
          return res.status(401).json({ error: "Event is not there" });
        }
      } catch(err) {
        return res.status(500).json({ error: "Couldnt find event" });
      }
      
      //console.log(`this is the body: ${JSON.stringify(req.body)} `);
      const event = findEventByID(eventID);

      if(event)
      {
        event.eventName = eventName;
        event.urgency = urgency;
        event.address = address;
        event.city = city;
        event.state = state;
        event.zipCode = zipCode;
        event.description = description;
        event.skills = skills;
        event.eventDate = eventDate;
        event.day = selectedDay;
        console.log(event);

        updateEvent(event);
        eventUpdateNotification(eventID, eventName, eventDate, selectedDay);
        return res.status(200).json({ message: "Landing", event})
      }
      else{
        return res.status(401).json({ error: "Event does not exist" });
      }
      
    }
    return res.status(405).json({ error: "Method Not Allowed" });
  }