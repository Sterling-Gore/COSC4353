import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";

export default function Notifications() {
  const router = useRouter();
  const { userID } = router.query; // Extract userID from query params
  const [userEmail, setUserEmail] = useState(null);
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


  async function GETdata()
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
  useEffect(() => {GETdata()}, [userID]);
  //GETdata(userID);

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    router.push("/login");
  };

  const notificationsArray = [
    {
      eventNum: 1,
      time: "1:22 PM",
      eventStatus:
        "This event is now coming up, please show up quickly, it starts soon.",
    },
    {
      eventNum: 2,
      time: "1:01 PM",
      eventStatus: "This event was now cancelled. No need to come and visit.",
    },
    {
      eventNum: 3,
      time: "1:00 PM",
      eventStatus:
        "New events that match your profile, please check them out in the events page.",
    },
  ];

  if (!userID) {
    // Wait until userID is defined
    return null;
  }

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <Navbar
        currentPage="Notification"
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

      <div style={styles.notificationsContainer}>
        <h1 style={styles.title}>Notifications</h1>
        {notificationsArray.map((notification) => (
          <div style={styles.eventContainer} key={notification.eventNum}>
            <div style={styles.topLeftEventText}>
              Event {notification.eventNum} - Reminder
            </div>
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
    backgroundColor: "#E6E1D3",
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
  notificationsContainer: {
    marginTop: "10vh",
    width: "60%",
    backgroundColor: "white",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "Center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "10px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
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
    //padding: "20px 20px",
    width: "80%",
    height: "12vh",
    border: "2px solid black", // Ensure the border is black and solid
    borderRadius: "8px",
    display: "flex",
    backgroundColor: "#E6E1D3",
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

  //NAVBAR
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
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: "10px",
    width: "15vw",
  },
  navOnPage: {
    fontWeight: "bolder",
  },
};
