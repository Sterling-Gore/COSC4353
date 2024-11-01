import { supabase } from '../../../supabaseClient';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      userid,
    } = req.body;

    // Ensure required fields are present
    if (!userid) {
      return res.status(400).json({ error: "No userID is found." });
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('email, firstname, lastname, role')
        .eq('userid', userid)
        .single();
      
      if (error) throw error;
       
      if (data){
        return res.status(200).json({ id: data.userid, email: data.email, usertype: data.role });
      } else {
        // Invalid email or password
        return res.status(401).json({ error: "The userID does not exist." });
      }
    } catch (err) {
      return res.status(500).json({ error: "An error occurred getting user data." });
    }
  } else {
    console.log(`Received ${req.method} request, expected POST.`);
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
