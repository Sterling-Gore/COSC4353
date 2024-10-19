import handler from './events-data'; // Adjust the path accordingly
import { getEvents } from "../mockDatabase"; // Ensure this is the correct path
import { createMocks } from "node-mocks-http";

jest.mock("../mockDatabase", () => ({
  getEvents: jest.fn(),
}));

describe("Events API Handler", () => {
  it("should return events with a GET request", async () => {
    const mockEvents = [
      {
        eventID: 1,
        eventName: "John's Food Shelter",
        urgency: "High",
        address: "123 Pine Avenue TX",
        city: "Houston",
        state: "TX",
        zipCode: "12345",
        description: "Free food for the homeless, we urgently need volunteers to hand out the food.",
        skills: ["Health"],
        eventDate: "2024-10-18",
        day: "Friday",
      },
    ];

    // Mock the implementation of getEvents
    getEvents.mockReturnValue(mockEvents);

    // Create a mock request and response
    const { req, res } = createMocks({
      method: "GET",
    });

    // Call the handler
    await handler(req, res);

    // Check the response status and data
    expect(res._getStatusCode()).toBe(200);
    
    // Parse the received data before comparing
    const receivedData = JSON.parse(res._getData());
    expect(receivedData).toEqual({ message: "Landing", events: mockEvents });
  });

  it("should return 401 if no events are found", async () => {
    // Mock getEvents to return an empty array
    getEvents.mockReturnValue([]);
  
    const { req, res } = createMocks({
      method: "GET",
    });
  
    await handler(req, res);
  
    expect(res._getStatusCode()).toBe(401);
    // Parse the response data to compare as an object
    expect(JSON.parse(res._getData())).toEqual({ error: "volunteers do not exist" });
  });
  
  it("should return 405 for methods other than GET", async () => {
    const { req, res } = createMocks({
      method: "POST", // Example of a different method
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({ error: "Method Not Allowed" });
  });
});
