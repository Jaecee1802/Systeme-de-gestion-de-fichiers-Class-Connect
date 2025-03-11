const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const hash  = require("crypto");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "jaecee1802",
    database: "classconnectaccounts"
})

db.connect(err => {
    if(err) {
        console.log(`Database connection error: ${err}`);
    }
    else{
        console.log("Database connected");
    }
});

app.get("/teachers", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/sign-up(teacher).html"));
})

app.post("/signup", (req, res) => {
    const { name, email, password, department } = req.body;

    if(!name || !email || !password || !department){
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    try{
        const hashedPassword = bcrypt.hashSync(password, 10);

        const sql = "INSERT INTO teachers (teacherName, teacherEmail, teacherPassword, department) VALUES (?, ?, ?, ?)";
        db.query(sql, [name, email, hashedPassword, department], (err, result) => {
            if(err){
                console.log(`Error: ${err}`);
                return res.status(500).json({ message: "Database error" });
            }
            else{
                res.status(201).json({ message: "Successfully signed up!" });
            }
        })
    }
    catch (err){
        console.log(`Error: ${err}`);
        return res.status(500).json({ message: "Database error" });
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});