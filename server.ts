import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("appointments.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    service TEXT NOT NULL,
    price INTEGER DEFAULT 0,
    status TEXT DEFAULT 'confirmed',
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Migration: Add price column if it doesn't exist (for existing databases)
try {
  db.prepare("SELECT price FROM appointments LIMIT 1").get();
} catch (e) {
  db.exec("ALTER TABLE appointments ADD COLUMN price INTEGER DEFAULT 0");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // User Registration / Login (Simplified)
  app.post("/api/users", (req, res) => {
    const { name, email, phone } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)");
      const info = stmt.run(name, email, phone);
      res.status(201).json({ id: info.lastInsertRowid, name, email, phone });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        // User might already exist, try to fetch
        const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
        res.json(user);
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

  // Get User Appointments
  app.get("/api/appointments/:userId", (req, res) => {
    const { userId } = req.params;
    const appointments = db.prepare("SELECT * FROM appointments WHERE user_id = ? ORDER BY date, time").all(userId);
    res.json(appointments);
  });

  // Schedule Appointment
  app.post("/api/appointments", (req, res) => {
    const { user_id, date, time, service, price } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO appointments (user_id, date, time, service, price) VALUES (?, ?, ?, ?, ?)");
      const info = stmt.run(user_id, date, time, service, price || 0);
      res.status(201).json({ id: info.lastInsertRowid, user_id, date, time, service, price });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Admin: Get All Users
  app.get("/api/admin/users", (req, res) => {
    const users = db.prepare("SELECT * FROM users").all();
    res.json(users);
  });

  // Admin: Get All Appointments with User Details
  app.get("/api/admin/appointments", (req, res) => {
    const appointments = db.prepare(`
      SELECT a.*, u.name as user_name, u.email as user_email 
      FROM appointments a 
      JOIN users u ON a.user_id = u.id 
      ORDER BY a.date DESC, a.time DESC
    `).all();
    res.json(appointments);
  });

  // Admin: Get Revenue Stats
  app.get("/api/admin/stats", (req, res) => {
    const stats = db.prepare(`
      SELECT 
        SUM(price) as total_revenue,
        COUNT(*) as total_bookings,
        COUNT(DISTINCT user_id) as total_customers
      FROM appointments
    `).get();
    res.json(stats);
  });

  // Delete Appointment
  app.delete("/api/appointments/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM appointments WHERE id = ?").run(id);
    res.status(204).send();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
