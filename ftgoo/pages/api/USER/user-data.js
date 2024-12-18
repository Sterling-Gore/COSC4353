import { supabase } from '../../../supabaseClient';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      userID,
    } = req.body;

    // Ensure required fields are present
    if (!userID) {
      return res.status(400).json({ error: "No userID is found." });
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('email, firstname, lastname, address1, address2, city, state, zipcode, preferences, role, skills, availability, rsvpevents, oldevents, notifications')
        .eq('userid', userID)
        .single();
      
      if (error) throw error;
      
      if (data){
        return res.status(200).json({ email: data.email, id: data.userid, firstname: data.firstname, lastname: data.lastname, 
          address1: data.address1, address2: data.address2, city: data.city, state: data.state, zipcode: data.zipcode, 
          preferences: data.preferences, skills: data.skills, availability: data.availability, rsvpevents: data.rsvpevents, 
          oldevents: data.oldevents, notifications: data.notifications, usertype: data.role });
      } else {
        // Invalid email or password
        return res.status(401).json({ error: "The userID does not exist." });
      }
    } catch (err) {
      return res.status(500).json({ error: "An error occurred getting user data." });
    }
  } else if (req.method === "PATCH"){
    // SOMEONE DO THIS LMAO
    const { 
        userID,
        userEmail,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zipCode,
        preferences,
        skills,
        availability,
    } = req.body;

    try {    
      console.log(userID);
      const {data, error} = await supabase
        .from('users')
        .update([{
          'email': userEmail,
          'firstname': firstName,
          'lastname' : lastName,
          'address1' : address1,
          'address2' : address2,
          'city' : city,
          'state' : state,
          'zipcode' : zipCode,
          'preferences' : preferences,
          'skills' : skills,
          'availability' : availability,
        }])
        .eq('userid', userID)
        .select()
        .single()
        
        if (error) throw error;

        if (data) {
          // get the user data
          return res.status(200).json({ message: "Landing", event: data });
        } else if (!data){
          return res.status(401).json({ error: "An error occurred updating user data." });
        }
    } catch (error) {
      console.error("Error in handler:", error.message);
      return res.status(400).json({ error: error.message });
    }
  }
  else {
    console.log(`Received ${req.method} request, expected POST.`);
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
