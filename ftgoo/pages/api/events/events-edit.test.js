// handler.test.js
import { findEventByID, updateEvent, eventUpdateNotification } from "../mockDatabase";
import handler from "./events-edit";  // Adjust path as necessary

// Mock the imported functions
jest.mock("../mockDatabase", () => ({
  findEventByID: jest.fn(),
  updateEvent: jest.fn(),
  eventUpdateNotification: jest.fn(),
}));

describe("API Handler", () => {
  let req, res;

  beforeEach(() => {
    req = {
      method: '',
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // POST request - Event exists
  it("should return 200 and event data when POST method is used and event exists", () => {
    req.method = "POST";
    req.body = { eventID: 1 };
    const mockEvent = { id: 1, eventName: "Sample Event" };
    findEventByID.mockReturnValue(mockEvent);

    handler(req, res);

    expect(findEventByID).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Landing", event: mockEvent });
  });

  // POST request - Event does not exist
  it("should return 401 when POST method is used and event does not exist", () => {
    req.method = "POST";
    req.body = { eventID: 999 };
    findEventByID.mockReturnValue(null);

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Event does not exist" });
  });

  // PATCH request - Event exists
  it("should return 200 and update event data when PATCH method is used and event exists", () => {
    req.method = "PATCH";
    req.body = {
      eventID: 1,
      eventName: "Updated Event",
      urgency: "High",
      address: "123 Street",
      city: "City",
      state: "State",
      zipCode: "12345",
      description: "Updated description",
      skills: ["Skill1", "Skill2"],
      eventDate: "2024-12-31",
      selectedDay: "Friday",
    };
    const mockEvent = { id: 1, eventName: "Old Event" };
    findEventByID.mockReturnValue(mockEvent);

    handler(req, res);

    expect(findEventByID).toHaveBeenCalledWith(1);
    expect(updateEvent).toHaveBeenCalledWith({
      ...mockEvent,
      eventName: "Updated Event",
      urgency: "High",
      address: "123 Street",
      city: "City",
      state: "State",
      zipCode: "12345",
      description: "Updated description",
      skills: ["Skill1", "Skill2"],
      eventDate: "2024-12-31",
      day: "Friday",
    });
    expect(eventUpdateNotification).toHaveBeenCalledWith(1, "Updated Event", "2024-12-31", "Friday");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Landing", event: mockEvent });
  });

  // PATCH request - Event does not exist
  it("should return 401 when PATCH method is used and event does not exist", () => {
    req.method = "PATCH";
    req.body = { eventID: 999 };
    findEventByID.mockReturnValue(null);

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Event does not exist" });
  });

  // Invalid method
  it("should return 405 when an unsupported method is used", () => {
    req.method = "DELETE";

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method Not Allowed" });
  });
});