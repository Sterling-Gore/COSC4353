import React from "react";

export default function Notifications() {
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

        <div style={styles.notificationsContainer}>
          <p style={styles.notificationsText}>
            Events
          </p>
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
  };
  
