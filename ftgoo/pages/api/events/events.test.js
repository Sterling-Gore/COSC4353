import { findEventByID, getEvents, addEvent, volunteerMatchOnEventCreation } from "../mockDatabase";
import handler from "./events";

// Mock the imported functions
jest.mock("../mockDatabase", () => ({
  getEvents: jest.fn(),
  addEvent: jest.fn(),
  findEventByID: jest.fn(),
  volunteerMatchOnEventCreation: jest.fn(),
}));

describe("API Handler", () => {
  let req, res;

  beforeEach(() => {
    req = {
      method: "POST",
      body: {
        eventName: "New Event",
        urgency: "High",
        address: "123 Main St",
        city: "Cityville",
        state: "State",
        zipCode: "12345",
        description: "Event Description",
        skills: ["Skill1", "Skill2"],
        eventDate: "2024-10-18",
        selectedDay: "Friday",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("should return 201 and create a new event when POST method is used with valid data", () => {
    getEvents.mockReturnValue([{ eventID: 1 }]); // Simulating existing events
    findEventByID.mockReturnValue(null); // Simulating no existing event with the same name

    handler(req, res);

    expect(findEventByID).toHaveBeenCalledWith("New Event");
    expect(addEvent).toHaveBeenCalled();
    expect(volunteerMatchOnEventCreation).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Event Created",
      event: expect.objectContaining({
        eventID: 2,
        eventName: "New Event",
        urgency: "High",
        address: "123 Main St",
        city: "Cityville",
        state: "State",
        zipCode: "12345",
        description: "Event Description",
        skills: ["Skill1", "Skill2"],
        eventDate: "2024-10-18",
        day: "Friday",
        isCreated: true,
      }),
    });
  });

  it("should return 400 when POST method is used but event already exists", () => {
    findEventByID.mockReturnValue({ eventName: "New Event" }); // Simulate event already existing

    handler(req, res);

    expect(findEventByID).toHaveBeenCalledWith("New Event");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "This event already exists. Please create a new event.",
    });
  });

  it("should return 400 when POST method is used with missing fields", () => {
    req.body = { eventName: "Incomplete Event" }; // Missing required fields

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "All fields are required",
    });
  });

  it("should return 405 when a method other than POST is used", () => {
    req.method = "GET"; // Unsupported method

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      error: "Method Not Allowed",
    });
  });
});