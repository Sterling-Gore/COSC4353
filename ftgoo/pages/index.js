// pages/index.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";

export default function Home() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Mock check for user login status
    const loggedInUser = localStorage.getItem("userEmail");
    if (loggedInUser) {
      setUserEmail(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    router.push("/login");
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.containerCover}>
          {/* Navbar */}
          <Navbar userEmail={userEmail} handleLogout={handleLogout} />

          {/* Centered "Hello" */}
          <div style={styles.center}>
            <div style={styles.centerLogo}>
              <p>
                For the <span style={styles.good}>good</span> of others.
              </p>
            </div>
            <p>
              <span style={styles.simpleText}>
                Find opportunities near you for volunteering
              </span>
            </p>
            <a href="./registration">
              <span style={styles.button}>Get Involved</span>
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
  center: {
    zIndex: 1, // Ensures the "Hello" is on top of the background
    textAlign: "center",
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
