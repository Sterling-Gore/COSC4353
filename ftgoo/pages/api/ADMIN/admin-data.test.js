import handler from "./admin-data"; // Adjust path if necessary
import { findUserByID } from "../mockDatabase";

// Mock the `findUserByID` function from the mock database
jest.mock("../mockDatabase", () => ({
  findUserByID: jest.fn(),
}));

describe("Admin Data Handler", () => {
  let req, res;

  beforeEach(() => {
    jest.resetAllMocks(); // Reset mocks to avoid interference
    req = { method: "POST", body: {} };
    res = {
      status: jest.fn(() => res), // Enable method chaining
      json: jest.fn(),
    };
  });

  it("should return 200 with user data if the user exists", () => {
    const mockUser = { userID: 1, name: "Admin User" };
    req.body.userID = 1;

    findUserByID.mockReturnValue(mockUser); // Mock valid user

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Landing",
      user: mockUser,
    });
  });

  it("should return 401 if the user does not exist", () => {
    req.body.userID = 2;

    findUserByID.mockReturnValue(undefined); // Mock no user found

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "User does not exist" });
  });

  it("should return 401 if userID is not provided", () => {
    req.body = {}; // No userID in the request body

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "User does not exist" });
  });

  it("should return 401 if findUserByID returns null", () => {
    req.body.userID = 99; // An ID not in the database
    findUserByID.mockReturnValue(null); // Simulate no user found

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "User does not exist" });
  });

  it("should return 405 for unsupported HTTP methods", () => {
    req.method = "GET"; // Non-POST method

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method Not Allowed" });
  });
});
