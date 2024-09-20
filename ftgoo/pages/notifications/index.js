import React from "react";

export default function Notifications() {
  const notificationsArray = [
    { eventNum: 1, time: "1:22 PM", eventStatus: "This event is now coming up, please show up quickly, it starts soon." },
    { eventNum: 2, time: "1:01 PM", eventStatus: "This event was now cancelled. No need to come and visit." },
    { eventNum: 3, time: "1:00 PM", eventStatus: "New events that match your profile, please check them out in the events page." },
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

      <div style={styles.notificationsContainer}>
        <p style={styles.notificationsText}>Notifications</p>
        {notificationsArray.map((notification) => (
          <div style={styles.eventContainer} key={notification.eventNum}>
            <div style={styles.topLeftEventText}>Event {notification.eventNum} - Reminder</div>
            <div style={styles.bottomLeftEventText}>{notification.time}</div>
            <div style={styles.rightEventText}>{notification.eventStatus}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "gray",
      height: "100vh",
    },
    containerCover: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    navbar: {
      position: "absolute",
      top: 0,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#007BFF",
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
    notificationsContainer: {
      marginTop: "10vh",
      width: "60%",
      backgroundColor: "white",
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      borderRadius: "10px",
    },
    notificationsText: {
      fontSize: "37px",
      color: "black",
      marginTop: "7vh",
      fontWeight: 500,
      marginBottom: "10vh",
    },
    eventContainer: {
      marginBottom: "5vh",
      width: "80%",
      height: "12vh",
      border: "1px solid black",  // Ensure the border is black and solid
      display: "flex",
      alignItems: "flex-start", // Align items to the top
      position: "relative", // For absolute positioning of child elements
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
};
