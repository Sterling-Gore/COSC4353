import handler from "./login"; // Adjust path if necessary
import { findUserByEmail } from "../mockDatabase";

// Mock the findUserByEmail function from the mock database
jest.mock("../mockDatabase", () => ({
  findUserByEmail: jest.fn(),
}));

describe("Login Handler", () => {
  let req, res;

  beforeEach(() => {
    req = { method: "POST", body: {} };
    res = {
      status: jest.fn(() => res), // Allow method chaining
      json: jest.fn(),
    };
  });

  it("should return 200 with user data on successful login", () => {
    const mockUser = {
      email: "user@example.com",
      password: "password123",
      userID: 1,
      role: "user",
      firstName: "Alice",
      lastName: "Smith",
    };
    req.body = { email: "user@example.com", password: "password123" };

    findUserByEmail.mockReturnValue(mockUser);

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful",
      user: {
        userID: mockUser.userID,
        role: mockUser.role,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
      },
    });
  });

  it("should return 401 if the user does not exist", () => {
    req.body = { email: "nonexistent@example.com", password: "password123" };

    findUserByEmail.mockReturnValue(undefined);

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "User does not exist" });
  });

  it("should return 401 for invalid password", () => {
    const mockUser = {
      email: "user@example.com",
      password: "password123",
    };
    req.body = { email: "user@example.com", password: "wrongpassword" };

    findUserByEmail.mockReturnValue(mockUser);

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid email or password",
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
