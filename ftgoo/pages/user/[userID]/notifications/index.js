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
  const [myNotifications, setMyNotifications] = useState([]);

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

      console.log(userID);
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
        console.log(data);
        setUserEmail(data.email);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setAddress1(data.address1);
        setAddress2(data.address2);
        setCity(data.city);
        setState(data.state);
        setZipCode(data.zipcode);
        setSkills(data.skills);
        setAvailability(data.availability);
        setPreferences(data.preferences);
        console.log(data.notifications);
        setMyNotifications(data.notifications);
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
        setMyNotifications([""]);
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
      setMyNotifications([""]);
      //router.push(`/`);
    }
  };

  async function PATCHreminder(){
    if(!userID)return; //guard case for rendering
    try {
      // Call the login API

      const response = await fetch("/api/ADMIN/reminder-notification", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userID}),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to user events page on successful login
        
      } else {}
    } catch (err) {
      console.error("Failed to update reminders in notifications.", err);
    }
  }

  //useEffect() empty dependency array
  useEffect(() => {PATCHreminder()}, [userID]);
  useEffect(() => {GETdata()}, [userID]);
  
  //useEffect(() => {GETnotification_data()}, []);

  //GETdata(userID);

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    router.push("/login");
  };


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
          { name: "Notification", href: `/user/${userID}/notifications`},
          { name: "Log out", href: "#", onClick: handleLogout },
        ]}
        showLogout={true}
      />

      <div style={styles.notificationsContainer}>
        <h1 style={styles.title}>Notifications</h1>
        {myNotifications.map((notification) => (
          <>
          <div style={styles.eventContainer} key={`${notification.userID}-${notification.eventID}`}>
            <div style={styles.topLeftEventText}>
              {notification.notificationType} - {notification.eventName} 
            </div>
            <div style={styles.topRightEventText}> {notification.notificationDate}</div>
            <div style={styles.bottomLeftEventText}>Event Time: {notification.eventDate} - {notification.day}</div>
            <div style={styles.bottomRightEventText}>{notification.status}</div>
          </div>
          </>
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
  NotificationHeader: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 20
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
    height: "18vh",
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
  topRightEventText: {
    textAlign: "right",
    color: "black",
    fontSize: "22px",
    position: "absolute",
    top: 0,
    right: 0,
    maxWidth: "415px",
    lineHeight: "1.5",
  },
  bottomRightEventText: {
    textAlign: "right",
    color: "black",
    fontSize: "22px",
    position: "absolute",
    bottom: 0,
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
