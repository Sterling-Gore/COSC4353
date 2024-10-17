// pages/api/auth/registration.js
import { getUsers, addUser, findUserByEmail } from "../mockDatabase";

export default function handler(req, res) {
  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      email,
      password,
      address1,
      address2,
      city,
      state,
      zipCode,
      skills,
      preferences,
      availability,
    } = req.body;

    // Check if user already exists before proceeding to step 2
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      console.log("User with this email already exists:", email);
      return res.status(400).json({
        error:
          "User with this email already exists. Please use a different email.",
      });
    }

    // Basic validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !address1 ||
      !city ||
      !state ||
      !zipCode ||
      !skills ||
      !preferences ||
      !availability
    ) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      console.log("Password validation failed");
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    // Generate a unique userID
    const users = getUsers();
    const newUserID = users.length > 0 ? users[users.length - 1].userID + 1 : 1;

    // Add new user with complete profile details, including role as 'user'
    const newUser = {
      userID: newUserID,
      firstName,
      lastName,
      email,
      password,
      address1,
      address2,
      city,
      state,
      zipCode,
      skills,
      preferences,
      availability,
      role: "user", // Add the role as 'user'
      isLoggedIn: false,
      rsvpEvents: [],
      oldEvents: [],
      notifications: [],
    };

    console.log("Creating new user:", newUser);
    addUser(newUser);

    // Set isLoggedIn to true to indicate that the user has just registered
    newUser.isLoggedIn = true;

    return res
      .status(201)
      .json({ message: "Registration successful", user: newUser });
  }

  console.log("Method not allowed");
  return res.status(405).json({ error: "Method Not Allowed" });
}
