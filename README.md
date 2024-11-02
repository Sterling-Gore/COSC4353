## **Clone the Repository**

```
bash
git clone "https://github.com/Sterling-Gore/COSC4353.git"
```

## **Install Dependencies**

```bash
# Inside the project directory in VSCode:
npm install
cd ftgoo
npm install
```

## **Run the Website**

```bash
# Use the following commands in Git Bash:
yarn dev
# Or alternatively:
npm run dev
```

---

## **USER GUIDE**

### **Registering an Account**

- Input the proper information to create an account.
- Your data will be saved securely.

### **Login**

- Enter the email and password for an account that has been previously created.

### **User Profile Management**

- View and edit your profile information under the **Account** tab.
- Save any changes you make.

### **Events**

- View the events you have RSVP'd for under **My Events**.
- Browse all available events by selecting **All Events**.
- Review event details (qualifications, location, time) and RSVP if interested.
- Once RSVP'd, the event will appear under **My Events**.
- Use the **Check Event** button to review the event requirements or un-RSVP if needed.

### **Notifications**

- View all notifications you receive.
- **Types of Notifications:**
  - **Reminder**: Sent when an event you RSVP’d for is happening within a day.
  - **New Event**: Sent when a new event matching your criteria is created.
  - **Updated Event**: Sent when an event you RSVP'd for has been updated.

### **Logout**

- Click the **Logout** button to log out and return to the login screen.

---

## **ADMIN GUIDE**

### **Admin Login**

- Use the following credentials for testing:
  - **Email**: `admin@example.com`
  - **Password**: `password123`

### **Admin Profile Management**

- View your profile information under the **Account** tab.

### **Event Management**

- **Create Events**: Click **Create Event** and fill in the form.
  - Click **Create Event** to save, or **Cancel** to discard the event.
- **Edit Events**: Use the **Edit** button to modify an event’s details.
  - Click **Save Changes** to update, or **Cancel** to discard changes.
  - Users who RSVP'd will receive a notification about any updates.

### **Volunteer History**

- View volunteers and their event attendance history.
- If a volunteer has no past events, no events will be listed under their name.
