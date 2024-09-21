import { useState } from "react";
import { useRouter } from "next/router";

export default function profile_management() {






  return (
    <div style={styles.container}>
        {/* Navbar */}
        <nav style={styles.navbar}>
            <div style={styles.logo}>FTGOO</div>
            <div style={styles.navLinks}>
            <span style = {styles.navOnPage}>Account</span>
              <a href="./event-management">Event Management</a>
              <a href="./volunteer-history">History</a>
              <a href = "./matching">Matching</a>
              <a href= "../user/events">
                <span style = {styles.navSwitchButton}>User-Mode</span>
              </a>
              <a href="../">
                <span style = {styles.navButton}>Log out</span>
              </a>
            </div>
          </nav>
        {/* center */ }
      <div style={styles.profileBox}>
        <h1 style={styles.title}>Account</h1>
        <div style = {styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
                <div style = {styles.dataBox}>
                    <p>sterlinggore2025@gmail.com</p>
                </div>
            </div>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name</label>
                <div style = {styles.dataBox}>
                    <p>Sterling</p>
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name</label>
                <div style = {styles.dataBox}>
                    <p>Gore</p>
                </div>
              </div>
            </div>
            
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
  error: {
    color: "#d9534f",
    marginBottom: "10px",
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
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
    boxSizing: "border-box",
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
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
    boxSizing: "border-box",
    minHeight: "100px",
    resize: "vertical",
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
  multiSelectContainer: {
    position: "relative",
    cursor: "pointer",
  },
  multiSelect: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#fff",
    minHeight: "40px",
    boxSizing: "border-box",
  },
  selectedSkills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
    color: "#808080",
    marginBottom: "5px",
  },
  skillTag: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
  },
  clearTag: {
    marginLeft: "5px",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: "0",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    zIndex: "1000",
    maxHeight: "150px",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  dropdownItem: {
    padding: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: "#333",
  },
  dropdownItemSelected: {
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  availabilityCheckbox: {
    marginRight: "10px",
  },
  availabilityOption: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  links: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
  },
  //this is the start of the nav CSS elements
  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#FF3030", // Transparent black background for the navbar
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
  navOnPage: {
    fontWeight: "bolder",
  },
  navSwitchButton: {
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    color: "#007BFF",
    border: "none",
    padding: "6px 12px",
    borderRadius: "10px",
    fontWeight: "bold",
    width: "15vw",
  },
  navButton: {
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    color: "#FF3030",
    border: "none",
    padding: "6px 12px",
    fontWeight: "bold",
    borderRadius: "10px",
    width: "15vw",
  },
};
