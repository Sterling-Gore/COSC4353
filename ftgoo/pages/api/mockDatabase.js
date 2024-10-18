import fs from "fs";
import path from "path";

const userPath = path.resolve(process.cwd(), "pages/api/users.json");
const eventPath = path.resolve(process.cwd(), "pages/api/events.json");

// Read users from the file
export const getUsers = () => {
  try {
    const data = fs.readFileSync(userPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Read events from the file
export const getEvents = () => {
  try {
    const data = fs.readFileSync(eventPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Add a new user and write it to the file
export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(userPath, JSON.stringify(users, null, 2));
};

// Function to write updated data to users.json
export const writeUsers = (users) => {
  try {
    fs.writeFileSync(userPath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing users.json:", error);
  }
};

// Function to write updated RSVP data to users.json
export const addRSVP = (userID, eventID) => {
  const user = findUserByID(userID);

  if (!user) {
    throw new Error(`User with ID ${userID} not found.`);
  }
  if (!user.rsvpEvents.includes(eventID)) {
    user.rsvpEvents.push(eventID);
    updateUser(user);
  } else {
    throw new Error(`RSVP for event ${eventID} already exists for this user.`);
  }
};

// Function to delete updated RSVP data to users.json
export const deleteRSVP = (userID, eventID) => {
  const user = findUserByID(userID);
  if (!user) {
    throw new Error(`User with ID ${userID} not found.`);
  }
  if (user.rsvpEvents.includes(eventID)) {
    user.rsvpEvents = user.rsvpEvents.filter(id => id !== eventID);
    updateUser(user);
  } else {
    throw new Error(`RSVP for event ${eventID} does not exist for this user.`);
  }
}

// Find a user by email
export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find((user) => user.email === email);
};

// Find a user by userID
export const findUserByID = (userID) => {
  const users = getUsers();
  return users.find((user) => user.userID == userID);
};

// Update a user with a updatedUser
export const updateUser = (updatedUser) => {
  const users = getUsers();
  const userIndex = users.findIndex((user) => user.userID == updatedUser.userID)
  if (userIndex !== -1)
  {
    users[userIndex] = updatedUser;
    fs.writeFileSync(userPath, JSON.stringify(users, null, 2));
  }
  else
  {
    throw new Error(`User with ID ${userID} not found`);
  }


};

// Event Management
// Add a new event and write it to the file
export const addEvent = (event) => {
  const events = getEvents();
  events.push(event);
  fs.writeFileSync(eventPath, JSON.stringify(events, null, 2));
};

// Find an event by ID
export const findEventByID = (eventID) => {
  const events = getEvents();
  return events.find((event) => event.eventID == eventID);
};

// Update event details
export const updateEvent = (updatedEvent) => {
  const events = getEvents();
  const eventIndex = events.findIndex((event) => event.eventID == updatedEvent.eventID);

  if (eventIndex !== -1) {
    events[eventIndex] = updatedEvent;
    fs.writeFileSync(eventPath, JSON.stringify(events, null, 2));
  } else {
    throw new Error(`Event with ID ${updatedEvent.eventID} not found`);
  }
};

// Function to find matching skills
export const volunteerMatchOnEventCreation = (eventID, eventName, eventDate, day, skills) => {
  const users = getUsers();
  for (let i = 0; i < users.length; i++)
  {
    if( skills.every( skill => users[i].skills.includes(skill)) && users[i].availability.includes(day))
    {
      const newNotification = {
        eventID: eventID,
        eventName: eventName,
        eventDate: eventDate,
        notificationDate: new Date().toISOString().split('T')[0],
        day: day,
        notificationType: "New Event",
        status: "This event matches your skills and availability!"
      }
      users[i].notifications.push(newNotification);
      updateUser(users[i])
    }
  }
};

// Function to add update notifications to users
export const eventUpdateNotification = (eventID, eventName, eventDate, day ) => {
  const users = getUsers();
  for (let i = 0; i < users.length; i++)
  {
    //console.log(`${eventID}:  Name=${users[i].firstName}  Events=${users[i].rsvpEvents}`);
    if( users[i].rsvpEvents.includes(eventID))
    {
      const newNotification = {
        eventID: eventID,
        eventName: eventName,
        eventDate: eventDate,
        notificationDate: new Date().toISOString().split('T')[0],
        day: day,
        notificationType: "Event Update",
        status: "An RSVP'd event has been updated!"
      }
      users[i].notifications.push(newNotification);
      updateUser(users[i])
    }
  }
};

// Function to add reminder notifications to users
export const addReminder = (userID) => {
  const user = findUserByID(userID);
  const rsvpEvents = user.rsvpEvents;
  const events = getEvents();
  
  const matchedEvents = events.filter(event => rsvpEvents.includes(event.eventID));
  
  const originalToday = new Date();
  //the -5 is used to match the time zone to CTE
  const today = new Date(originalToday.getTime() - 5 * 60 * 60 * 1000);

  const oneDayInMs = 24 * 60 * 60 * 1000; // Milliseconds in one day
  
  // Read existing notifications from the file

  matchedEvents.forEach(event => {
    const eventDate = new Date(event.eventDate); // Convert eventDate string to Date object
    
    // Check if the event is one day from today
    if ((eventDate - today) <= oneDayInMs && (eventDate - today) > 0) {
      // Create the reminderNotification object
      const reminderNotification = {
        userID: userID,
        eventID: event.eventID,
        eventName: event.eventName,
        eventDate: event.eventDate,
        notificationDate: new Date().toISOString().split('T')[0], // Only year, month, day
        day: event.day,
        notificationType: "Reminder",
        status: "This event is occurring soon, make sure to arrive by the event's time!"
      };

      // Check if this notification already exists in the notifications array
      const notificationExists = user.notifications.some(
        notif => notif.userID === userID && notif.eventID === reminderNotification.eventID
      );

      // Only add the notification if it doesn't already exist
      if (!notificationExists) {
        user.notifications.push(reminderNotification);
        // Write the updated notifications array back to the file
        updateUser(user);
      }
    }
  });
};
