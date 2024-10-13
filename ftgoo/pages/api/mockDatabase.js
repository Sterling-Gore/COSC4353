import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "pages/api/auth/users.json");

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
