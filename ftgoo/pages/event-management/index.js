"use client"; // Enable client-side rendering
import { useState } from "react";

export default function PageHandler() {
  const [currentPage, setCurrentPage] = useState('eventManagement'); // State to manage current page
  const [skills, setSkills] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [events, setEvents] = useState([]); // State to store the list of events

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      eventName,
      eventDescription,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      requiredSkills: skills,
      urgency,
      eventDate,
    };

    setEvents(prevEvents => [...prevEvents, newEvent].slice(0, 15)); // Add the new event to the events list, limit to 15
    setCurrentPage('eventManagement'); // Switch back to Event Management page
    alert("Event created successfully!");

    // Reset form fields
    setEventName("");
    setEventDescription("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setZipCode("");
    setUrgency("");
    setEventDate("");
    setSkills([]);
  };

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [urgency, setUrgency] = useState("Medium"); // Default urgency to "Medium"
  const [eventDate, setEventDate] = useState("");

  const handleCreateEventClick = () => {
    setCurrentPage('createEvent'); // Switch to the Create Event page
  };

  const handleBackClick = () => {
    setCurrentPage('eventManagement'); // Switch back to Event Management page
  };

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
    "Wisconsin", "Wyoming"
  ];

  return (
    <div style={styles.container}>
      {currentPage === 'eventManagement' && (
        <>
          {/* Navigation bar */}
          <div style={styles.navBar}>
            <div style={styles.logo}>FTGOO</div>
            <div style={styles.navButtons}>
              <button style={styles.navButton}>Login</button>
              <button style={styles.navButton}>Register</button>
            </div>
          </div>

          {/* Main content */}
          <div style={styles.mainContainer}>
            <div style={styles.contentBox}>
              <h1 style={styles.title}>Event Management</h1>

              {/* Render list of events */}
              <div style={styles.eventsContainer}>
                {events.slice(0, 15).map((event, index) => (
                  <div key={index} style={styles.eventBox}>
                    <h2>{event.eventName}</h2>
                    <p>{event.eventDescription}</p>
                    <p>{event.addressLine1}, {event.city}, {event.state} - {event.zipCode}</p>
                    <p>Urgency: {event.urgency}</p>
                    <p>Date: {event.eventDate}</p>
                  </div>
                ))}
              </div>

              <button style={styles.createEventButton} onClick={handleCreateEventClick}>
                Create New Event
              </button>
            </div>
          </div>
        </>
      )}

      {currentPage === 'createEvent' && (
        <>
          {/* Navigation Bar */}
          <div style={styles.navBar}>
            <div style={styles.logo}>FTGOO</div>
            <div style={styles.navButtons}>
              <button style={styles.navButton}>Login</button>
              <button style={styles.navButton}>Register</button>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={styles.mainContainer}>
            <div style={styles.createEventContentBox}>
              <h1 style={styles.title}>Create New Event</h1>
              <form onSubmit={handleSubmit} style={styles.createEventForm}>
                <input
                  type="text"
                  placeholder="Event Name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                  style={styles.inputBox}
                />
                <textarea
                  placeholder="Event Description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                  style={styles.textArea}
                />
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  required
                  style={styles.inputBox}
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  style={styles.inputBox}
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  style={styles.inputBox}
                />

                {/* State Dropdown */}
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  style={styles.inputBox}
                >
                  <option value="" disabled>Select State</option>
                  {states.map((stateOption) => (
                    <option key={stateOption} value={stateOption}>
                      {stateOption}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                  style={styles.inputBox}
                />

                {/* Urgency Radio Buttons */}
                <div style={styles.urgencyContainer}>
                  <label>Urgency:</label>
                  <label>
                    <input
                      type="radio"
                      value="High"
                      checked={urgency === "High"}
                      onChange={(e) => setUrgency(e.target.value)}
                    />
                    High
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Medium"
                      checked={urgency === "Medium"}
                      onChange={(e) => setUrgency(e.target.value)}
                    />
                    Medium
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Low"
                      checked={urgency === "Low"}
                      onChange={(e) => setUrgency(e.target.value)}
                    />
                    Low
                  </label>
                </div>

                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                  style={styles.inputBox}
                />

                <button type="submit" style={styles.createEventSubmit}>
                  Create Event
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Combined inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#D9D9D9',
  },
  navBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#FF3030',
    color: '#FFFFFF',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginRight: 'auto', // Ensures the logo stays on the left
  },
  navButtons: {
    display: 'flex',
    gap: '16px',
  },
  navButton: {
    backgroundColor: '#FFFFFF',
    color: '#FF3030',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '80px', // Added margin to prevent content from hiding under the navbar
    padding: '20px',
  },
  contentBox: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center', // Centers the title 
  },
  createEventButton: {
    backgroundColor: '#FF3030',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '18px',
    marginTop: '20px', // Add margin to space out from the events
  },
  eventsContainer: {
    display: 'flex',
    flexWrap: 'wrap', // Allows multiple rows
    gap: '20px', // Space between boxes
    justifyContent: 'center', // Centers the boxes
    width: '100%',
    maxHeight: 'calc(100vh - 180px)', // Adjust height to fit in view with the button
    overflowY: 'auto', // Allows scrolling if needed
  },
  eventBox: {
    backgroundColor: '#F1F1F1',
    width: '200px', // Width for the square box
    height: '200px', // Height for the square box
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Space out the content
    boxSizing: 'border-box',
  },
  createEventContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#D9D9D9',
  },
  createEventContentBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  createEventForm: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  inputBox: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #CCCCCC',
    marginBottom: '10px',
  },
  textArea: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #CCCCCC',
    marginBottom: '10px',
    resize: 'vertical',
  },
  createEventSubmit: {
    backgroundColor: '#FF3030',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '18px',
  },
  urgencyContainer: {
    marginBottom: '10px',
    
  },
};

