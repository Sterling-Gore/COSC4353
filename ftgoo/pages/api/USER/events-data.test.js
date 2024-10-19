import handler from './events-data'; // Adjust the path accordingly
import { getEvents } from "../mockDatabase";
// Mock the getEvents function
jest.mock("../mockDatabase", () => ({
  getEvents: jest.fn(),
}));

describe("API Handler - GET Events", () => {
  let req, res;

  // Set up a mock response object
  beforeEach(() => {
    req = { method: "GET" };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  it("should return 200 and events if events exist", () => {
    // Mock data
    const mockEvents = [
      {
        eventID: 1,
        eventName: "Event 1",
        urgency: "High",
        address: "Test Address",
        city: "Houston",
        state: "TX",
        zipCode: "77001",
        skills: ["Education"],
        description: "Test event description",
        eventDate: "2024-10-19",
        day: "Saturday",
      },
    ];

    // Mock getEvents to return events
    getEvents.mockReturnValue(mockEvents);

    // Call the handler
    handler(req, res);

    // Assert status and response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Landing",
      events: mockEvents,
    });
  });

  it("should return 401 if no events exist", () => {
    // Mock getEvents to return an empty array
    getEvents.mockReturnValue([]);

    // Call the handler
    handler(req, res);

    // Assert status and error message
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "volunteers do not exist" });
  });

  it("should return 405 if method is not GET", () => {
    // Change the method to POST
    req.method = "POST";

    // Call the handler
    handler(req, res);

    // Assert status and error message
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method Not Allowed" });
  });
});