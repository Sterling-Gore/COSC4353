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


