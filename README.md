# Simple Feedback Application
## Frontend → Backend → Database (Industry Demo)

This project is a minimal end-to-end web application used for an Industry Interaction Program to demonstrate how real-world applications work in production.

The focus of this application is on:
- Application flow
- System thinking
- Failures and observability
- DevOps perspective

---

## Purpose of This Application

This application is not meant to be feature-rich.

It is designed to help students understand:
- How a frontend communicates with a backend
- How the backend interacts with a database
- How CRUD operations work
- How failures affect systems
- Why logging is critical in real systems

---

## Architecture Overview

Browser (Frontend)

↓ HTTP

Backend API (Node.js + Express)

↓ SQL

Database (SQLite)

The same architecture applies to:
- Small local applications
- Large-scale systems like Google, Amazon, etc.
Only scale and reliability mechanisms change.

---

## Project Structure
```
simple-feedback-app
├── backend
│   ├── server.js        (Backend API + DB logic)
│   └── feedback.db     (SQLite database file)
│
└── frontend
    ├── server.js       (Frontend server, run via npm)
    ├── package.json
    ├── index.html      (UI)
    ├── app.js          (Frontend logic + logs)
    └── style.css       (Basic styling)
```
---

## Technology Stack

Frontend:
- HTML
- CSS
- JavaScript
- Express (static file server)

Backend:
- Node.js
- Express
- SQLite
- CORS middleware

Concepts Demonstrated:
- REST APIs
- CRUD operations
- Logging
- Health checks
- Same-Origin Policy (CORS)

---

## How to Run the Application

Step 1: Start the Backend

```sh
cd backend
npm install
node server.js
```

Backend runs at:
http://localhost:3000

---

Step 2: Start the Frontend

```sh
cd frontend
npm install
npm start
```

Frontend runs at:
http://localhost:8080

---

## CRUD Operations Supported

Create Feedback
- POST /api/feedback

Read Feedback
- GET /api/feedback

Delete Feedback
- DELETE /api/feedback/:id

Health Check
- GET /health

---

## Demo Flow (Recommended)

1. Start backend and frontend
2. Open browser developer console (frontend logs)
3. Submit feedback
4. Observe browser console logs and backend terminal logs
5. Stop backend
6. Try submitting feedback again and observe failure

This demonstrates a real production outage scenario.

---

## Logging Strategy

Frontend Logs:
- Visible in browser console
- Show user actions and API calls

Backend Logs:
- Printed in terminal
- Show incoming requests, database operations, and errors

Logs are essential for understanding and debugging real systems.

---

## Security Notes

- Frontend never talks directly to the database
- Backend controls all database access
- CORS is explicitly configured
- Browser enforces Same-Origin Policy

---

## Educational Notes

- This repository is reference material
- Students are not expected to memorize the code
- Focus should be on understanding system behavior
- Frameworks and tools may change, architecture remains the same

---

## Key Takeaways

- Same application architecture works at all scales
- Frontend is stateless
- Backend is the control layer
- Database is stateful and fragile
- Systems fail — DevOps exists to manage failures

---

## Disclaimer

This project is created purely for educational and demonstration purposes as part of an Industry Interaction Program.
