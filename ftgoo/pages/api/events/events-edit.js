import { findEventByID, updateEvent } from "../mockDatabase";

export default function handler(req, res) {
  //console.log(`this is the method: ${req.method} `);
    if (req.method === "POST") {
      const { eventID } = req.body;
      // Mock user data for authentication
      //console.log(`this is the userID: ${userID} `);
      const event = findEventByID(eventID);
      if (event) {
        // get the user data
        return res.status(200).json({ message: "Landing", event });
      } else if (!user) {
        return res.status(401).json({ error: "Event does not exist" });
      } else {
        return res.status(401).json({ error: "Event is not there" });
      }

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
        event.selectedDay = selectedDay;
        console.log(event);

        updateEvent(event);
        return res.status(200).json({ message: "Landing", event})
      }
      else{
        return res.status(401).json({ error: "Event does not exist" });
      }
      
    }
    return res.status(405).json({ error: "Method Not Allowed" });
  }