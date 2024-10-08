

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
              <a href="./login">Login</a>
              <a href="./registration">
                <span style = {styles.navButton}>Create Account</span>
              </a>
            </div>
          </nav>

          {/* Centered "Hello" */}
          <div style={styles.center}>
            <div style={styles.centerLogo}>
            <p>For the <span style={styles.good}>good</span> of others.</p>
            </div>
          <p><span style = {styles.simpleText}>Find opportunities near you for volunteering</span></p>
          <a href="./registration">
            <span style = {styles.button}>Get Involved</span>
          </a> 
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
  navLinksA: {
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
  center: {
    zIndex: 1, // Ensures the "Hello" is on top of the background
    textAlign: "center",
    //fontFamily: "Georgia",
    color: "#ffffff",
    fontSize: "48px",
    gap: "30px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  centerLogo: {
    fontSize: 120,
    fontWeight: "bolder",
  },
  good: {
    color: "#007BFF",
  },
  simpleText: {
    fontSize: "50px",
    fontWeight: "lighter",
  },
  button: {
    backgroundColor: "#007BFF",
    width: "15vw",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "30px",
    marginTop: "20px",
  },
};
