import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminNavbar({ currentPage, handleLogout }) {
  const router = useRouter();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check if admin is logged in by getting 'userRole' from localStorage
    const userRole = localStorage.getItem("userRole");
    setIsAdminLoggedIn(userRole === "admin");
  }, []); // Run only once when component mounts

  const handleLocalLogout = () => {
    // Clear admin-specific information from localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userID");
    localStorage.removeItem("userRole");

    if (handleLogout) {
      handleLogout();
    } else {
      // Navigate to the login page if no custom handleLogout is provided
      router.push("/login");
    }
  };

  if (!isAdminLoggedIn) return null; // Don't render the navbar if the user is not an admin

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>FTGOO Admin</div>
      <div style={styles.navLinks}>
        <a
          href="/admin/account"
          style={currentPage === "Account" ? styles.navOnPage : styles.navLink}
        >
          Account
        </a>
        <a
          href="/admin/event-management"
          style={currentPage === "Events" ? styles.navOnPage : styles.navLink}
        >
          Event Management
        </a>
        <a
          href="/admin/matching"
          style={currentPage === "Matching" ? styles.navOnPage : styles.navLink}
        >
          Matching
        </a>
        <a
          href="/admin/volunteer-history"
          style={
            currentPage === "Volunteer History"
              ? styles.navOnPage
              : styles.navLink
          }
        >
          Volunteer History
        </a>
        <button onClick={handleLocalLogout} style={styles.navButton}>
          Log out
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#FF3030", // Red background for the admin navbar
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
  navOnPage: {
    fontWeight: "bold",
    color: "#FFD700",
  },
  navButton: {
    backgroundColor: "#f4f4f4",
    color: "#FF3030",
    border: "none",
    padding: "6px 12px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};
