# StudyFlow - Web Engineering Project

StudyFlow is a responsive student task manager web application

## Application Description

StudyFlow helps students manage their academic tasks in one simple place. Users can add tasks, choose a subject, set a deadline, select a priority, delete tasks, and send feedback.

## Technologies Used

- React.js
- JavaScript
- HTML
- CSS
- Bootstrap
- Node.js
- Express.js
- SQLite

## Project Pages

- Home Page
- Tasks Page
- Contact / Feedback Page

## Main Features

- Responsive user interface
- Consistent navigation
- Add study tasks
- View saved tasks
- Delete tasks
- Submit feedback
- Frontend form validation
- Backend validation
- SQLite database integration

## Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | Checks that backend is running |
| GET | /api/tasks | Gets all tasks from database |
| POST | /api/tasks | Adds a new task |
| DELETE | /api/tasks/:id | Deletes a task |
| POST | /api/feedback | Saves feedback message |

## How to Run the Project

### Frontend

From the main project folder:

```bash
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### Backend

Open a second terminal:

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

## Database

The project uses SQLite. The database includes two main tables:

- tasks
- feedback

The database can be viewed using DB Browser for SQLite.

## Notes

- The frontend and backend must both be running at the same time.
- The frontend runs on port 5173.
- The backend runs on port 5000.
- The SQLite database file is created automatically inside the backend folder after running the backend.

## Made By

This project was completed  by Omar Alaa 221002802 A Bonus would be much appreciated :) 