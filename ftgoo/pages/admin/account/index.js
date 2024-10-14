import { useRouter } from "next/router";
import AdminNavbar from "@/components/adminNavbar"; // Adjust the path as needed

export default function ProfileManagement() {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic here if necessary
    localStorage.removeItem("adminEmail");
    router.push("/login");
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <AdminNavbar currentPage="Account" handleLogout={handleLogout} />

      {/* Profile Content */}
      <div style={styles.profileBox}>
        <h1 style={styles.title}>Account</h1>
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <div style={styles.dataBox}>
              <p>sterlinggore2025@gmail.com</p>
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>First Name</label>
              <div style={styles.dataBox}>
                <p>Sterling</p>
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Last Name</label>
              <div style={styles.dataBox}>
                <p>Gore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add your styles here as needed

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#E6E1D3",
    padding: "20px",
  },
  profileBox: {
    marginTop: "10vh",
    width: "52.5vw",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },
  inputGroup: {
    flex: "1 1 calc(50% - 10px)",
    minWidth: "300px",
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#555",
  },
  dataBox: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#E6E1D3",
    color: "#333",
    boxSizing: "border-box",
  },
};
