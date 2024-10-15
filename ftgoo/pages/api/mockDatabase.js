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

