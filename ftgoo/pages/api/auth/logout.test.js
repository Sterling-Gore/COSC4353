import handler from "./logout"; // Adjust path if needed
import { findUserByEmail } from "../mockDatabase";

// Mock the findUserByEmail function from the mock database
jest.mock("../mockDatabase", () => ({
  findUserByEmail: jest.fn(),
}));

describe("Logout Handler", () => {
  let req, res;

  beforeEach(() => {
    req = { method: "POST", body: {} };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  it("should return 200 on successful logout", () => {
    const mockUser = {
      email: "user@example.com",
      isLoggedIn: true,
    };
    req.body = { email: "user@example.com" };

    findUserByEmail.mockReturnValue(mockUser);

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Logout successful" });
    expect(mockUser.isLoggedIn).toBe(false); // Ensure the user is logged out
  });

  it("should return 400 if user is not logged in or does not exist", () => {
    req.body = { email: "nonexistent@example.com" };

    findUserByEmail.mockReturnValue(undefined);

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "User not logged in or does not exist",
    });
  });

  it("should return 405 for unsupported HTTP methods", () => {
    req.method = "GET"; // Change method to GET

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      error: "Method Not Allowed",
    });
  });
});
