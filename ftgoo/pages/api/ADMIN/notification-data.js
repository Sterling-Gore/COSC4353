import { getNotifications } from "../mockDatabase";

export default function handler(req, res) {
  //console.log(`this is the method: ${req.method} `);
    if (req.method === "GET") {
      // Mock user data for authentication
      const notifications = getNotifications();
      //console.log(volunteers);
      //return res.status(401);
      
        
      if (notifications) {
        // get the user data
        return res.status(200).json({ message: "Landing" , notifications });
      } else{
        return res.status(401).json({ error: "volunteers do not exist" });
      }
    } 
    return res.status(405).json({ error: "Method Not Allowed" });
  }