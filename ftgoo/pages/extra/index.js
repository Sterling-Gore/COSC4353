"use client"; // Enable client-side rendering
import { useState } from "react";

export default function PageHandler() {
  const [currentPage, setCurrentPage] = useState('eventManagement'); // State to manage current page
  const [skills, setSkills] = useState([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [events, setEvents] = useState([]); // State to store the list of events

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newEvent = {
      eventName,
      eventDescription,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      requiredSkills: skills,
      urgency,
      eventDate,
    };
  
    if (editingEventIndex !== null) {
      // Update existing event
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents];
        updatedEvents[editingEventIndex] = newEvent; // Update the specific event
        return updatedEvents;
      });
    } else {
      // Add new event
      setEvents(prevEvents => [...prevEvents, newEvent].slice(0, 15)); // Limit to 15
    }
  
    setCurrentPage('eventManagement'); // Switch back to Event Management page
    alert("Event saved successfully!");
  
    // Reset form fields
    setEventName("");
    setEventDescription("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setZipCode("");
    setUrgency("Medium");
    setEventDate("");
    setSkills([]);
    setEditingEventIndex(null); // Reset editing index
  };

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [urgency, setUrgency] = useState("Medium"); // Default urgency to "Medium"
  const [eventDate, setEventDate] = useState("");

  const handleCreateEventClick = () => {
    setCurrentPage('createEvent'); // Switch to the Create Event page
  };

  const handleBackClick = () => {
    setCurrentPage('eventManagement'); // Switch back to Event Management page
  };

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
    "Wisconsin", "Wyoming"
  ];

  const availableSkills = [
    "Health", "Education", "Environment", "Arts", "Animal Care"
  ];

  const handleSkillSelect = (skill) => {
    setSkills((prevSkills) =>
      prevSkills.includes(skill) ? prevSkills.filter(s => s !== skill) : [...prevSkills, skill]
    );
  };

  const handleSkillClear = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const [editingEventIndex, setEditingEventIndex] = useState(null);

  const handleEditEvent = (index) => {
    const eventToEdit = events[index];
    setEventName(eventToEdit.eventName);
    setEventDescription(eventToEdit.eventDescription);
    setAddressLine1(eventToEdit.addressLine1);
    setAddressLine2(eventToEdit.addressLine2);
    setCity(eventToEdit.city);
    setState(eventToEdit.state);
    setZipCode(eventToEdit.zipCode);
    setUrgency(eventToEdit.urgency);
    setEventDate(eventToEdit.eventDate);
    setEditingEventIndex(index);
    setCurrentPage('createEvent'); // Switch to the Create Event page
  };

  const isFormFilled = () => {
    return (
      eventName &&
      eventDescription &&
      addressLine1 &&
      city &&
      state &&
      zipCode &&
      eventDate
    );
  };

  return (
    <div style={styles.container}>
      {currentPage === 'eventManagement' && (
        <>
          {/* Navbar */}
        <nav style={styles.navbar}>
            <div style={styles.logo}>FTGOO</div>
            <div style={styles.navLinks}>
              <a href= "./admin-account">Account</a>
              <a href="./events">Event Management</a>
              <a href="./volunteer-history">History</a>
              <span style = {styles.navOnPage}>Matching</span>
              <a href= "./events">
                <span style = {styles.navSwitchButton}>User-Mode</span>
              </a>
              <a href="./">
                <span style = {styles.navButton}>Log out</span>
              </a>
            </div>
          </nav>

          {/* Main content */}
          <div style={styles.mainContainer}>
            <div style={styles.contentBox}>
              <h1 style={styles.title}>Event Management</h1>

              {/* Render list of events */}
              <div style={styles.eventsContainer}>
                {events.slice(0, 15).map((event, index) => (
                  <div key={index} style={styles.eventBox}>
                    <h2>{event.eventName}</h2>
                    <p>{event.eventDescription}</p>
                    <p>{event.addressLine1}, {event.city}, {event.state} - {event.zipCode}</p>
                    <p>Urgency: {event.urgency}</p>
                    <p>Date: {event.eventDate}</p>
                    <button onClick={() => handleEditEvent(index)} style={styles.editButton}>Edit</button>
                  </div>
                ))}
              </div>

              <button style={styles.createEventButton} onClick={handleCreateEventClick}>
                Create New Event
              </button>
            </div>
          </div>
        </>
      )}

      {currentPage === 'createEvent' && (
        <>
          {/* Navigation Bar */}
          <div style={styles.navBar}>
            <div style={styles.logo}>FTGOO</div>
            <div style={styles.navButtons}>
              <button style={styles.navButton}>Login</button>
              <button style={styles.navButton}>Register</button>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={styles.createEventContainer}>
            <div style={styles.createEventContentBox}>
              <h1 style={styles.title}>Create New Event</h1>
              <form onSubmit={handleSubmit} style={styles.createEventForm}>
                <input
                  type="text"
                  placeholder="Event Name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                  style={styles.inputBox}
                />
                <textarea
                  placeholder="Event Description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                  style={styles.textArea}
                />
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  required
                  style={styles.inputBox}
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  style={styles.inputBox}
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  style={styles.inputBox}
                />

                {/* State Dropdown */}
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  style={styles.inputBox}
                >
                  <option value="" disabled>Select State</option>
                  {states.map((stateOption) => (
                    <option key={stateOption} value={stateOption}>
                      {stateOption}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                  style={styles.inputBox}
                />

                {/* Skills Dropdown */}
                <div style={styles.row}>
                  <div style={styles.inputBox}>
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
                            {availableSkills.map((skill) => (
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
                </div>

                {/* Urgency Radio Buttons */}
                <div style={styles.urgencyContainer}>
                  <label>Urgency:</label>
                  <label style={styles.urgencyLabel}>
                    <input
                      type="radio"
                      value="High"
                      checked={urgency === "High"}
                      onChange={(e) => setUrgency(e.target.value)}
                    />
                    High
                  </label>
                  <label style={styles.urgencyLabel}>
                    <input
                      type="radio"
                      value="Medium"
                      checked={urgency === "Medium"}
                      onChange={(e) => setUrgency(e.target.value)}
                    />
                    Medium
                  </label>
                  <label style={styles.urgencyLabel}>
                    <input
                      type="radio"
                      value="Low"
                      checked={urgency === "Low"}
                      onChange={(e) => setUrgency(e.target.value)}
                    />
                    Low
                  </label>
                </div>

                <div style={styles.urgencyContainer}>
                  <label style={styles.label}>Date:</label> {/* Add this line */}
                  <input
                    type="date"
                    placeholder="Event Date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    style={styles.inputBox}
                  />
                </div>

                <div style={styles.createEventActions}>
                  <button 
                    type={isFormFilled() ? "submit" : "button"}
                    style={styles.createEventButton}
                    onClick={isFormFilled() ? undefined : handleBackClick}
                  >
                    {isFormFilled() ? "Create Event" : "Cancel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// CSS styling in JavaScript
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    //alignItems: "center",

    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#D9D9D9',
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
    fontWeight: "bold",
    borderRadius: "10px",
    width: "15vw",
  },
  navButton: {
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    color: "#FF3030",
    border: "none",
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: "10px",
    width: "15vw",
  },
  mainContainer: {
    backgroundColor: '#d0d0d0', // Grey background
    padding: '20px',
  },
  contentBox: {
    backgroundColor: '#ffffff', // White content box
    padding: '20px',
    minHeight: "50vh",
    borderRadius: '8px',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: '30px',
    marginBottom: '20px',
    textAlign: 'center', // Center the title
  },
  eventsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Display events in 3 columns
    gap: '20px',
  },
  eventBox: {
    backgroundColor: '#d0d0d0', // Grey event boxes
    padding: '10px',
    borderRadius: '8px',
  },
  createEventButton: {
    backgroundColor: '#FF3030',
    color: 'white',
    padding: '15px', // Increase padding for a taller button
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%', // Make the button full width
    fontSize: '18px', // Increase font size
    borderRadius: '8px', // Optional: round the corners
  },
  createEventContainer: {
    backgroundColor: '#d0d0d0',
    padding: '20px',
  },
  createEventContentBox: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
  },
  createEventForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputBox: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #cccccc',
  },
  textArea: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #cccccc',
    height: '100px',
  },
  multiSelectContainer: {
    position: 'relative',
  },
  multiSelect: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #cccccc',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
  },
  selectedSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  skillTag: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #cccccc',
    borderRadius: '8px',
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  clearTag: {
    color: 'red',
    cursor: 'pointer',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    zIndex: '1000',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  dropdownItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #f0f0f0',
  },
  dropdownItemSelected: {
    backgroundColor: '#f9f9f9',
  },
  availabilityCheckbox: {
    marginRight: '8px',
  },
  createEventActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  urgencyContainer: {
    display: 'flex',
    alignItems: 'center', // Align items vertically in the center
    gap: '20px', // Space between the buttons
    marginBottom: '20px',
  },
  urgencyLabel: {
    marginRight: '10px',
  },
  editButton: {
  backgroundColor: '#FF3030', // Red color
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  marginTop: '10px', // Add some spacing
  width: '100%', // Make it a full-width button
},
};
