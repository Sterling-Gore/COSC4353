import { findUserByID } from "../mockDatabase";

export default function handler(req, res) {
  //console.log(`this is the method: ${req.method} `);
    if (req.method === "POST") {
      const { userID } = req.body;
      // Mock user data for authentication
      //console.log(`this is the userID: ${userID} `);
      const user = findUserByID(userID);
      
  
      if (user /*&& user.isLoggedIn == true*/) {
        // get the user data
        return res.status(200).json({ message: "Landing", user });
      } else if (!user) {
        return res.status(401).json({ error: "User does not exist" });
      } else {
        return res.status(401).json({ error: "User is not logged in" });
      }
    }
    return res.status(405).json({ error: "Method Not Allowed" });
  }