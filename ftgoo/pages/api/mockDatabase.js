import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "pages/api/users.json");

// Read users from the file
export const getUsers = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Add a new user and write it to the file
export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
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
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  }
  else
  {
    throw new Error(`User with ID ${userID} not found`);
  }


}
