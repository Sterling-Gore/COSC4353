
import { findUserByID, updateUser } from "../mockDatabase";

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
    else if(req.method === "PATCH")
    {
      const { 
      userID,
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zipCode,
      skills,
      availability,
      preferences,
       } = req.body;
      
      //console.log(`this is the body: ${JSON.stringify(req.body)} `);
      const user = findUserByID(userID);

      if(user)
      {
        user.firstName = firstName;
        user.lastName = lastName;
        user.address1 = address1;
        user.address2 = address2;
        user.city = city;
        user.state = state;
        user.zipCode = zipCode;
        user.skills = skills;
        user.availability = availability;
        user.preferences = preferences;
        console.log(user);

        updateUser(user);
        return res.status(200).json({ message: "Landing", user})
      }
      else{
        return res.status(401).json({ error: "User does not exist" });
      }
      
    }
    return res.status(405).json({ error: "Method Not Allowed" });
  }