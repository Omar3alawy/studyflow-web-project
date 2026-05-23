const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StudyFlow backend is running.");
});

app.get("/api/tasks", (req, res) => {
  db.all("SELECT * FROM tasks ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to retrieve tasks."
      });
    }

    res.json(rows);
  });
});

app.post("/api/tasks", (req, res) => {
  const { title, subject, deadline, priority } = req.body;

  if (!title || !subject || !deadline || !priority) {
    return res.status(400).json({
      error: "All task fields are required."
    });
  }

  const sql = `
    INSERT INTO tasks (title, subject, deadline, priority)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [title, subject, deadline, priority], function (err) {
    if (err) {
      return res.status(500).json({
        error: "Failed to add task."
      });
    }

    res.status(201).json({
      id: this.lastID,
      title,
      subject,
      deadline,
      priority
    });
  });
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({
        error: "Failed to delete task."
      });
    }

    res.json({
      message: "Task deleted successfully."
    });
  });
});

app.post("/api/feedback", (req, res) => {
  const { name, email, message } = req.body;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "All feedback fields are required."
    });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      error: "Invalid email address."
    });
  }

  const sql = `
    INSERT INTO feedback (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [name, email, message], function (err) {
    if (err) {
      return res.status(500).json({
        error: "Failed to save feedback."
      });
    }

    res.status(201).json({
      id: this.lastID,
      name,
      email,
      message
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});