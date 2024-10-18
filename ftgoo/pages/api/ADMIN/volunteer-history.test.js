import handler from './volunteer-history'; // Update the path as per your folder structure
import { getUsers, getEvents } from '../mockDatabase'; 

// Mock the imported functions from mockDatabase
jest.mock('../mockDatabase', () => ({
  getUsers: jest.fn(),
  getEvents: jest.fn(),
}));

describe('handler function', () => {

  let req, res;

  beforeEach(() => {
    // Mock request and response objects
    req = {
      method: 'GET',
    };
    res = {
      status: jest.fn().mockReturnThis(),  // Chainable status method
      json: jest.fn(),
    };
  });

  it('should return 200 with volunteers and events when GET request is made', () => {
    // Mock getUsers and getEvents to return appropriate data
    getUsers.mockReturnValue([
      {
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
        preferences: 'i love',
        availability: ['Tuesday', 'Wednesday'],
        isLoggedIn: false,
        role: 'user',
        rsvpEvents: [],
        oldEvents: [4],
        notifications: []
      },
      {
        userID: 2,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'admin123',
        address1: '456 admin street',
        address2: '',
        city: 'Dallas',
        state: 'TX',
        zipCode: '54321',
        skills: ['Management'],
        preferences: 'I manage',
        availability: ['Monday'],
        isLoggedIn: true,
        role: 'admin',
        rsvpEvents: [6],
        oldEvents: [4],
        notifications: []
      }
    ]);

    getEvents.mockReturnValue([
      {
        eventID: 6,
        eventName: "Hello this is a test",
        urgency: "High",
        address: "This is a test",
        city: "sadfasdf",
        state: "KY",
        zipCode: "123123",
        skills: ["Education", "Health"],
        description: "sdfasdf",
        eventDate: "2024-10-19",
        day: "Saturday"
      },
      {
        eventID: 7,
        eventName: "gfgfgfg",
        urgency: "High",
        address: "fgfg",
        city: "asdfsdf",
        state: "KY",
        zipCode: "1212",
        skills: ["Arts"],
        description: "sdfsdf",
        eventDate: "2024-10-23",
        day: "Wednesday"
      }
    ]);

    handler(req, res);

    expect(getUsers).toHaveBeenCalled();
    expect(getEvents).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Landing",
      volunteers: [
        {
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
          preferences: 'i love',
          availability: ['Tuesday', 'Wednesday'],
          isLoggedIn: false,
          role: 'user',
          rsvpEvents: [],
          oldEvents: [4],
          notifications: []
        }
      ],
      events: [
        {
          eventID: 6,
          eventName: "Hello this is a test",
          urgency: "High",
          address: "This is a test",
          city: "sadfasdf",
          state: "KY",
          zipCode: "123123",
          skills: ["Education", "Health"],
          description: "sdfasdf",
          eventDate: "2024-10-19",
          day: "Saturday"
        },
        {
          eventID: 7,
          eventName: "gfgfgfg",
          urgency: "High",
          address: "fgfg",
          city: "asdfsdf",
          state: "KY",
          zipCode: "1212",
          skills: ["Arts"],
          description: "sdfsdf",
          eventDate: "2024-10-23",
          day: "Wednesday"
        }
      ]
    });
  });

  /*
  it('should return 401 when there are no volunteers', () => {
    // Mock getUsers and getEvents to return no users with 'user' role
    getUsers.mockReturnValue([
      {
        userID: 2,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'admin123',
        address1: '456 admin street',
        address2: '',
        city: 'Dallas',
        state: 'TX',
        zipCode: '54321',
        skills: ['Management'],
        preferences: 'I manage',
        availability: ['Monday'],
        isLoggedIn: true,
        role: 'admin',
        rsvpEvents: [6],
        oldEvents: [4],
        notifications: []
      }
    ]);
    

    getEvents.mockReturnValue([
      {
        eventID: 6,
        eventName: "Hello this is a test",
        urgency: "High",
        address: "This is a test",
        city: "sadfasdf",
        state: "KY",
        zipCode: "123123",
        skills: ["Education", "Health"],
        description: "sdfasdf",
        eventDate: "2024-10-19",
        day: "Saturday"
      }
    ]);

    handler(req, res);

    expect(getUsers).toHaveBeenCalled();
    expect(getEvents).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "volunteers do not exist",
    });
  });
  */

  it('should return 405 when the method is not GET', () => {
    // Modify the request method to POST (invalid)
    req.method = 'POST';

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      error: "Method Not Allowed",
    });
  });
});