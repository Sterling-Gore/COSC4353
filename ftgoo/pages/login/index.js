import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  // State to store form input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Call the login API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to user events page on successful login

        router.push(`/user/${data.user.password}/events`);
      } else {
        // Handle login errors (e.g., wrong credentials)
        setError(
          data.error ||
            "Login failed. Please check your credentials and try again."
        );
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
          <div style={styles.links}>
            <a href="/registration" style={styles.link}>
              Don't have an account? Register here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

// Inline styles for the login page
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#007BFF",
  },
  loginBox: {
    backgroundColor: "#ffffff",
    padding: "40px",
    width: "52.5vw",
    minHeight: "40vh",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    color: "#333333", // Dark text color for better readability
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    color: "#333333", // Dark text color for better readability
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    boxSizing: "border-box",
    backgroundColor: "#f9f9f9", // Light background for input
    color: "#333333", // Dark text color inside input
  },
  button: {
    padding: "10px",
    backgroundColor: "#0070f3",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  links: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
  },
  link: {
    color: "#0070f3", // Blue color for links
    textDecoration: "none",
  },
};
