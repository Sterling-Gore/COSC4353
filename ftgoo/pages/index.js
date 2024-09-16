

import { useRouter } from "next/router";

export default function Home() {
  return (
    <>
      <div style={styles.container}>
        <div style = {styles.containerCover}>
          {/* Navbar */}
          <nav style={styles.navbar}>
            <div style={styles.logo}>FTGOO</div>
            <div style={styles.navLinks}>
              <a href="./login">Account</a>
              <a href="./login">Events</a>
              <a href="./login">Dashboard</a>
              <a href="./login">History</a>
              <a href="./login">Notification</a>
              <a href="./login">Login</a>
              <a href="./registration">Create Account</a>
            </div>
          </nav>

          {/* Centered "Hello" */}
          <div style={styles.center}>
          <h2>For the <span style={styles.good}>good</span> of others.</h2>
          <p><span style = {styles.simpleText}>Find opportunities near you for volunteering</span></p>
          <a href="./registration">Get Involved</a>
          </div>
        </div>
        
      </div>
    </>
  );
}

const styles = {
  container: {
    background: "url('/VolunteerArtwork.jpg')", // Background image URL
    backgroundRepeat: "no-repeat",
    backgroundSize: "100vw 100vh",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Centers the content vertically
    alignItems: "center", // Centers the content horizontally
  },
  containerCover: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100vw 100vh",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Centers the content vertically
    alignItems: "center", // Centers the content horizontally
  },
  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#279CB7", // Transparent black background for the navbar
    color: "#f4f4f4",
    zIndex: 2, // Ensures the navbar is on top of the background
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "24px",
  },
  navLinksA: {
    color: "#f4f4f4",
    textDecoration: "none",
  },
  center: {
    zIndex: 1, // Ensures the "Hello" is on top of the background
    textAlign: "center",
    //fontFamily: "Georgia",
    color: "#ffffff",
    fontSize: "48px",
    gap: "100px",
  },
  centerLogo: {
    fontSize: "100px",
  },
  good: {
    color: "#279CB7",
  },
  simpleText: {
    fontSize: "24px",
    fontWeight: "lighter",
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
};
