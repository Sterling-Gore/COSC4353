import handler from "./event-data"; // Adjust the path if needed
import { getEvents } from "../mockDatabase";

// Mocking the getEvents function from the mock database
jest.mock("../mockDatabase", () => ({
  getEvents: jest.fn(),
}));

describe("Event Data Handler", () => {
  let req, res;

  beforeEach(() => {
    req = { method: "GET" }; // Default to GET request
    res = {
      status: jest.fn(() => res), // Allows method chaining
      json: jest.fn(),
    };
  });

  it("should return 200 with event data when events exist", () => {
    const mockEvents = [
      { eventID: 1, name: "Charity Run" },
      { eventID: 2, name: "Food Drive" },
    ];

    // Mock the database function to return events
    getEvents.mockReturnValue(mockEvents);

    // Call the handler with the mock request and response
    handler(req, res);

    // Verify the response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Landing",
      events: mockEvents,
    });
  });

  it("should return 401 if no events exist", () => {
    // Mock the database function to return undefined
    getEvents.mockReturnValue(undefined);

    // Call the handler
    handler(req, res);

    // Verify the response
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Event does not exist",
    });
  });

  it("should return 405 for unsupported methods", () => {
    req.method = "POST"; // Change the request method to POST

    // Call the handler
    handler(req, res);

    // Verify the response
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      error: "Method Not Allowed",
    });
  });
});
