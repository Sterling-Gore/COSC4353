


export let personObject = {
    firstName: "John",
    lastName: "Doe",
    password: "password",
    email: "johnDoe@gmail.com",
    Address1: "1874 Test Glade Lane",
    Address2: "---",
    city: "Houston",
    State: "TX",
    zipCode: 12345,
    skills: ["Health", "Education"],
    availability: ["Monday", "Wednesday"],
    preference: "I love to teach health education!"
};



//personObject["firstName"] = "Sterling"
//or
//personObject.firstName = "sterling"

/**
 * So when you update the data like above on the server side
 * you're going to simply just do console.log(personObject)
 * so you can see if the changes actually were pushed from
 * the frontend to the backend
 */




/**
 * This is an interface, because all we're doing is notifying
 * the user that we're going to be setting this type to this
 * specific object. It allows you to typecase a lot of things
 * including functions
 */

