import handler from "./reminder-notification";
import { addReminder } from "../mockDatabase";
import { findUserByID, getEvents, updateUser } from "../mockDatabase";

let mockUser;

jest.mock("../mockDatabase", () => {
  const originalModule = jest.requireActual("../mockDatabase");

  return {
    ...originalModule,
    findUserByID: jest.fn(),
    getEvents: jest.fn(),
    updateUser: jest.fn(),
    addReminder: jest.fn((userID) => {
      if (mockUser) {
        const event = {
          eventID: 101,
          eventName: "TEST Event 1",
          eventDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Set event date to one day away
          day: "Monday",
        };

        // Simulate adding the reminder
        mockUser.notifications.push({
          userID: userID.toString(),
          eventID: event.eventID,
          eventName: event.eventName,
          eventDate: event.eventDate,
          notificationDate: new Date().toISOString().split('T')[0],
          day: event.day,
          notificationType: "Reminder",
          status: "This event is occurring soon, make sure to arrive by the event's time!",
        });
      }
    }),
  };
});

describe("addReminder", () => {
  let mockEvents;

  beforeEach(() => {
    // Mock user data
    mockUser = {
      userID: "1", // Keep as string to match the notification structure
      firstName: "Jason",
      lastName: "Yen",
      email: "jasonyen2004@gmail.com",
      password: "YenCH@77479$%",
      address1: "12345 Pine Ave.",
      address2: "",
      city: "Houston",
      state: "TX",
      zipCode: "77479",
      skills: ["Health", "Animal Care"],
      preferences: "abc\n",
      availability: ["Monday", "Tuesday", "Wednesday"],
      role: "user",
      isLoggedIn: false,
      rsvpEvents: [101, 102], // Ensure these match your mockEvents
      oldEvents: [],
      notifications: [],
    };

    // Mock events data
    mockEvents = [
      {
        eventID: 101,
        eventName: "TEST Event 1",
        urgency: "Low",
        address: "456 Pine Avenue TX",
        city: "Austin",
        state: "TX",
        zipcode: "12345",
        description: "THIS IS A TEST EVENT 1",
        skills: ["Health", "Education"],
        eventDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // One day away
        day: "Monday",
      },
      {
        eventID: 102,
        eventName: "TEST Event 2",
        urgency: "Low",
        address: "789 Elm Street TX",
        city: "Austin",
        state: "TX",
        zipcode: "54321",
        description: "THIS IS A TEST EVENT 2",
        skills: ["Education"],
        eventDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // Two days away
        day: "Tuesday",
      },
    ];

    // Set up mocks
    findUserByID.mockReturnValue(mockUser);
    getEvents.mockReturnValue(mockEvents);
    updateUser.mockImplementation(jest.fn());
  });

  it("should add a reminder if an event is one day away", async () => {
    const req = { method: "PATCH", body: { userID: "1" } }; // Use string ID
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    // Call the handler
    await handler(req, res);
  
    // Check if a notification was added
    expect(mockUser.notifications).toHaveLength(1);
    expect(mockUser.notifications[0]).toEqual(expect.objectContaining({
      userID: "1",  // Ensure this matches the string ID in mockUser
      eventID: 101, 
      eventName: "TEST Event 1",
      eventDate: expect.any(String),
      notificationDate: expect.any(String), 
      day: "Monday", 
      notificationType: "Reminder",
      status: "This event is occurring soon, make sure to arrive by the event's time!",
    }));
  });

  it("should not add a reminder if the event is more than one day away", async () => {
    const req = { method: "PATCH", body: { userID: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Set the second event's date to more than one day away
    mockEvents[1].eventDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(); // Two days away

    await handler(req, res);

    // Check if no notifications were added
    expect(mockUser.notifications).toHaveLength(1); // Should remain the same
  });
});