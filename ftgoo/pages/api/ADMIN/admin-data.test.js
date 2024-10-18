import handler from "./admin-data";
import { findUserByID } from "../mockDatabase";

jest.mock("../mockDatabase", () => ({
  findUserByID: jest.fn(),
}));

describe("Admin Data Handler", () => {
  let req, res;

  beforeEach(() => {
    req = { method: "POST", body: {} };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  it("should return 200 with user data when the user exists", () => {
    const mockUser = { userID: 1, name: "Alice" };
    req.body.userID = 1;

    findUserByID.mockReturnValue(mockUser);

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Landing",
      user: mockUser,
    });
  });
});
