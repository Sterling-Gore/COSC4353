import handler from "./registration"; // Adjust path if necessary
import { getUsers, addUser, findUserByEmail } from "../mockDatabase";

// Mock the database functions
jest.mock("../mockDatabase", () => ({
  getUsers: jest.fn(),
  addUser: jest.fn(),
  findUserByEmail: jest.fn(),
}));

describe("Registration Handler", () => {
  let req, res;

  beforeEach(() => {
    jest.resetAllMocks(); // Reset mocks to avoid interference between tests
    req = { method: "POST", body: {} };
    res = {
      status: jest.fn(() => res), // Allow method chaining
      json: jest.fn(),
    };
  });

  it("should return 201 on successful registration", () => {
    req.body = {
      firstName: "John",
      lastName: "Doe",
      email: "newuser@example.com",
      password: "password123",
      address1: "123 Main St",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      skills: ["JavaScript"],
      preferences: ["Remote"],
      availability: ["Weekdays"],
    };

    findUserByEmail.mockReturnValue(undefined); // No existing user
    getUsers.mockReturnValue([]); // Simulate no existing users

    handler(req, res);

    expect(addUser).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "newuser@example.com",
        role: "user",
        isLoggedIn: true, // Updated to match the handler logic
      })
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Registration successful",
      user: expect.objectContaining({
        email: "newuser@example.com",
        isLoggedIn: true,
      }),
    });
  });

  it("should return 400 if user already exists", () => {
    req.body = { email: "existing@example.com" };
    findUserByEmail.mockReturnValue({ email: "existing@example.com" });

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "User with this email already exists. Please use a different email.",
    });
  });

  it("should return 400 if required fields are missing", () => {
    req.body = { email: "newuser@example.com", password: "password123" }; // Missing fields

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
  });

  it("should return 400 if password is too short", () => {
    req.body = {
      firstName: "John",
      lastName: "Doe",
      email: "newuser@example.com",
      password: "123", // Too short
      address1: "123 Main St",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      skills: ["JavaScript"],
      preferences: ["Remote"],
      availability: ["Weekdays"],
    };

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Password must be at least 6 characters",
    });
  });

  it("should return 405 for unsupported HTTP methods", () => {
    req.method = "GET"; // Change method to GET

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method Not Allowed" });
  });
});
