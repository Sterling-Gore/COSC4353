import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminNavbar from "@/components/adminNavbar"; // Adjust the path as needed

export default function Matching() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [skills, setSkills] = useState([]);
  const [preferences, setPreferences] = useState("");
  const [availability, setAvailability] = useState([
    "Sterling Gore",
    "Jorell Padilla",
  ]);
  const [error, setError] = useState("");
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showAvailabilityDropdown, setShowAvailabilityDropdown] = useState([
    false,
    false,
  ]);
  const [volunteers, setVolunteers] = useState([
    "Sterling Gore",
    "Jorell Padilla",
    "Meenakshi Vinod",
    "Jason Yen",
  ]);
  const [events, setEvents] = useState({
    "Feeding the Homeless": [],
    "Cleaning up the Park": ["Sterling Gore", "Jorell Padilla"],
  });

  const router = useRouter();

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

  const handleEdit = (e) => {
    // Logic for editing volunteers in a specific event
    //e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step == 2) {
      setStep(1);
    }
  };

  /*
  const handleAvailabilitySelect = (day) => {
    setAvailability((prevAvailability) =>
      prevAvailability.includes(day)
        ? prevAvailability.filter((d) => d !== day)
        : [...prevAvailability, day]
    );
  };
  */
  const handleAvailabilitySelect = (volunteer, eventName) => {
    setEvents((prevEvents) => {
      const currentVolunteers = Array.isArray(prevEvents[eventName])
        ? prevEvents[eventName]
        : [];

      // Check if the volunteer is already in the list
      const updatedVolunteers = currentVolunteers.includes(volunteer)
        ? currentVolunteers.filter((d) => d !== volunteer) // Remove volunteer
        : [...currentVolunteers, volunteer]; // Add volunteer

      return {
        ...prevEvents,
        [eventName]: updatedVolunteers,
      };
    });
  };

  /*
  const handleAvailabilityClear = (day) => {
    setAvailability(availability.filter((d) => d !== day));
  };
  */
  const handleAvailabilityClear = (volunteer, eventName) => {
    setEvents((prevEvents) => {
      const updatedVolunteers = prevEvents[eventName].filter(
        (d) => d !== volunteer
      );

      return {
        ...prevEvents,
        [eventName]: updatedVolunteers,
      };
    });
  };

  const handleDropDown = (index) => {
    setShowAvailabilityDropdown((prevState) =>
      prevState.map((item, i) => (i === index ? !item : item))
    );
  };

  return (
    <div style={styles.container}>
      <AdminNavbar currentPage="Matching" handleLogout={handleLogout} />
      {/* center */}
      <div style={styles.profileBox}>
        <h1 style={styles.title}>Volunteer Matching</h1>
        <div style={styles.form}>
          {error && <p style={styles.error}>{error}</p>}
          {step === 1 && (
            <>
              <div style={styles.inputGroup}>
                {Object.keys(events).map((eventName, i) => (
                  <>
                    <div style={styles.eventBox}>
                      <div key={i} style={styles.eventTitle}>
                        <h3>{eventName}</h3>
                      </div>
                      <p style={styles.eventDate}>September {i + 6}th</p>
                      <label style={styles.label}>Available Volunteers</label>
                      <div style={styles.dataBox}>
                        <div style={styles.selectedSkills}>
                          {events[eventName].length
                            ? events[eventName].map((volunteer) => (
                                <div
                                  key={volunteer}
                                  style={styles.volunteerTag}
                                >
                                  {volunteer}
                                </div>
                              ))
                            : "Select volunteers here..."}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div style={styles.inputGroup}>
                {Object.keys(events).map((eventName, i) => (
                  <>
                    <div style={styles.eventBox}>
                      <div key={i} style={styles.eventTitle}>
                        <h3>{eventName}</h3>
                      </div>
                      <p style={styles.eventDate}>September {i + 6}th</p>
                      <label style={styles.label}>Available Volunteers</label>
                      <div
                        style={styles.multiSelectContainer}
                        onClick={() => handleDropDown(i)}
                      >
                        <div style={styles.multiSelect}>
                          <div style={styles.selectedSkills}>
                            {events[eventName].length
                              ? events[eventName].map((volunteer) => (
                                  <div
                                    key={volunteer}
                                    style={styles.volunteerTag}
                                  >
                                    {volunteer}
                                    <span
                                      style={styles.clearTag}
                                      onClick={() =>
                                        handleAvailabilityClear(
                                          volunteer,
                                          eventName
                                        )
                                      }
                                    >
                                      &times;
                                    </span>
                                  </div>
                                ))
                              : "Select volunteers here..."}
                          </div>
                          {showAvailabilityDropdown[i] && (
                            <div style={styles.dropdown}>
                              {volunteers.map((volunteer) => (
                                <div
                                  key={volunteer}
                                  onClick={() =>
                                    handleAvailabilitySelect(
                                      volunteer,
                                      eventName
                                    )
                                  }
                                  style={{
                                    ...styles.dropdownItem,
                                    ...(events[eventName].includes(volunteer) &&
                                      styles.dropdownItemSelected),
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={events[eventName].includes(
                                      volunteer
                                    )}
                                    readOnly
                                    style={styles.availabilityCheckbox}
                                  />
                                  {volunteer}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
          <div style={styles.submitButtons}>
            {step === 1 ? (
              <button
                style={styles.redButton}
                onClick={() => handleEdit("Event")}
              >
                Edit{" "}
              </button>
            ) : (
              <>
                <button
                  style={styles.cancelButton}
                  onClick={() => handleEdit("Event")}
                >
                  Cancel{" "}
                </button>
                <button
                  style={styles.redButton}
                  onClick={() => handleEdit("Event")}
                >
                  Save Changes{" "}
                </button>
              </>
            )}
          </div>
        </div>
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
  volunteerTag: {
    backgroundColor: "#FF3030",
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
  eventTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "blacK",
  },
  eventBox: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  eventDate: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  submitButtons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  redButton: {
    backgroundColor: "#FF3030",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    display: "block",
    marginLeft: "10px",
  },
  cancelButton: {
    backgroundColor: "#fff",
    color: "#FF3030",
    borderStyle: "solid",
    borderColor: "#FF3030",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    display: "block",
    marginLeft: "10px",
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
};
