import fs from "fs";
import path from "path";

const userPath = path.resolve(process.cwd(), "pages/api/users.json");
const eventPath = path.resolve(process.cwd(), "pages/api/events.json");
const notificationsPath = path.resolve(process.cwd(), "pages/api/notifications.json");

// Read users from the file
export const getUsers = () => {
  try {
    const data = fs.readFileSync(userPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

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

export const deleteRSVP = (userID, eventID) => {
  const user = findUserByID(userID);
  console.log(user);
  if (!user) {
    throw new Error(`User with ID ${userID} not found.`);
  }
  if (user.rsvpEvents.includes(eventID)) {
    user.rsvpEvents = user.rsvpEvents.filter(id => id !== eventID);
    console.log(user);
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

export const findUserByID = (userID) => {
  const users = getUsers();
  return users.find((user) => user.userID == userID);
};

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



//notifications

export const volunteerMatchOnEventCreation = (eventID, eventName, eventDate, day, skills, ) => {
  const users = getUsers();
  for (let i = 0; i < users.length; i++)
  {
    if( skills.every( skill => users[i].skills.includes(skill)) && users[i].availability.includes(day))
    {
      const newNotification = {
        eventID: eventID,
        eventName: eventName,
        eventDate: eventDate,
        day: day,
        notificationType: "New Event",
        status: "This event matches your skills and availability!"
      }
      users[i].notifications.push(newNotification);
      updateUser(users[i])
    }
  }

};


export const eventUpdateNotification = (eventID, eventName, eventDate ) => {
  const users = getUsers();
  for (let i = 0; i < users.length; i++)
  {
    if( users[i].rsvpEvents.includes(eventID))
    {
      const newNotification = {
        eventID: eventID,
        eventName: eventName,
        eventDate: eventDate,
        day: day,
        notificationType: "Event Update",
        status: "An RSVP'd event has been updated!"
      }
      users[i].notifications.push(newNotification);
      updateUser(users[i])
    }
  }

};
