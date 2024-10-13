import { useRouter } from "next/router";

export default function Navbar({
  currentPage,
  userEmail,
  userID,
  handleLogout,
}) {
  const router = useRouter();

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>FTGOO</div>
      <div style={styles.navLinks}>
        {userEmail ? (
          <>
            <a
              href={userID ? `/user/${userID}/account` : "#"}
              style={
                currentPage === "Account" ? styles.navOnPage : styles.navLink
              }
            >
              Account
            </a>
            <a
              href={userID ? `/user/${userID}/events` : "#"}
              style={
                currentPage === "Events" ? styles.navOnPage : styles.navLink
              }
            >
              Events
            </a>
            <a
              href={userID ? `/user/${userID}/notifications` : "#"}
              style={
                currentPage === "Notification"
                  ? styles.navOnPage
                  : styles.navLink
              }
            >
              Notification
            </a>
            <button onClick={handleLogout} style={styles.navButton}>
              Log out
            </button>
          </>
        ) : (
          <>
            <a href="/login" style={styles.navLink}>
              Login
            </a>
            <a href="/registration">
              <span style={styles.navButton}>Create Account</span>
            </a>
          </>
        )}
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
  navOnPage: {
    fontWeight: "bold",
    color: "#FFD700",
  },
  navButton: {
    backgroundColor: "#f4f4f4",
    color: "#007BFF",
    border: "none",
    padding: "6px 12px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};
