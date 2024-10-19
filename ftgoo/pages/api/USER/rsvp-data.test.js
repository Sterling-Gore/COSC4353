// Import necessary modules and mocks
import { addRSVP, deleteRSVP } from "../mockDatabase";
import handler from "./rsvp-data"; // Assuming the handler file is in the same directory

// Mock the addRSVP and deleteRSVP functions
jest.mock("../mockDatabase", () => ({
  addRSVP: jest.fn(),
  deleteRSVP: jest.fn(),
}));

describe("API Handler - RSVP Management", () => {
  let req, res;

  // Set up mock request and response objects
  beforeEach(() => {
    req = { body: {}, method: "" };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  describe("PATCH method - Add RSVP", () => {
    it("should return 201 and success message if RSVP is added", async () => {
      req.method = "PATCH";
      req.body = { userID: 1, eventID: 100 };

      // Mock addRSVP function (assuming it's synchronous)
      addRSVP.mockImplementation(() => {});

      // Call the handler
      await handler(req, res);

      // Assertions
      expect(addRSVP).toHaveBeenCalledWith(1, 100);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "RSVP added successfully!" });
    });

    it("should return 400 and error message if addRSVP throws an error", async () => {
      req.method = "PATCH";
      req.body = { userID: 1, eventID: 100 };

      // Mock addRSVP to throw an error
      addRSVP.mockImplementation(() => {
        throw new Error("RSVP failed");
      });

      // Call the handler
      await handler(req, res);

      // Assertions
      expect(addRSVP).toHaveBeenCalledWith(1, 100);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "RSVP failed" });
    });
  });

  describe("DELETE method - Remove RSVP", () => {
    it("should return 201 and success message if RSVP is removed", async () => {
      req.method = "DELETE";
      req.body = { userID: 1, eventID: 100 };

      // Mock deleteRSVP function
      deleteRSVP.mockImplementation(() => {});

      // Call the handler
      await handler(req, res);

      // Assertions
      expect(deleteRSVP).toHaveBeenCalledWith(1, 100);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "RSVP added successfully!" });
    });

    it("should return 400 and error message if deleteRSVP throws an error", async () => {
      req.method = "DELETE";
      req.body = { userID: 1, eventID: 100 };

      // Mock deleteRSVP to throw an error
      deleteRSVP.mockImplementation(() => {
        throw new Error("RSVP removal failed");
      });

      // Call the handler
      await handler(req, res);

      // Assertions
      expect(deleteRSVP).toHaveBeenCalledWith(1, 100);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "RSVP removal failed" });
    });
  });

  describe("Invalid method", () => {
    it("should return 405 if method is not PATCH or DELETE", async () => {
      req.method = "POST"; // Invalid method for this API

      // Call the handler
      await handler(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ error: "Method Not Allowed" });
    });
  });
});