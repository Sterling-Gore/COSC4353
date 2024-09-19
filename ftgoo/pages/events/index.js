import React, { useState } from "react";

export default function Events() {
  const [currentPage, setCurrentPage] = useState("myEvents");

  const handleClick = () => {
    if (currentPage === "myEvents"){
      setCurrentPage("allEvents");
    }
    else{
      setCurrentPage("myEvents");
    }
  };

  const myEventsArray = [
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
      <div style={styles.containerCover}>
        <nav style={styles.navbar}>
          <div style={styles.logo}>FTGOO</div>
          <div style={styles.navLinks}>
            <a href="./login" style={styles.navLink}>Login</a>
            <a href="./registration">
              <span style={styles.navButton}>Create Account</span>
            </a>
          </div>
        </nav>
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
  eventsContainer: {
    marginTop: "10vh",
    width: "60%",
    backgroundColor: "white",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px",
  },
  eventsText: {
    fontSize: "37px",
    color: "black",
    marginTop: "7vh",
    fontWeight: 500,
    marginBottom: "2vh",
    textAlign: "center",
  },
  eventsButtonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  blackEventButton: {
    display: "flex",
    marginRight: "30px",
    marginLeft: "30px",
    fontSize: "25px",
    backgroundColor: "white",
    color: "black",
    border: "none",
    cursor: "pointer",
  },
  grayEventButton: {
    display: "flex",
    marginRight: "30px",
    marginLeft: "30px",
    fontSize: "25px",
    backgroundColor: "white",
    color: "gray",
    border: "none",
    cursor: "pointer",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10vh", 
    marginTop: "20px",
    justifyItems: "center", // Center items horizontally in each grid cell
    alignItems: "center", // Center items vertically in each grid cell
    border: "solid",
    borderColor: "black",
  },
  eachGridContainer: {

  },
};