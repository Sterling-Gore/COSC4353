import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminNavbar from "@/components/adminNavbar"; // Adjust the path as needed

export default function Events() {
  const [currentPage, setCurrentPage] = useState("Events");
  const [selectedEventNum, setSelectedEventNum] = useState(null); // New state for selected event number
  const [isClicked, setIsClicked] = useState(false);
  const [eventName, setEventName] = useState("");
  const [urgency, setUrgency] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [events, setEvents] = useState([]);
  const [numEvents, setnumEvents] = useState(0);

  const router = useRouter();

  const handleNext = async (e) => {
    e.preventDefault();

      if (
        !eventName ||
        !urgency ||
        !address ||
        !city ||
        !state ||
        !zipCode ||
        !skills ||
        !description ||
        !eventDate 
      ) {
        setError("Please fill in all fields");
        return;
      }

      try {
        // Call the registration API
        const response = await fetch("/api/events/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventName,
            urgency,
            address,
            city,
            state,
            zipCode,
            skills,
            description,
            eventDate,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          // Save user details in local storage before redirecting
          localStorage.setItem("eventName", eventName);
          localStorage.setItem("eventID", data.event.eventID);
          setSelectedEventNum(data.event.eventID)

          // Redirect to user events page on successful registration
          window.location.reload();  // This will refresh the current page
        } else {
          // Handle registration errors
          setError(data.error || "Event Creation Failed. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
      }
  };

  async function GETevent_data() {
    try {
      const response = await fetch("/api/events/event-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data_from_db = await response.json();

      console.log(data_from_db.events);
  
      if (response.ok) {
        // Directly set the events array from the response
        setEvents(data_from_db.events);
      } else {
        console.log("Bad response");
      }
    } catch (err) {
      console.log("Error:", err); // Log the error for debugging
    }

  }

  useEffect(() => {
    GETevent_data();
    console.log(events); // This will print the events state to check if it's being populated
  }, []);

  useEffect(() => {
    // Check if the user is logged in and get the user role
    const userRole = localStorage.getItem("userRole");
    const userID = localStorage.getItem("userID");

    // Redirect based on role
    if (!userRole || !userID) {
      // If no valid login data, redirect to login page
      router.push("/login");
    } else if (userRole !== "admin") {
      // If the user is logged in but not an admin, redirect to their user events page
      router.push(`/user/${userID}/events`);
    }
  }, []);

  const handleLogout = () => {
    // Handle logout logic here if necessary
    localStorage.removeItem("userRole");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("userID");
    router.push("/login");
  };

  const handlePageChangeOnClick = (page, eventNum) => {
    if (page === "Events") {
      setCurrentPage("Events");
    } else if (page === "EditEvent") {
      setCurrentPage("EditEvent");
      setSelectedEventNum(eventNum);
    } else if (page === "CreateEvent") {
      setCurrentPage("CreateEvent");
      setSelectedEventNum(eventNum);
    }
  };

  const handleGoBackOnClick = () => {
    setCurrentPage("Events");
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

  return (
    <div style={styles.container}>
      <AdminNavbar currentPage="Events" handleLogout={handleLogout} />

      <div style={styles.eventsContainer}>
        {currentPage === "Events" && (
          <>
          <h1 style={styles.title}>Event Management</h1>
          <div style={styles.eventsGrid}>
            {events.map((event) => (
              <div key={event.eventID} style={styles.eventWrapper}> {/* Add key prop here */}
                <div style={styles.eventBox}></div>
                <div style={styles.eventInfo}>
                  <p>{event.eventName}</p>
                  <button style={styles.EditButton} onClick={() => handlePageChangeOnClick("EditEvent", event.eventNum)}>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
              <button
                style={styles.createButton}
                onClick={() =>
                  handlePageChangeOnClick("CreateEvent", numEvents + 1)
                }
              >
                Create Event
              </button>
            </div>
          </>
        )}
        {currentPage === "EditEvent" && (
          <>
            <h1 style={styles.title}>Edit Event {selectedEventNum}</h1>
            <div style={styles.rsvpContainer}>
              <div style={styles.rsvpBox}></div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Event Name</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Enter the event name"
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Urgency</label>
                  <div style={styles.urgencyContainer}>
                    <label style={styles.urgencyText}>
                      <input
                        type="radio"
                        value="High"
                        checked={urgency === "High"}
                        onChange={(e) => setUrgency(e.target.value)}
                      />
                      High
                    </label>
                    <label style={styles.urgencyText}>
                      <input
                        type="radio"
                        value="Medium"
                        checked={urgency === "Medium"}
                        onChange={(e) => setUrgency(e.target.value)}
                      />
                      Medium
                    </label>
                    <label style={styles.urgencyText}>
                      <input
                        type="radio"
                        value="Low"
                        checked={urgency === "Low"}
                        onChange={(e) => setUrgency(e.target.value)}
                      />
                      Low
                    </label>
                  </div>
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter the address"
                    required
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
                    placeholder="Enter the city"
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
                    placeholder="Enter the zip code"
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description for the event"
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Required Skills</label>
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
                          : "Select required skills..."}
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
                  <label style={styles.label}>Date:</label>{" "}
                  {/* Add this line */}
                  <div style={styles.dateContainer}>
                    <input
                      type="date"
                      placeholder="Event Date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                      style={styles.dateBox}
                    />
                  </div>
                </div>
              </div>

              <div style={styles.rowButtons}>
                <button style={styles.goBack} onClick={handleGoBackOnClick}>
                  Cancel
                </button>
                <button style={styles.goBack} onClick={handleGoBackOnClick}>
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}

        {currentPage === "CreateEvent" && (
          <>
            <h1 style={styles.title}>Create Event {selectedEventNum}</h1>
            <form onSubmit={handleNext} style={styles.form}>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.rsvpContainer}>
              <div style={styles.rsvpBox}></div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Event Name</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Enter the event name"
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Urgency</label>
                  <div style={styles.urgencyContainer}>
                    <label style={styles.urgencyText}>
                      <input
                        type="radio"
                        value="High"
                        checked={urgency === "High"}
                        onChange={(e) => setUrgency(e.target.value)}
                      />
                      High
                    </label>
                    <label style={styles.urgencyText}>
                      <input
                        type="radio"
                        value="Medium"
                        checked={urgency === "Medium"}
                        onChange={(e) => setUrgency(e.target.value)}
                      />
                      Medium
                    </label>
                    <label style={styles.urgencyText}>
                      <input
                        type="radio"
                        value="Low"
                        checked={urgency === "Low"}
                        onChange={(e) => setUrgency(e.target.value)}
                      />
                      Low
                    </label>
                  </div>
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter the address"
                    required
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
                    placeholder="Enter the city"
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
                    placeholder="Enter the zip code"
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description for the event"
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Required Skills</label>
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
                          : "Select required skills..."}
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
                  <label style={styles.label}>Date:</label>{" "}
                  {/* Add this line */}
                  <div style={styles.dateContainer}>
                    <input
                      type="date"
                      placeholder="Event Date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                      style={styles.dateBox}
                    />
                  </div>
                </div>
              </div>

              <div style={styles.rowButtons}>
                <button style={styles.goBack} onClick={handleGoBackOnClick}>
                  Cancel
                </button>
                <button type="submit" style={styles.goBack}>
                  Create Event
                </button>
              </div>
            </div>
            </form>
          </>
        )}
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
  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#FF3030", // Transparent black background for the navbar
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
  navSwitchButton: {
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    color: "#007BFF",
    border: "none",
    padding: "6px 12px",
    borderRadius: "10px",
    fontWeight: "bold",
    width: "15vw",
  },
  navButton: {
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    color: "#FF3030",
    border: "none",
    padding: "6px 12px",
    fontWeight: "bold",
    borderRadius: "10px",
    width: "15vw",
  },
  eventsText: {
    fontSize: "37px",
    color: "black",
    fontWeight: 500,
    marginBottom: "5vh",
  },
  eventsButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "20vh",
    marginBottom: "10vh",
  },
  blackEventsButtons: {
    display: "flex",
    backgroundColor: "white",
    border: "none",
    color: "black",
    fontSize: "30px",
    cursor: "pointer",
  },
  grayEventsButtons: {
    display: "flex",
    backgroundColor: "white",
    border: "none",
    color: "gray",
    fontSize: "30px",
    cursor: "pointer",
  },
  multiSelectContainer: {
    position: "relative",
    cursor: "pointer",
    fontSize: 20,
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
  rowButtons: {
    display: "flex",
    justifyContent: "space-around",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "20px",
  },
  dateBox: {
    padding: "10px",
    minWidth: "20vw",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #cccccc",
  },
  inputGroup: {
    flex: "1 1 calc(50% - 10px)",
    minWidth: "300px",
    marginBottom: "10px",
  },
  label: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
    boxSizing: "border-box",
    fontSize: 20,
  },
  eventsContainer: {
    marginTop: "10vh",
    minwidth: "52.5vw",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
  eventsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // Fixed to 3 columns
    gap: "20px",
    width: "100%",
  },
  eventWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  eventBox: {
    backgroundColor: "#D3D3D3",
    width: "90%",
    height: "30vh", // Adjust the height if needed
    width: "20vh",
    borderRadius: "10px",
  },

  eventInfo: {
    marginTop: "10px",
    color: "black",
    textAlign: "left", // Align text to the left
    width: "90%", // Ensure it takes the full width of the container
    fontSize: "20px",
    marginTop: "20px",
    marginBottom: "25px",
  },
  EditButton: {
    color: "#FF3030",
    marginTop: "5px",
    cursor: "pointer",
    backgroundColor: "white",
    border: "none",
    fontSize: "15px",
  },
  rsvpContainer: {
    display: "flex",
    flexDirection: "column",
  },
  rsvpBox: {
    backgroundColor: "#D3D3D3",
    width: "100vh",
    height: "40vh", // Adjust the height if needed
    borderRadius: "10px",
    overflow: "hidden",
  },
  eventInfoContainer: {
    display: "grid",
    gridTemplateColumns: "auto auto", // Two columns: one for labels, one for details
    gap: "10px", // Space between grid items
    width: "100%", // Take full width
    marginTop: "20px", // Space above the info
    marginBottom: "50px",
  },
  eventNameText: {
    gridColumn: "1 / span 2", // Event name takes full width
    fontSize: "25px",
    color: "black",
    textAlign: "left",
    marginBottom: "15px",
  },
  dateContainer: {
    display: "flex",
    justifyContent: "center",
  },
  urgencyContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 55,
  },
  urgencyText: {
    fontSize: "20px",
    color: "black",
  },
  blueDot: {
    width: "4vh",
  },
  imageUrgencyContainer: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
  },

  infoText: {
    display: "flex",
    fontSize: "20px",
    color: "black",
    marginBottom: "10px",
  },
  addressInput: {
    width: "100vh",
    height: "5vh",
    backgroundColor: "#D3D3D3",
    color: "black",
    fontSize: "25px",
    border: "none",
    paddingLeft: "10px",
    marginBottom: "10px",
    borderRadius: "3px",
  },
  cityStateZip: {
    display: "flex",
    width: "100vh",
    gap: "10px",
    marginBottom: "10px",
  },
  cityContainer: {
    display: "flex",
    flexBasis: "50%",
    flexDirection: "column",
    flexGrow: 1,
  },
  cityInput: {
    width: "100%", // Full width of the parent container
    height: "5vh", // Adjust height to something more reasonable
    backgroundColor: "#D3D3D3",
    border: "none",
    paddingLeft: "10px",
    fontSize: "25px", // Adjust font size if needed
    color: "black",
    boxSizing: "border-box",
    borderRadius: "3px",
  },
  stateContainer: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "25%",
    flexGrow: 1,
  },
  stateInput: {
    width: "100%", // Full width of the parent container
    height: "5vh", // Adjust height to something more reasonable
    backgroundColor: "#D3D3D3",
    border: "none",
    paddingLeft: "10px",
    fontSize: "25px", // Adjust font size if needed
    color: "black",
    boxSizing: "border-box",
    borderRadius: "3px",
  },
  zipContainer: {
    display: "flex",
    flexBasis: "25%",
    flexDirection: "column",
    flexGrow: 1,
  },
  zipInput: {
    width: "100%", // Full width of the parent container
    height: "5vh", // Adjust height to something more reasonable
    backgroundColor: "#D3D3D3",
    border: "none",
    paddingLeft: "10px",
    fontSize: "25px", // Adjust font size if needed
    color: "black",
    boxSizing: "border-box",
    borderRadius: "3px",
  },
  descriptionInput: {
    width: "100vh",
    height: "5vh",
    backgroundColor: "#D3D3D3",
    color: "black",
    fontSize: "25px",
    border: "none",
    paddingLeft: "10px",
    marginBottom: "10px",
    borderRadius: "3px",
  },
  prefAvail: {
    display: "flex",
    width: "100vh",
    gap: "10px",
    marginBottom: "10px",
  },
  preferenceContainer: {
    display: "flex",
    flexBasis: "55%",
    flexDirection: "column",
    flexGrow: 1,
  },
  preferenceInput: {
    width: "100%", // Full width of the parent container
    height: "5vh", // Adjust height to something more reasonable
    backgroundColor: "#D3D3D3",
    border: "none",
    paddingLeft: "10px",
    fontSize: "25px", // Adjust font size if needed
    color: "black",
    boxSizing: "border-box",
    borderRadius: "3px",
  },
  availabilityContainer: {
    display: "flex",
    flexBasis: "45%",
    flexDirection: "column",
    flexGrow: 1,
  },
  availabilityInput: {
    width: "100%", // Full width of the parent container
    height: "5vh", // Adjust height to something more reasonable
    backgroundColor: "#D3D3D3",
    border: "none",
    paddingLeft: "10px",
    fontSize: "25px", // Adjust font size if needed
    color: "black",
    boxSizing: "border-box",
    borderRadius: "3px",
  },

  rsvpSaveContainer: {
    display: "flex",
    justifyContent: "space-between", // Space out RSVP and Save Changes
    alignItems: "center", // Vertically align them
    marginTop: "20px", // Adjust the spacing as needed
    marginBottom: "40px",
  },
  rsvpCheckContainer: {
    display: "flex",
    alignItems: "center", // Align checkbox and label vertically
    gap: "10px", // Space between checkbox and label
  },
  clickHereRSVPText: {
    fontSize: "15px",
    color: "#309CFF",
    fontWeight: "300",
    lineHeight: "20px", // Set the same line height as the checkbox height for better alignment
  },
  rsvpCheckBoxStyle: {
    width: "30px", // Set the width of the checkbox
    height: "30px", // Set the height of the checkbox
    margin: "0", // Remove default margin
    borderRadius: "3px",
  },
  saveButton: {
    transition: "0.15s",
    padding: "10px 20px", // Adjust padding for button
    backgroundColor: "#007BFF", // Button color
    color: "white", // Text color
    border: "none",
    borderRadius: "5px", // Rounded corners
    cursor: "pointer",
  },
  saveButtonClicked: {
    transition: "0.15s",
    padding: "10px 20px", // Adjust padding for button
    backgroundColor: "#309CFF", // Button color
    color: "white", // Text color
    border: "none",
    borderRadius: "5px", // Rounded corners
    cursor: "pointer",
  },
  goBack: {
    display: "flex", // Enable flexbox for centering
    justifyContent: "center", // Center text horizontally
    alignItems: "center", // Center text vertically
    minWidth: "45vh",
    maxWidth: "100vh",
    height: "5vh",
    backgroundColor: "#FF3030",
    color: "white",
    fontSize: 20,
    fontWeight: "bold", // Optional: Add color for contrast
    border: "none", // Optional: Remove default border
    borderRadius: "8px",
    cursor: "pointer", // Optional: Change cursor to pointer on hover
  },
  createButton: {
    display: "flex", // Enable flexbox for centering
    justifyContent: "center", // Center text horizontally
    alignItems: "center", // Center text vertically
    width: "100vh",
    height: "5vh",
    backgroundColor: "#FF3030",
    color: "white",
    fontSize: 20,
    fontWeight: "bold", // Optional: Add color for contrast
    border: "none", // Optional: Remove default border
    borderRadius: "8px",
    cursor: "pointer", // Optional: Change cursor to pointer on hover
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  error: {
    color: "#d9534f",
    marginBottom: "10px",
  },
};
