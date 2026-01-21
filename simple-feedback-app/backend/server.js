const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Request logger (simple)
app.use((req, res, next) => {
  console.log(`[Backend] ${req.method} ${req.url}`);
  next();
});

// DB setup
const db = new sqlite3.Database("./feedback.db", () => {
  console.log("[Backend] Connected to SQLite database");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      message TEXT
    )
  `);
});

// CREATE
app.post("/api/feedback", (req, res) => {
  const { name, message } = req.body;
  console.log("[Backend] Creating feedback:", req.body);

  db.run(
    "INSERT INTO feedback (name, message) VALUES (?, ?)",
    [name, message],
    function (err) {
      if (err) {
        console.error("[Backend] DB insert failed", err);
        return res.status(500).json({ error: "DB insert failed" });
      }
      console.log("[Backend] Feedback inserted with ID:", this.lastID);
      res.json({ id: this.lastID });
    }
  );
});

// READ
app.get("/api/feedback", (req, res) => {
  console.log("[Backend] Reading all feedback");

  db.all("SELECT * FROM feedback ORDER BY id DESC", (err, rows) => {
    if (err) {
      console.error("[Backend] DB read failed", err);
      return res.status(500).json({ error: "DB read failed" });
    }
    res.json(rows);
  });
});

// DELETE
app.delete("/api/feedback/:id", (req, res) => {
  console.log("[Backend] Deleting feedback id:", req.params.id);

  db.run(
    "DELETE FROM feedback WHERE id = ?",
    req.params.id,
    function (err) {
      if (err) {
        console.error("[Backend] DB delete failed", err);
        return res.status(500).json({ error: "DB delete failed" });
      }
      console.log("[Backend] Rows deleted:", this.changes);
      res.json({ deleted: this.changes });
    }
  );
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`[Backend] Server running on http://localhost:${PORT}`);
});
