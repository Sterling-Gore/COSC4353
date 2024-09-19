import React from "react";

export default function Events() {
  const eventsArray = [
    { eventNum: 1, rsvp: false },
    { eventNum: 2, rsvp: false },
    { eventNum: 3, rsvp: false },
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
        <p style={styles.eventsText}>
          Events
        </p>
        {eventsArray.map((event) => (
          <div>
          </div>
        ))}
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
  eventsContainer: {
    marginTop: "40px", 
    width: "60%",
    backgroundColor: "white",
    minHeight: "60vh", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "10px",
    padding: "20px", 
    marginLeft: "auto",
    marginRight: "auto",
  },
  eventsText: {
    fontSize: "37px",
    color: "black",
    fontWeight: 500,
    marginBottom: "10vh",
  },
  eventContainer: {
    marginBottom: "5vh",
    width: "80%",
    height: "12vh",
    border: "1px solid black",
    display: "flex",
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
};
