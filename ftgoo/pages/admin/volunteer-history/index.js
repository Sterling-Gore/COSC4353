import React from "react";
import { useState } from "react";

export default function VolunteerHistory() {
  const [people, setPeople] = useState("SterlingGore");

  const JorellPadilla = [
    { eventNum: 1, time: "9/21/2024", eventStatus: "Helped the homeless." },
    { eventNum: 2, time: "9/21/2024", eventStatus: "Cleaned the park." },
    { eventNum: 3, time: "9/28/2024", eventStatus: "Took out the trash" },
  ];
  const SterlingGore = [
    { eventNum: 1, time: "8/18/2024", eventStatus: "Helped feed animals." },
    { eventNum: 2, time: "9/2/2024", eventStatus: "Made food for the orphanage." },
  ];
  const MeenakshiVinod = [
    { eventNum: 1, time: "4/13/2024", eventStatus: "Helped the elderly with physical therapy." },
    { eventNum: 2, time: "8/30/2024", eventStatus: "Hosted a painting class at a hospital." },
  ];
  const JasonYen = [
    { eventNum: 1, time: "7/15/2024", eventStatus: "Donated blood and left kidney to MD Anderson." },
  ];

  // Determine which array of events to display based on the selected person
  let selectedEvents = [];
  if (people === "SterlingGore") {
    selectedEvents = SterlingGore;
  } else if (people === "JorellPadilla") {
    selectedEvents = JorellPadilla;
  } else if (people === "MeenakshiVinod") {
    selectedEvents = MeenakshiVinod;
  } else if (people === "JasonYen") {
    selectedEvents = JasonYen;
  }

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>FTGOO</div>
        <div style={styles.navLinks}>
          <a href="./account">Account</a>
          <a href="./event-management">Event Management</a>
          <span style={styles.navOnPage}>History</span>
          <a href = "./matching">Matching</a>
          <a href= "../user/events">
                <span style = {styles.navSwitchButton}>User-Mode</span>
              </a>
          <a href="../">
            <span style={styles.navButton}>Log out</span>
          </a>
        </div>
      </nav>

      <div style={styles.notificationsContainer}>
        <h1 style={styles.title}>Volunteer History</h1>
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Volunteers</label>
            <select
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              required
              style={styles.input}
            >
              <option value="SterlingGore">Sterling Gore</option>
              <option value="JorellPadilla">Jorell Padilla</option>
              <option value="MeenakshiVinod">Meenakshi Vinod</option>
              <option value="JasonYen">Jason Yen</option>
            </select>
          </div>

          {selectedEvents.map((notification) => (
            <div style={styles.eventContainer} key={notification.eventNum}>
              <div style={styles.topLeftEventText}>Event {notification.eventNum} - Reminder</div>
              <div style={styles.bottomLeftEventText}>{notification.time}</div>
              <div style={styles.rightEventText}>{notification.eventStatus}</div>
            </div>
          ))}
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
    backgroundColor: "#E6E1D3",
    height: "100vh",
  },
  notificationsContainer: {
    marginTop: "10vh",
    width: "60%",
    backgroundColor: "white",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 80,
    alignItems: "center",
    textAlign: "center",
    borderRadius: "10px",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
    minWidth: "50vw",
  },
  inputGroup: {
    flex: "1 1 calc(50% - 10px)",
    minWidth: "300px",
    marginBottom: "10px",
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
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#555",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  eventContainer: {
    marginBottom: "5vh",
    width: "100%",
    height: "12vh",
    border: "2px solid black",
    borderRadius: "8px",
    display: "flex",
    backgroundColor: "#E6E1D3",
    alignItems: "flex-start",
    position: "relative",
  },
  topLeftEventText: {
    textAlign: "left",
    color: "black",
    fontSize: "22px",
    position: "absolute",
    top: 0,
    left: 0,
  },
  bottomLeftEventText: {
    textAlign: "left",
    color: "black",
    fontSize: "22px",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  rightEventText: {
    textAlign: "right",
    color: "black",
    fontSize: "22px",
    position: "absolute",
    top: 0,
    right: 0,
    maxWidth: "415px",
    lineHeight: "1.5",
  },

  // NAVBAR
  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#FF3030",
    color: "#f4f4f4",
    zIndex: 2,
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
  navSwitchButton: {
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    color: "#007BFF",
    border: "none",
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: "10px",
    width: "15vw",
  },
  navButton: {
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    fontWeight: "bold",
    color: "#FF3030",
    border: "none",
    padding: "6px 12px",
    borderRadius: "10px",
    width: "15vw",
  },
  navOnPage: {
    fontWeight: "bolder",
  },
};