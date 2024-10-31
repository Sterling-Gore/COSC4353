import { supabase } from '../../../supabaseClient';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      firstname,
      lastname,
      email,
      password, // Make sure this is hashed before storing
      address1,
      address2,
      city,
      state,
      zipcode,
      preferences,
      skills,
      availability,
    } = req.body;

    // Ensure required fields are present
    if (!firstname || !lastname || !email || !password || !address1 || !city || !state || !zipcode) {
      return res.status(400).json({ error: "Please fill in all required fields" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            firstname,
            lastname,
            email,
            password: hashedPassword, // hash before storing
            address1,
            address2,
            city,
            state,
            zipcode,
            preferences: preferences || null,
            role: "user",
            skills: skills.length > 0 ? skills : [],
            availability: availability || [],
            isloggedin: false,
            rsvpevents: [],
            oldevents: [],
            notifications: [],
          },
        ]);

      if (error) throw error;

      // Send the created user ID and email back as a response
      return res.status(200).json({ id: data[0].id, email: data[0].email });
    } catch (err) {
      return res.status(500).json({ error: "A user with this account has already been made!" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
