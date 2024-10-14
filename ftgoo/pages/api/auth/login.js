// pages/api/auth/login.js
import { findUserByEmail } from "../mockDatabase";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Mock user data for authentication
    const user = findUserByEmail(email);

    if (user && user.password === password) {
      // Set user session (for demonstration purposes, we'll use a simple flag)
      user.isLoggedIn = true;

      // Return user details with relevant fields (e.g., userID, role)
      const { userID, role, firstName, lastName } = user;

      return res.status(200).json({
        message: "Login successful",
        user: {
          userID,
          role,
          firstName,
          lastName,
        },
      });
    } else if (!user) {
      return res.status(401).json({ error: "User does not exist" });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  }
  return res.status(405).json({ error: "Method Not Allowed" });
}
