// pages/api/auth/registration.js
import { getEvents, addEvent, findEventByID, volunteerMatchOnEventCreation } from "../mockDatabase";
import { supabase } from '../../../supabaseClient';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      eventName,
      urgency,
      address,
      city,
      state,
      zipCode,
      description,
      skills,
      eventDate,
      selectedDay,
    } = req.body;

    // Basic validation
    if (
      !eventName ||
      !urgency ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !description ||
      !skills ||
      !eventDate ||
      !selectedDay 
    ) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists before proceeding to step 2
    //const existingEvent = findEventByID(eventName);
    //if (existingEvent) {
    //  console.log("This event already exists", eventName);
    //  return res.status(400).json({
    //    error:
    //      "This event already exists. Please create a new event.",
    //  });
    //}

    // Generate a unique userID
    const events = getEvents();
    const newEventID = events.length > 0 ? events[events.length - 1].eventID + 1 : 1;
    const eventname = eventName;
    const zipcode = zipCode;
    const eventdate = eventDate;
    const day = selectedDay
    try{
      const {data, error} = await supabase
      .from('events')
      .insert([
        {
          eventname,
          urgency,
          address,
          city,
          state,
          zipcode,
          description,
          skills,
          eventdate,
          day,
        }
      ]).select()
      .single()

      if (error) throw error;

      const {data: volunteers, volunteerError} = await supabase
      .from('users')
      .select()
      .eq("role", "user")

      const eventid = data.eventid;
      console.log(`This is the eventid ${eventid}`)
      console.log(`This is the event data ${JSON.stringify(data)}`)
      if (volunteerError) throw volunteerError;
      console.log(`VOLUNTEERS ARE RIGHT HERE: ${volunteers}`)

      for (let i = 0; i < volunteers.length; i++)
        {
          if( skills.every( skill => volunteers[i].skills.includes(skill)) && volunteers[i].availability.includes(day) )
          {
            const newNotification = {
              eventID: eventid,
              eventName: eventName,
              eventDate: eventDate,
              notificationDate: new Date().toISOString().split('T')[0],
              day: day,
              notificationType: "New Event",
              status: "This event matches your skills and availability!"
            }
            volunteers[i].notifications.push(newNotification);

            //updateUser(volunteers[i])
            const {matchingError} = await supabase
            .from('users')
            .update({"notifications" : volunteers[i].notifications})
            .eq("userid", volunteers[i].userid)

            if (matchingError) throw matchingError;
          }
        }



      



      return res
      .status(201)
      .json({ message: "Event Created", event: data });

    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: "Cant create event"})
    }

    

    // need to make the volunteer matching
    /*
    const newEvent = {
      eventID: newEventID,
      eventName,
      urgency,
      address,
      city,
      state,
      zipCode,
      skills,
      description,
      eventDate,
      day: selectedDay,
    };

    console.log("Creating new event:", newEvent);
    addEvent(newEvent);

    //volunteerMatch
    volunteerMatchOnEventCreation(newEventID, eventName, eventDate, selectedDay, skills);

    // Set isLoggedIn to true to indicate that the user has just registered
    newEvent.isCreated = true;

    return res
      .status(201)
      .json({ message: "Event Created", event: newEvent });
      */
  }

  console.log("Method not allowed");
  return res.status(405).json({ error: "Method Not Allowed" });
}
