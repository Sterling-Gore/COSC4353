import fs from "fs";
import {
  getUsers,
  getEvents,
  addUser,
  writeUsers,
  addRSVP,
  deleteRSVP,
  findUserByEmail,
  findUserByID,
  updateUser,
  addEvent,
  findEventByID,
  updateEvent,
  volunteerMatchOnEventCreation,
  eventUpdateNotification,
  addReminder,
} from "./mockDatabase"; // Ensure the path is correct

jest.mock("fs"); // Mock the fs module

describe("mockDatabase.js functions", () => {
  const mockUsers = [
    {
      userID: 1,
      email: "user1@example.com",
      rsvpEvents: [],
      skills: ["JS"],
      notifications: [],
      availability: ["Monday"],
    },
    {
      userID: 2,
      email: "user2@example.com",
      rsvpEvents: [1],
      skills: ["Python"],
      notifications: [],
      availability: ["Tuesday"],
    },
  ];

  const mockEvents = [
    {
      eventID: 1,
      eventName: "Event 1",
      eventDate: new Date().toISOString(),
      day: "Monday",
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks(); // Reset mocks between tests
    fs.readFileSync.mockImplementation((filePath) => {
      if (filePath.includes("users.json")) return JSON.stringify(mockUsers);
      if (filePath.includes("events.json")) return JSON.stringify(mockEvents);
      throw new Error("File not found");
    });
    fs.writeFileSync.mockImplementation(() => {}); // Mock writeFileSync
  });

  describe("getUsers", () => {
    it("should return users from users.json", () => {
      const users = getUsers();
      expect(users).toEqual(mockUsers);
    });

    it("should return an empty array if reading users.json fails", () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("File not found");
      });
      const users = getUsers();
      expect(users).toEqual([]);
    });
    it("should return an empty array if users.json cannot be read", () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("File read error");
      });
      const users = getUsers();
      expect(users).toEqual([]); // Ensure fallback to an empty array
    });
    it("should return an empty array if users.json throws an error", () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("File not found");
      });
      const users = getUsers();
      expect(users).toEqual([]);
    });
  });

  describe("getEvents", () => {
    it("should return events from events.json", () => {
      const events = getEvents();
      expect(events).toEqual(mockEvents);
    });

    it("should return an empty array if reading events.json fails", () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("File not found");
      });
      const events = getEvents();
      expect(events).toEqual([]);
    });

    it("should return an empty array if events.json cannot be read", () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("File read error");
      });
      const events = getEvents();
      expect(events).toEqual([]); // Ensure fallback to an empty array
    });
    it("should return an empty array if events.json throws an error", () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("Read error");
      });
      const events = getEvents();
      expect(events).toEqual([]); // Should fall back to an empty array
    });
  });

  describe("addUser", () => {
    it("should add a new user and write to users.json", () => {
      const newUser = { userID: 3, email: "new@example.com", rsvpEvents: [] };
      addUser(newUser);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("users.json"),
        JSON.stringify([...mockUsers, newUser], null, 2)
      );
    });
    it("should throw an error if writing users.json fails", () => {
      fs.writeFileSync.mockImplementation(() => {
        throw new Error("Write error");
      });
      expect(() => addUser({ userID: 3, email: "new@example.com" })).toThrow(
        "Write error"
      );
    });
  });

  describe("writeUsers", () => {
    it("should write users to users.json", () => {
      writeUsers(mockUsers);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("users.json"),
        JSON.stringify(mockUsers, null, 2)
      );
    });

    it("should call fs.writeFileSync when writing users", () => {
      writeUsers(mockUsers);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("users.json"),
        JSON.stringify(mockUsers, null, 2)
      );
    });
  });

  describe("addRSVP", () => {
    it("should add an RSVP and update the user", () => {
      addRSVP(1, 1);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("users.json"),
        expect.any(String)
      );
    });

    it("should throw an error if RSVP already exists", () => {
      expect(() => addRSVP(2, 1)).toThrow(
        "RSVP for event 1 already exists for this user."
      );
    });
  });

  describe("deleteRSVP", () => {
    it("should delete an RSVP and update the user", () => {
      deleteRSVP(2, 1);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("users.json"),
        expect.any(String)
      );
    });
    it("should throw an error if RSVP does not exist", () => {
      expect(() => deleteRSVP(1, 99)).toThrow(
        "RSVP for event 99 does not exist for this user."
      );
    });
    it("should throw an error if deleting an RSVP that does not exist", () => {
      expect(() => deleteRSVP(1, 99)).toThrow(
        "RSVP for event 99 does not exist for this user."
      );
    });
  });

  describe("findUserByID", () => {
    it("should find a user by ID", () => {
      const user = findUserByID(1);
      expect(user).toEqual(mockUsers[0]);
    });
  });

  describe("findUserByEmail", () => {
    it("should find a user by email", () => {
      const user = findUserByEmail("user1@example.com");
      expect(user).toEqual(mockUsers[0]);
    });
  });

  describe("updateUser", () => {
    it("should throw an error if user not found for update", () => {
      const nonExistentUser = { userID: 99 };

      // Check if any error is thrown
      expect(() => updateUser(nonExistentUser)).toThrow();
    });
  });

  describe("addEvent", () => {
    it("should add a new event and write to events.json", () => {
      const newEvent = { eventID: 2, eventName: "New Event" };
      addEvent(newEvent);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("events.json"),
        expect.any(String)
      );
    });
  });

  describe("findEventByID", () => {
    it("should find an event by ID", () => {
      const event = findEventByID(1);
      expect(event).toEqual(mockEvents[0]);
    });
  });

  describe("updateEvent", () => {
    it("should update an event and write to events.json", () => {
      const updatedEvent = { ...mockEvents[0], eventName: "Updated Event" };
      updateEvent(updatedEvent);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("events.json"),
        expect.any(String)
      );
    });
  });

  describe("volunteerMatchOnEventCreation", () => {
    it("should notify users matching event skills", () => {
      volunteerMatchOnEventCreation(1, "Event 1", "2024-12-01", "Monday", [
        "JS",
      ]);
      expect(fs.writeFileSync).toHaveBeenCalled();
    });
  });

  describe("eventUpdateNotification", () => {
    it("should notify users of event updates", () => {
      eventUpdateNotification(1, "Event 1", "2024-12-02", "Tuesday");
      expect(fs.writeFileSync).toHaveBeenCalled();
    });
  });

  describe("addReminder", () => {
    it("should add a reminder notification for upcoming events", () => {
      const today = new Date();
      const eventDate = new Date(today.getTime() + 12 * 60 * 60 * 1000); // 12 hours from now

      const mockEvent = {
        eventID: 1,
        eventName: "Upcoming Event",
        eventDate: eventDate.toISOString(), // Ensure the event is within the 1-day range
        day: "Monday",
      };

      const mockUser = {
        userID: 1,
        rsvpEvents: [1], // User has RSVP'd to this event
        notifications: [], // No existing notifications
      };

      // Mock the file reads for users and events
      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath.includes("users.json")) return JSON.stringify([mockUser]);
        if (filePath.includes("events.json"))
          return JSON.stringify([mockEvent]);
        throw new Error("File not found");
      });

      // Call the function to add a reminder
      addReminder(1);

      // Verify that the reminder notification was added
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("users.json"),
        expect.stringContaining("Upcoming Event") // Ensure the event is included in the write
      );
    });
    it("should not add a duplicate reminder notification", () => {
      const mockUserWithReminder = {
        ...mockUsers[0],
        notifications: [{ eventID: 1 }],
      };

      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath.includes("users.json"))
          return JSON.stringify([mockUserWithReminder]);
        if (filePath.includes("events.json")) return JSON.stringify(mockEvents);
      });

      addReminder(1); // Attempt to add a duplicate reminder

      expect(fs.writeFileSync).not.toHaveBeenCalled(); // Ensure no duplicate is added
    });
    it("should not add a duplicate reminder notification", () => {
      const mockUserWithReminder = {
        ...mockUsers[0],
        notifications: [{ eventID: 1 }],
      };

      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath.includes("users.json"))
          return JSON.stringify([mockUserWithReminder]);
        if (filePath.includes("events.json")) return JSON.stringify(mockEvents);
      });

      addReminder(1); // Attempt to add a duplicate reminder

      expect(fs.writeFileSync).not.toHaveBeenCalled(); // Ensure no duplicate is added
    });
  });
});
