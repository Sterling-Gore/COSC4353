// pages/api/auth/logout.js
import { supabase } from '../../../supabaseClient';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('isloggedin')
        .eq('email', email)
        .single();
      
      if (error) throw error;
      
      if (data && data.isloggedin) {
        // Authentication successful
        data.isloggedin = false;
        return res.status(200).json({ message: "Logout successful" });
      } else {
        return res
        .status(400)
        .json({ error: "User not logged in or does not exist" });
      }
    }
    catch{
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  }
}
