const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const dbPath = path.resolve(__dirname, 'advocate.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // 1. USERS & ROLES
    db.run(`CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

    // 2. CHAMBERS
    db.run(`CREATE TABLE IF NOT EXISTS chambers (
    chamber_id TEXT PRIMARY KEY,
    chamber_name TEXT NOT NULL,
    head_advocate_id TEXT,
    FOREIGN KEY(head_advocate_id) REFERENCES users(user_id)
  )`);

    // 3. CLIENTS
    db.run(`CREATE TABLE IF NOT EXISTS clients (
    client_id TEXT PRIMARY KEY,
    chamber_id TEXT,
    full_name TEXT NOT NULL,
    client_type TEXT,
    retainer_status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(chamber_id) REFERENCES chambers(chamber_id)
  )`);

    // 4. CASES
    db.run(`CREATE TABLE IF NOT EXISTS cases (
    case_id TEXT PRIMARY KEY,
    chamber_id TEXT,
    client_id TEXT,
    court_name TEXT NOT NULL,
    case_number_original TEXT NOT NULL,
    title TEXT,
    judge_name TEXT,
    current_stage TEXT,
    filing_date DATE,
    status TEXT DEFAULT 'Active',
    FOREIGN KEY(chamber_id) REFERENCES chambers(chamber_id),
    FOREIGN KEY(client_id) REFERENCES clients(client_id)
  )`);

    // Seed Data if empty
    db.get("SELECT count(*) as count FROM users", [], (err, row) => {
        if (row.count === 0) {
            console.log("Seeding Database...");
            const userId = uuidv4();
            const chamberId = uuidv4();

            // Create Senior Advocate
            db.run(`INSERT INTO users (user_id, full_name, role, email, password_hash) VALUES (?, ?, ?, ?, ?)`,
                [userId, 'Senior Advocate', 'Senior Advocate', 'senior@law.com', 'hashed_pw']);

            // Create Chamber
            db.run(`INSERT INTO chambers (chamber_id, chamber_name, head_advocate_id) VALUES (?, ?, ?)`,
                [chamberId, 'Chambers of Law', userId]);

            // Create Clients
            const clientId1 = uuidv4();
            db.run(`INSERT INTO clients (client_id, chamber_id, full_name, client_type, retainer_status) VALUES (?, ?, ?, ?, ?)`,
                [clientId1, chamberId, 'TechCorp India', 'Corporate', 'Active']);

            // Create Cases
            db.run(`INSERT INTO cases (case_id, chamber_id, client_id, court_name, case_number_original, title, current_stage, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [uuidv4(), chamberId, clientId1, 'High Court of Delhi', 'WP(C) 1234/2024', 'TechCorp vs. State', 'Arguments', 'Active']);
        }
    });
});

module.exports = db;
