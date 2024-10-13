


export default function handler(req, res) {
    if (req.method === "GET") {
      const { email, password } = req.body;
  
      // Mock user data for authentication
      const user = findUserByEmail(email);
  
      if (user && user.password === password) {
        // Set user session (for demonstration purposes, we'll use a simple flag)
        user.isLoggedIn = true;
        return res.status(200).json({ message: "Login successful", user });
      } else if (!user) {
        return res.status(401).json({ error: "User does not exist" });
      } else {
        return res.status(401).json({ error: "Invalid email or password" });
      }
    }
    return res.status(405).json({ error: "Method Not Allowed" });
  }