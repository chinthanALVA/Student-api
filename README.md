Student Management REST API
📌 Overview

This project is a RESTful API built to manage student records for a college system. It supports creating, retrieving, updating, and deleting student data using standard HTTP methods.

The API is developed using the built-in Node.js HTTP module without using frameworks like Express.js, demonstrating low-level backend concepts.

🎯 Features

Create a new student

Get all students

Get a single student by ID

Update student details

Delete a student

Input validation

Proper error handling

JSON-based responses

⚙️ Tech Stack

Node.js

HTTP module

Postman (for testing)

🚀 How to Run
1. Clone the Repository
git clone <your-repo-link>
cd student-api
2. Run the Server
node server.js

Server runs at:

http://localhost:3000
📡 API Endpoints
🔹 Create Student

POST /students

Request Body:

{
 "name": "Ash",
 "email": "ash@test.com",
 "course": "CS",
 "year": 2
}
🔹 Get All Students

GET /students

🔹 Get Single Student

GET /students/:id

Example:

/students/1
🔹 Update Student

PUT /students/:id

Request Body:

{
 "year": 3
}
🔹 Delete Student

DELETE /students/:id

📊 Student Data Model
{
 "id": 1,
 "name": "string",
 "email": "string",
 "course": "string",
 "year": 1-4
}
✅ Validation Rules

All fields are required

Email must be in valid format

Year must be between 1 and 4

ID is generated automatically

⚠️ Error Handling
Invalid Route
{
 "success": false,
 "message": "Route not found"
}
Student Not Found
{
 "success": false,
 "message": "Student not found"
}
Validation Error
{
 "success": false,
 "message": "Error message"
}
🧪 Testing

All endpoints were tested using Postman.

Include screenshots of:

POST request

GET request

PUT request

DELETE request
