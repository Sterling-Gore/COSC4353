import { supabase } from '../../../supabaseClient';

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      const { userID } = req.body;

      const { data: rsvpdata, error: rsvperror } = await supabase
        .from('users')
        .select('rsvpevents')
        .eq('userid', userID)
        .single();
      if (rsvperror) throw rsvperror;

      const { data: notificationsdata, error: notificationserror } = await supabase
        .from('users')
        .select('notifications')
        .eq('userid', userID)
        .single();
      if (notificationserror) throw notificationserror;

      const { data: eventsdata, error: eventserror } = await supabase
        .from('events')
        .select('*');
      if (eventserror) throw eventserror;

      const matchedEvents = eventsdata.filter(event => rsvpdata.rsvpevents.includes(event.eventid));
  
      const originalToday = new Date();
      const today = new Date(originalToday.getTime() - 5 * 60 * 60 * 1000);
      const oneDayInMs = 24 * 60 * 60 * 1000; // Milliseconds in one day

      for (const event of matchedEvents) {
        const eventDate = new Date(event.eventdate);

        if ((eventDate - today) <= oneDayInMs && (eventDate - today) > 0) {
          const reminderNotification = {
            eventID: event.eventid,
            eventName: event.eventname,
            eventDate: event.eventdate,
            notificationDate: "2024-11-01",
            day: event.day,
            notificationType: "Reminder",
            status: "This event is coming up soon, please show up to the event on time!"
          };

          const notificationExists = notificationsdata.notifications.some(
            notif => notif.eventID === reminderNotification.eventID
          );

          if (!notificationExists) {
            notificationsdata.notifications.push(reminderNotification);

            const { data: addreminder, error: addremindererror } = await supabase
              .from('users')
              .update(notificationsdata)
              .eq('userid', userID);
            if (addremindererror) throw addremindererror;
            window.location.reload();
          }
        }
      }
      return res.status(201).json({ message: "Reminder notification added successfully!" });
    } catch (error) {
      console.error("Error in handler:", error.message);
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

