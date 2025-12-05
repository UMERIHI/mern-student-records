# Student Record Management System (Node.js + File System)

This is a CRUD application built using the MERN stack (minus MongoDB) to manage student records. Instead of a database, it uses a local **JSON file** to store data, making it lightweight and easy to run.

## Project Structure

This is the exact folder structure for your current project:

```text
StudentCrudApp/
├── README.md              <-- This file
├── backend/               <-- Folder for Node/Express API
│   ├── data/
│   │   └── students.json  <-- JSON file stores data (Created automatically)
│   ├── routes/
│   │   └── studentRoutes.js <-- API Routes (GET, POST, etc.)
│   └── server.js          <-- Main backend entry point (Port 5001)
│
└── frontend/              <-- Folder for React App
    ├── public/
    ├── src/
    │   └── App.js         <-- Main React file (Contains all components)
    └── package.json

Features
Create: Add new students with Name, Email, Age, and Course.

Read: View a list of all students from the JSON file.

Update: Edit existing student details.

Delete: Remove a student with confirmation.

Persistence: Data is saved to backend/data/students.json, so it survives server restarts.

Tech Stack
Frontend: React, Axios, Lucide-React (Icons), Tailwind CSS

Backend: Node.js, Express.js, File System (fs) module

Storage: Local JSON File

Installation & Setup
1. Backend Setup
Navigate to the backend folder:

cd backend
Install dependencies (No MongoDB needed):

npm install express cors
Start the server:

node server.js
Note: The server will run on http://localhost:5001 (Changed from 5000 to avoid macOS AirPlay conflict).

2. Frontend Setup
Open a new terminal and navigate to the frontend folder:

cd frontend
Install dependencies:

npm install axios lucide-react
Start the React app:

npm start
The app will open at http://localhost:3000.

API Endpoints
Method	Endpoint	Description
POST	/api/students	Create a new student (Appends to JSON)
GET	/api/students	Fetch all students (Reads JSON)
PUT	/api/students/:id	Update a student by ID
DELETE	/api/students/:id	Delete a student by ID