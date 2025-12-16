const express = require('express');
const cors = require('cors');
const db = require('./database');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API: Get All Cases
app.get('/api/cases', (req, res) => {
    const sql = "SELECT * FROM cases";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

// API: Create New Case
app.post('/api/cases', (req, res) => {
    const { court_name, case_number, title, stage } = req.body;
    const sql = `INSERT INTO cases (case_id, court_name, case_number_original, title, current_stage) VALUES (?,?,?,?,?)`;
    const id = uuidv4();
    db.run(sql, [id, court_name, case_number, title, stage], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id, ...req.body }
        })
    });
});

// API: Get Clients
app.get('/api/clients', (req, res) => {
    const sql = "SELECT * FROM clients";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
