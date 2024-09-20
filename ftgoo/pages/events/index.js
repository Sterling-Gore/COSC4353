import { pages } from "next/dist/build/templates/app-page";
import React, { useState } from "react";

export default function Events() {
  const [currentPage, setCurrentPage] = useState("myEvents");
  const [selectedEventNum, setSelectedEventNum] = useState(null); // New state for selected event number

  const handleEventsChangeOnClick = () => {
    if (currentPage === "myEvents") {
      setCurrentPage("allEvents");
    } else if (currentPage === "allEvents") {
      setCurrentPage("myEvents");
    }
  };

  const handleRSVPOnClick = (eventNum) => {
    setSelectedEventNum(eventNum); // Set the selected event number
    setCurrentPage("RSVP");
  };

  const myEventsArray = [
    { eventNum: 1, rsvp: true },
    { eventNum: 2, rsvp: false },
    { eventNum: 3, rsvp: false },
    { eventNum: 4, rsvp: false },
    { eventNum: 5, rsvp: false },
    { eventNum: 6, rsvp: false },
    { eventNum: 7, rsvp: false },
    { eventNum: 8, rsvp: false },
    { eventNum: 9, rsvp: false },
  ];

  const allEventsArray = [
    { eventNum: 1, rsvp: false },
    { eventNum: 2, rsvp: false },
    { eventNum: 3, rsvp: false },
    { eventNum: 4, rsvp: false },
    { eventNum: 5, rsvp: false },
    { eventNum: 6, rsvp: false },
    { eventNum: 7, rsvp: false },
    { eventNum: 8, rsvp: false },
    { eventNum: 9, rsvp: false },
  ];

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>FTGOO</div>
        <div style={styles.navLinks}>
          <a href="./login" style={styles.navLink}>Login</a>
          <a href="./registration">
            <span style={styles.navButton}>Create Account</span>
          </a>
        </div>
      </nav>

      <div style={styles.eventsContainer}>
        <p style={styles.eventsText}>Events</p>
        {currentPage === "myEvents" && (
          <div style={styles.eventsButtonsContainer}>
            <button style={styles.blackEventsButtons}>My events</button>
            <button style={styles.grayEventsButtons} onClick={handleEventsChangeOnClick}>
              All events
            </button>
          </div>
        )}
        {currentPage === "myEvents" && (
          <div style={styles.eventsGrid}>
            {myEventsArray.map((event) => (
              <div style={styles.eventWrapper} key={event.eventNum}>
                <div style={styles.eventBox}></div>
                <div style={styles.eventInfo}>
                  <p>Event {event.eventNum}</p>
                  {event.rsvp ? (
                    <button style={styles.rsvpButton}>RSVP'd</button>
                  ) : (
                    <button style={styles.rsvpButton} onClick={() => handleRSVPOnClick(event.eventNum)}>
                      Click here to RSVP
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {currentPage === "allEvents" && (
          <div style={styles.eventsButtonsContainer}>
            <button style={styles.grayEventsButtons} onClick={handleEventsChangeOnClick}>
              My events
            </button>
            <button style={styles.blackEventsButtons}>All events</button>
          </div>
        )}
        {currentPage === "allEvents" && (
          <div style={styles.eventsGrid}>
            {allEventsArray.map((event) => (
              <div style={styles.eventWrapper} key={event.eventNum}>
                <div style={styles.eventBox}></div>
                <div style={styles.eventInfo}>
                  <p>Event {event.eventNum}</p>
                  {event.rsvp ? (
                    <button style={styles.rsvpButton}>RSVP'd</button>
                  ) : (
                    <button style={styles.rsvpButton} onClick={() => handleRSVPOnClick(event.eventNum)}>
                      Click here to RSVP
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {currentPage === "RSVP" && (
          <div style={styles.rsvpContainer}>
            <div style={styles.rsvpBox}></div>
            <div style={styles.eventInfoContainer}>
              <p style={styles.eventNameText}>
                Event {selectedEventNum} 
              </p>
              <div style={styles.urgencyContainer}>
                <p style={styles.eventNameText}>Urgency</p>
                <img src="/Ellipse1.png"></img>
                <p style={styles.urgencyText}>Low</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


const styles = {
  container: {
    backgroundColor: "gray",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "40px",
  },
  navbar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#007BFF",
    color: "#f4f4f4",
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
  navLink: {
    color: "#f4f4f4",
    textDecoration: "none",
  },
  navButton: {
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    color: "#007BFF",
    border: "none",
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
    marginTop: "40px",
    width: "90%",
    backgroundColor: "white",
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
    borderRadius: "10px",
    padding: "20px",
    marginLeft: "auto",
    marginRight: "auto",
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
    backgroundColor: "gray",
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
    color: "blue",
    marginTop: "5px",
    cursor: "pointer",
    backgroundColor: "white",
    border: "none",
    fontSize: "15px",
  },
  rsvpContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rsvpBox: {
    backgroundColor: "gray",
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
  },
  eventNameText: {
    gridColumn: "1 / span 2", // Event name takes full width
    fontSize: "20px",
    color: "black",
    textAlign: "left",
    marginBottom: "15px",
  },
  urgencyContainer: {
    display: "grid",
    gridTemplateColumns: "auto 1fr", // Grid with two columns: image and text
    gap: "10px", // Space between icon and text
    alignItems: "center",
  },
  urgencyText: {
    fontSize: "15px",
    color: "black",
    textAlign: "left",
  },
};
