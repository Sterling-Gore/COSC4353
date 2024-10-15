import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";

export default function Events() {
  const router = useRouter();
  const [people, setPeople] = useState("");
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const { userID } = router.query; // Extract userID from query params
  const [userEmail, setUserEmail] = useState(null);
  const [currentPage, setCurrentPage] = useState("myEvents");
  const [isClicked, setIsClicked] = useState(false);
  const [isRSVPChecked, setIsRSVPChecked] = useState(null);
  const [thisEvent, setThisEvent] = useState(null);
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

  async function GETuser_data()
  {
    if(!userID)return; //guard case for rendering
    try {
      // Call the login API

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
        
        setUserEmail(data.user.email);
        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
        setAddress1(data.user.address1);
        setAddress2(data.user.address2);
        setCity(data.user.city);
        setState(data.user.state);
        setZipCode(data.user.zipCode);
        setSkills(data.user.skills);
        setAvailability(data.user.availability);
        setPreferences(data.user.preferences);
        
        // Check if rsvpEvents and events are available

        
        const editedMyEvents = data.user.rsvpEvents.map((eventID) => {
          const matchedEvent = events.find(event => event.eventID === eventID);
          if (matchedEvent) {
            return {
              eventID: matchedEvent.eventID,
              eventName: matchedEvent.eventName,
              urgency: matchedEvent.urgency,
              address: matchedEvent.address,
              city: matchedEvent.city,
              state: matchedEvent.state,
              zipCode: matchedEvent.zipCode,
              description: matchedEvent.description,
              skills: matchedEvent.skills,
              eventDate: matchedEvent.eventDate,
              day: matchedEvent.day,
            };
          }
          return null; // Return null if no match is found
        });
      
        // Filter out any null values in case there were unmatched events
        const filteredMyEvents = editedMyEvents.filter(event => event !== null);
        // Log the filtered events for debugging
    
        // Set the state with the filtered events
        setMyEvents([...filteredMyEvents]);
        
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
  
  async function GETevent_data() {
    try {
      const response = await fetch("/api/USER/events-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data_from_db = await response.json();
  
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
  

  async function PATCHdata()
  {
    if(!userID)return; //guard case for rendering
    try {
      // Call the login API

      const response = await fetch("/api/account-management/user-account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          firstName, 
          lastName, 
          address1,
          address2,
          city,
          state,
          zipCode,
          skills,
          availability,
          preferences
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to user events page on successful login
          
      } else {
    
      }
    } catch (err) {
 
      //router.push(`/`);
    }
  };

  
  //useEffect() empty dependency array
  
  useEffect(() => {GETevent_data()}, []);
  useEffect(() => {GETuser_data()}, [userID, events]);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    router.push("/login");
  };

  const handleEventsChangeOnClick = () => {
    if (currentPage === "myEvents") {
      setCurrentPage("allEvents");
    } else if (currentPage === "allEvents") {
      setCurrentPage("myEvents");
    }
  };

  const handleRSVPOnClick = (thisEvent) => {
    setCurrentPage("RSVP");
    setThisEvent(thisEvent);
  };

  const handleGoBackOnClick = () => {
    setCurrentPage("myEvents");
  };

  const handleSaveClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  const myEventsArray = [
    { eventNum: 1, rsvp: true },
    { eventNum: 2, rsvp: true },
    { eventNum: 3, rsvp: true },
  ];

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <Navbar
        currentPage="Events"
        userEmail={userEmail}
        userID={userID}
        handleLogout={handleLogout}
        navLinks={[
          { name: "Account", href: `/user/${userID}/account` },
          { name: "Events", href: `/user/${userID}/events` },
          { name: "Notification", href: `/user/${userID}/notifications` },
          { name: "Log out", href: "#", onClick: handleLogout },
        ]}
        showLogout={true}
      />

      <div style={styles.eventsContainer}>
        <h1 style={styles.title}>Events</h1>
        {currentPage === "myEvents" && (
          <div style={styles.eventsButtonsContainer}>
            <button style={styles.blackEventsButtons}>My events</button>
            <button
              style={styles.grayEventsButtons}
              onClick={handleEventsChangeOnClick}
            >
              All events
            </button>
          </div>
        )}
        {currentPage === "myEvents" && (
          <div style={styles.eventsGrid}>
            {myEvents.map((event) => (
              <div style={styles.eventWrapper} key={event.eventID}>
                <div style={styles.eventBox}></div>
                <div style={styles.eventInfo}>
                  <p>{event.eventName}</p>
                    <button
                      style={styles.rsvpButton}
                      onClick={() => handleRSVPOnClick(event)}
                    >
                      RSVP'd
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {currentPage === "allEvents" && (
          <div style={styles.eventsButtonsContainer}>
            <button
              style={styles.grayEventsButtons}
              onClick={handleEventsChangeOnClick}
            >
              My events
            </button>
            <button style={styles.blackEventsButtons}>All events</button>
          </div>
        )}
        {currentPage === "allEvents" && (
          <div style={styles.eventsGrid}>
            {events.map((event) => (
              <div key={event.eventID} style={styles.eventWrapper}> {/* Add key prop here */}
                <div style={styles.eventBox}></div>
                <div style={styles.eventInfo}>
                  <p>{event.eventName}</p>
                  <button style={styles.rsvpButton} onClick={() => handleRSVPOnClick(event)}>
                    Click here to RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentPage === "RSVP" && (
          <div style={styles.rsvpContainer}>
            <div style={styles.rsvpBox}></div>
            <div style={styles.eventInfoContainer}>
              <div>
                <p style={styles.eventNameText}>{thisEvent.eventName}</p>
              </div>
              <div style={styles.urgencyContainer}>
                <p style={styles.urgencyText}>Urgency</p>
                <div style={styles.imageUrgencyContainer}>
                  <img src="/Ellipse.png" style={styles.blueDot}></img>
                  <p style={styles.urgencyText}>{thisEvent.urgency}</p>
                </div>
              </div>
            </div>
            <p style={styles.infoText}>Address</p> 
            <input style={styles.addressInput} placeholder={thisEvent.address} type="text" readOnly></input>

            <div style={styles.cityStateZip}>
              <div style={styles.cityContainer}>
                <p style={styles.infoText}>City</p>
                <input style={styles.cityInput} placeholder={thisEvent.city} type="text" readOnly></input>
              </div>
              <div style={styles.stateContainer}>
                <p style={styles.infoText}>State</p>
                <input style={styles.stateInput} placeholder={thisEvent.state} type="text" readOnly></input>
              </div>
              <div style={styles.zipContainer}>
                <p style={styles.infoText}>Zip Code</p>
                <input style={styles.zipInput} placeholder={thisEvent.zipCode} type="text" readOnly></input>
              </div>
            </div>

            <p style={styles.infoText}>Description</p>
            <textarea style={styles.descriptionInput} placeholder={thisEvent.description} type="text" readOnly></textarea>

            <div style={styles.prefAvail}>
              <div style={styles.skillsContainer}>
                <p style={styles.infoText}>Required Skills</p>
                <textarea
                  style={styles.skillsInput}
                  placeholder={thisEvent.skills}
                  type="text"
                  readOnly
                ></textarea>
              </div>
              <div style={styles.availabilityContainer}>
                <p style={styles.infoText}>Event Date</p>
                <input
                  style={styles.availabilityInput}
                  placeholder={thisEvent.eventDate}
                  type="text"
                  readOnly
                ></input>
              </div>
            </div>

            <div style={styles.rsvpSaveContainer}>
              <div style={styles.rsvpCheckContainer}>
                <label htmlFor="rsvpCheckbox" style={styles.clickHereRSVPText}>
                  Click here to RSVP
                </label>
                <input
                  type="checkbox"
                  id="rsvpCheckbox"
                  style={styles.rsvpCheckBoxStyle}
                ></input>
              </div>
              <button
                style={isClicked ? styles.saveButtonClicked : styles.saveButton}
                onClick={handleSaveClick}
              >
                Save Changes
              </button>
            </div>

            <button style={styles.goBack} onClick={handleGoBackOnClick}>
              Go Back
            </button>
          </div>
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
  eventsContainer: {
    marginTop: "10vh",
    width: "82.5vw",
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
    height: "60vh", // Adjust the height if needed
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
  rsvpButton: {
    color: "#309CFF",
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
  urgencyContainer: {
    gap: "10px", // Space between icon and text
    alignItems: "center",
  },
  urgencyText: {
    fontSize: "18px",
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
    height: "20vh",
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
  skillsContainer: {
    display: "flex",
    flexBasis: "55%",
    flexDirection: "column",
    flexGrow: 1,
  },
  skillsInput: {
    width: "100%", // Full width of the parent container
    height: "10vh", // Adjust height to something more reasonable
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
    width: "100vh",
    height: "5vh",
    backgroundColor: "#309CFF",
    color: "white", // Optional: Add color for contrast
    border: "none", // Optional: Remove default border
    borderRadius: "3px",
    cursor: "pointer", // Optional: Change cursor to pointer on hover
  },
};
