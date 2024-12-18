// pages/user/[userID]/account/index.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

export default function Account() {
  const router = useRouter();
  const { userID } = router.query; // Extract userID from query params
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [skills, setSkills] = useState([]);
  const [preferences, setPreferences] = useState("");
  const [availability, setAvailability] = useState([]);
  const [error, setError] = useState("");
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showAvailabilityDropdown, setShowAvailabilityDropdown] = useState(false);

  useEffect(() => {
    // Mock check for user login status
    const loggedInUser = localStorage.getItem("userEmail");
    if (loggedInUser) {
      setUserEmail(loggedInUser);
    } else {
      // Redirect to login if not logged in
      router.push("/login");
    }
  }, []);


  async function GETdata()
  {
    if(!userID)return; //guard case for rendering
    try {
      // Call the login API

      console.log(userID);
      const response = await fetch("/api/USER/user-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userID}),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to user events page on successful login
        console.log(data);
        setUserEmail(data.email);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setAddress1(data.address1);
        setAddress2(data.address2);
        setCity(data.city);
        setState(data.state);
        setZipCode(data.zipcode);
        setSkills(data.skills);
        setAvailability(data.availability);
        setPreferences(data.preferences);
        
      } else {
        setUserEmail("");
        setFirstName("");
        setLastName("");
        setAddress1("");
        setAddress2("");
        setCity("");
        setState("");
        setZipCode("");
        setSkills([""]);
        setAvailability([""]);
        setPreferences("");
        //router.push(`/`);
      }
    } catch (err) {
      setUserEmail("");
      setFirstName("");
      setLastName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setState("");
      setZipCode("");
      setSkills([""]);
      setAvailability([""]);
      setPreferences("");
      //router.push(`/`);
    }
  };

  async function PATCHdata()
  {
    console.log(`this is the userID: ${userID}`)
    if(!userID)return; //guard case for rendering
    try {
      // Call the login API
      console.log(userID)
      const response = await fetch("/api/USER/user-data", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to user events page on successful login
        console.log(data);  
      } else {
    
      }
    } catch (err) {
 
      //router.push(`/`);
    }
  };

  
  //useEffect() empty dependency array
  useEffect(() => {GETdata()}, [userID]);
  //GETdata(userID);



  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    router.push("/login");
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      if (
        !firstName ||
        !lastName ||
        !address1 ||
        !city ||
        !state ||
        !zipCode ||
        !skills.length ||
        !preferences ||
        !availability.length
      ) {
        setError("Please fill in all fields");
        return;
      }
      // Update data into the server
      PATCHdata();
      
      setError("");
      setStep(1);
    }
  };

  const handleSkillSelect = (skill) => {
    setSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleSkillClear = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAvailabilitySelect = (day) => {
    setAvailability((prevAvailability) =>
      prevAvailability.includes(day)
        ? prevAvailability.filter((d) => d !== day)
        : [...prevAvailability, day]
    );
  };

  const handleAvailabilityClear = (day) => {
    setAvailability(availability.filter((d) => d !== day));
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <Navbar
        currentPage="Account"
        userEmail={userEmail}
        userID={userID}
        handleLogout={handleLogout}
        navLinks={[
          { name: "Account", href: userID ? `/user/${userID}/account` : "#" },
          { name: "Events", href: userID ? `/user/${userID}/events` : "#" },
          {
            name: "Notification",
            href: userID ? `/user/${userID}/notifications` : "#",
          },
          { name: "Log out", href: "#", onClick: handleLogout },
        ]}
        showLogout={true}
      />

      {/* center */}
      <div style={styles.profileBox}>
        <h1 style={styles.title}>Manage Profile</h1>
        <form onSubmit={handleNext} style={styles.form}>
          {error && <p style={styles.error}>{error}</p>}
          {step === 1 && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <div style={styles.dataBox}>
                  <p>{userEmail}</p>
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>First Name</label>
                  <div style={styles.dataBox}>
                    <p>{firstName}</p>
                  </div>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Last Name</label>
                  <div style={styles.dataBox}>
                    <p>{lastName}</p>
                  </div>
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Address 1</label>
                  <div style={styles.dataBox}>
                    <p>{address1}</p>
                  </div>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Address 2</label>
                  <div style={styles.dataBox}>
                    <p>{address2}</p>
                  </div>
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>City</label>
                  <div style={styles.dataBox}>
                    <p>{city}</p>
                  </div>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>State</label>
                  <div style={styles.dataBox}>
                    <p>{state}</p>
                  </div>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Zip Code</label>
                  <div style={styles.dataBox}>
                    <p>{zipCode}</p>
                  </div>
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Skills</label>
                  <div style={styles.dataBox}>
                    <div style={styles.selectedSkills}>
                      {skills.map((skill) => (
                        <span style={styles.skillTag}> {skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Availability</label>
                  <div style={styles.dataBox}>
                    <div style={styles.selectedSkills}>
                      {availability.map((skill) => (
                        <span style={styles.skillTag}> {skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Preferences</label>
                <div style={styles.dataBox}>
                  <p>{preferences}</p>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    required
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Address 1</label>
                  <input
                    type="text"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    placeholder="Enter your address"
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Address 2</label>
                  <input
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Enter your address (optional)"
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city"
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    style={styles.input}
                  >
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Zip Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter your zip code"
                    required
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Skills</label>
                  <div
                    style={styles.multiSelectContainer}
                    onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                  >
                    <div style={styles.multiSelect}>
                      <div style={styles.selectedSkills}>
                        {skills.length
                          ? skills.map((skill) => (
                              <div key={skill} style={styles.skillTag}>
                                {skill}
                                <span
                                  style={styles.clearTag}
                                  onClick={() => handleSkillClear(skill)}
                                >
                                  &times;
                                </span>
                              </div>
                            ))
                          : "Select your skills..."}
                      </div>
                      {showSkillDropdown && (
                        <div style={styles.dropdown}>
                          {[
                            "Health",
                            "Education",
                            "Environment",
                            "Arts",
                            "Animal Care",
                          ].map((skill) => (
                            <div
                              key={skill}
                              onClick={() => handleSkillSelect(skill)}
                              style={{
                                ...styles.dropdownItem,
                                ...(skills.includes(skill) &&
                                  styles.dropdownItemSelected),
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={skills.includes(skill)}
                                readOnly
                                style={styles.availabilityCheckbox}
                              />
                              {skill}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Availability</label>
                  <div
                    style={styles.multiSelectContainer}
                    onClick={() =>
                      setShowAvailabilityDropdown(!showAvailabilityDropdown)
                    }
                  >
                    <div style={styles.multiSelect}>
                      <div style={styles.selectedSkills}>
                        {availability.length
                          ? availability.map((day) => (
                              <div key={day} style={styles.skillTag}>
                                {day}
                                <span
                                  style={styles.clearTag}
                                  onClick={() => handleAvailabilityClear(day)}
                                >
                                  &times;
                                </span>
                              </div>
                            ))
                          : "Select your availability..."}
                      </div>
                      {showAvailabilityDropdown && (
                        <div style={styles.dropdown}>
                          {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                          ].map((day) => (
                            <div
                              key={day}
                              onClick={() => handleAvailabilitySelect(day)}
                              style={{
                                ...styles.dropdownItem,
                                ...(availability.includes(day) &&
                                  styles.dropdownItemSelected),
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={availability.includes(day)}
                                readOnly
                                style={styles.availabilityCheckbox}
                              />
                              {day}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Preferences</label>
                <textarea
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="Enter your preferences"
                  required
                  style={styles.textarea}
                />
              </div>
            </>
          )}
          <button type="submit" style={styles.button}>
            {step === 1 ? "Edit Profile" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#E6E1D3",
    padding: "20px",
  },
  profileBox: {
    marginTop: "10vh",
    width: "52.5vw",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  error: {
    color: "#d9534f",
    marginBottom: "10px",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },
  inputGroup: {
    flex: "1 1 calc(50% - 10px)",
    minWidth: "300px",
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
    boxSizing: "border-box",
  },
  dataBox: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#E6E1D3",
    color: "#333",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
    boxSizing: "border-box",
    minHeight: "100px",
    resize: "vertical",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
  multiSelectContainer: {
    position: "relative",
    cursor: "pointer",
  },
  multiSelect: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#fff",
    minHeight: "40px",
    boxSizing: "border-box",
  },
  selectedSkills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
    color: "#808080",
    marginBottom: "5px",
  },
  skillTag: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
  },
  clearTag: {
    marginLeft: "5px",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: "0",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    zIndex: "1000",
    maxHeight: "150px",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  dropdownItem: {
    padding: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: "#333",
  },
  dropdownItemSelected: {
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  availabilityCheckbox: {
    marginRight: "10px",
  },
  availabilityOption: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  links: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
  },
  //this is the start of the nav CSS elements
  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#007BFF", // Transparent black background for the navbar
    color: "#f4f4f4",
    zIndex: 2, // Ensures the navbar is on top of the background
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  navOnPage: {
    fontWeight: "bolder",
  },
  navButton: {
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    color: "#007BFF",
    border: "none",
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: "10px",
    width: "15vw",
  },
};
