"use client"; // Enable client-side rendering
import { useState } from "react";

export default function PageHandler() {
  const [currentPage, setCurrentPage] = useState('eventManagement'); // State to manage current page
  const [skills, setSkills] = useState([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [showAvailabilityDropdown, setShowAvailabilityDropdown] = useState(false);

  const handleSkillSelect = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleSkillClear = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAvailabilitySelect = (day) => {
    if (!availability.includes(day)) {
      setAvailability([...availability, day]);
    }
  };

  const handleAvailabilityClear = (day) => {
    setAvailability(availability.filter((d) => d !== day));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created:", {
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
    });
    alert("Event created successfully!");
  };

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [urgency, setUrgency] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSkillsChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSkills(selected);
  };

  const handleCreateEventClick = () => {
    setCurrentPage('createEvent'); // Switch to the Create Event page
  };

  const handleBackClick = () => {
    setCurrentPage('eventManagement'); // Switch back to Event Management page
  };

  return (
    <div style={styles.container}>
      {currentPage === 'eventManagement' && (
        <>
          {/* Navigation bar */}
          <div style={styles.navBar}>
            <div style={styles.navButtons}>
              <div style={styles.logo}>FTGOO</div>
              <button style={styles.navButton}>Login</button>
              <button style={styles.navButton}>Register</button>
            </div>
          </div>

          {/* Main content */}
          <div style={styles.mainContainer}>
            <div style={styles.contentBox}>
              <h1 style={styles.title}>Event Management</h1>
              <button style={styles.createEventButton} onClick={handleCreateEventClick}>
                Create New Event
              </button>
            </div>
          </div>
        </>
      )}

      {currentPage === 'createEvent' && (
        <div style={styles.createEventContainer}>
          {/* Navigation Bar */}
          <div style={styles.navBar}>
            <div style={styles.navButtons}>
              <div style={styles.logo}>FTGOO</div>
              <button style={styles.navButton} onClick={handleBackClick}>Back</button>
              <button style={styles.navButton}>Login</button>
              <button style={styles.navButton}>Register</button>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={styles.createEventContentBox}>
            <h1 style={styles.title}>Create New Event</h1>
            <form onSubmit={handleSubmit} style={styles.createEventForm}>
              <label>
                Event Name:
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                  style={styles.inputBox}
                />
              </label>
              
              <label>
                Event Description:
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                  style={styles.inputBox}
                />
              </label>

              <label>
                Address Line 1:
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  required
                  style={styles.inputBox}
                />
              </label>

              <label>
                Address Line 2:
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  style={styles.inputBox}
                />
              </label>

              <label>
                City:
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  style={styles.inputBox}
                />
              </label>

              <label>
                State:
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  style={styles.inputBox}
                />
              </label>

              <label>
                Zip Code:
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                  style={styles.inputBox}
                />
              </label>

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
                  <label style={styles.label}>Urgency</label>
                  <div style={styles.radioGroup}>
                    <label>
                      <input
                        type="radio"
                        value="Low"
                        checked={urgency === "Low"}
                        onChange={(e) => setUrgency(e.target.value)}
                      />
                      Low
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Medium"
                        checked={urgency === "Medium"}
                        onChange={(e) => setUrgency(e.target.value)}
                      />
                      Medium
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="High"
                        checked={urgency === "High"}
                        onChange={(e) => setUrgency(e.target.value)}
                      />
                      High
                    </label>
                  </div>
                </div>
              </div>

              <label>
                Event Date:
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                  style={styles.inputBox}
                />
              </label>

              <button type="submit" style={styles.createEventSubmit}>
                Create Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline styles for both pages
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#D9D9D9',
  },
  navBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000,
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    marginRight: 'auto', // Pushes the logo to the left and aligns buttons to the right
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
    marginLeft: 'auto', // Pushes buttons to the right
  },
  navButton: {
    backgroundColor: 'white',
    color: 'red',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'calc(100vh - 50px)', // Adjust for fixed nav bar height
    paddingTop: '50px', // Ensure content is below the fixed nav bar
    boxSizing: 'border-box',
  },
  contentBox: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '40px',
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '24px',
  },
  createEventButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  createEventContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '60px', // Ensure space for fixed nav bar
    backgroundColor: '#D9D9D9',
  },
  createEventContentBox: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '40px',
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  createEventForm: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputBox: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '10px',
  },
  multiSelectContainer: {
    position: 'relative',
    cursor: 'pointer',
  },
  multiSelect: {
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    boxSizing: 'border-box',
  },
  selectedSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
  },
  skillTag: {
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
  },
  clearTag: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    width: '100%',
    boxSizing: 'border-box',
  },
  dropdownItem: {
    padding: '10px',
    cursor: 'pointer',
  },
  dropdownItemSelected: {
    backgroundColor: '#f0f0f0',
  },
  availabilityCheckbox: {
    marginRight: '10px',
  },
  createEventSubmit: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  radioGroup: {
    display: 'flex',
    gap: '10px',
  },
};
