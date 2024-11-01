import { supabase } from '../../../supabaseClient';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      email,
      password, // Make sure this is hashed before storing
    } = req.body;

    // Ensure required fields are present
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('password, userid, email, role')
        .eq('email', email)
        .single();
      
      if (error) throw error;
      
      
      if (data && await bcrypt.compare(password, data.password)) {
        // Authentication successful
        return res.status(200).json({ id: data.userid, email: data.email, usertype: data.role });
      } else {
        // Invalid email or password
        return res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (err) {
      console.error("Error logging in:", err);
      return res.status(500).json({ error: "An error occurred during login" });
    }
  } else {
    console.log(`Received ${req.method} request, expected POST.`);
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
