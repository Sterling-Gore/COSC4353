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
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    // Add new user with complete profile details
    const newUser = {
      userID: 5,
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
      isLoggedIn: false,
    };
    addUser(newUser);
    return res
      .status(201)
      .json({ message: "Registration successful", user: newUser });
  }
  return res.status(405).json({ error: "Method Not Allowed" });
}
