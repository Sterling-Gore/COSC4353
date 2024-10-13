// pages/api/auth/logout.js
import { findUserByEmail } from "../mockDatabase";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    // Find user by email and log them out
    const user = findUserByEmail(email);
    if (user && user.isLoggedIn) {
      user.isLoggedIn = false;
      return res.status(200).json({ message: "Logout successful" });
    } else {
      return res
        .status(400)
        .json({ error: "User not logged in or does not exist" });
    }
  }
  return res.status(405).json({ error: "Method Not Allowed" });
}
