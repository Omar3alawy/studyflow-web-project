const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./studyflow.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    deadline TEXT NOT NULL,
    priority TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL
  )
`);

module.exports = db;