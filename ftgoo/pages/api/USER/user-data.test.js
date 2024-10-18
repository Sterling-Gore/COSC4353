import handler from './user-data'; // Update the path as per your folder structure
import { findUserByID, updateUser } from '../mockDatabase';

// Mock the imported functions from mockDatabase
jest.mock('../mockDatabase', () => ({
  findUserByID: jest.fn(),
  updateUser: jest.fn(),
}));

describe('handler function', () => {
  
  let req, res;

  beforeEach(() => {
    // Mock request and response objects
    req = {
      method: '',
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(), // Chainable status method
      json: jest.fn(),
    };
  });

  it('should return 200 and the user data when user exists (POST)', () => {
    // Mock the user found by findUserByID
    const mockUser = {
      userID: 1,
      firstName: 'Jo',
      lastName: 'Pa',
      email: 'testuser@example.com',
      password: 'password123',
      address1: '123 wonderland',
      address2: '',
      city: 'Houston',
      state: 'TX',
      zipCode: '12345',
      skills: ['Education', 'Environment'],
      availability: ['Tuesday', 'Wednesday'],
      preferences: 'i love',
      isLoggedIn: true,
      role: 'user',
    };
    
    findUserByID.mockReturnValue(mockUser);

    req.method = 'POST';
    req.body = { userID: 1 };

    handler(req, res);

    expect(findUserByID).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Landing',
      user: mockUser
    });
  });

  it('should return 401 if the user does not exist (POST)', () => {
    // Mock no user found
    findUserByID.mockReturnValue(null);

    req.method = 'POST';
    req.body = { userID: 999 };  // Non-existent user

    handler(req, res);

    expect(findUserByID).toHaveBeenCalledWith(999);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'User does not exist',
    });
  });

  it('should update user information and return 200 (PATCH)', () => {
    // Mock the user found by findUserByID
    const mockUser = {
      userID: 1,
      firstName: 'Jo',
      lastName: 'Pa',
      email: 'testuser@example.com',
      password: 'password123',
      address1: '123 wonderland',
      address2: '',
      city: 'Houston',
      state: 'TX',
      zipCode: '12345',
      skills: ['Education', 'Environment'],
      availability: ['Tuesday', 'Wednesday'],
      preferences: 'i love',
      isLoggedIn: true,
      role: 'user',
    };

    findUserByID.mockReturnValue(mockUser);

    req.method = 'PATCH';
    req.body = {
      userID: 1,
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
      address1: '456 new street',
      address2: '',
      city: 'New City',
      state: 'TX',
      zipCode: '67890',
      skills: ['Education', 'Health'],
      availability: ['Monday', 'Tuesday'],
      preferences: 'New preferences',
    };

    handler(req, res);

    expect(findUserByID).toHaveBeenCalledWith(1);
    expect(updateUser).toHaveBeenCalledWith({
      ...mockUser,
      ...req.body, // updated fields
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Landing',
      user: {
        ...mockUser,
        ...req.body, // updated fields
      },
    });
  });

  it('should return 401 if user does not exist (PATCH)', () => {
    // Mock no user found
    findUserByID.mockReturnValue(null);

    req.method = 'PATCH';
    req.body = {
      userID: 999,  // Non-existent user
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
    };

    handler(req, res);

    expect(findUserByID).toHaveBeenCalledWith(999);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'User does not exist',
    });
  });

  it('should return 405 if method is not POST or PATCH', () => {
    req.method = 'GET';  // Invalid method

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Method Not Allowed',
    });
  });

});