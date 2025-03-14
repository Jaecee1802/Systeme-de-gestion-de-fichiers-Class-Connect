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
app.set("views", path.join(__dirname, "views"));

app.set('view engine', 'ejs');

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

//Teachers Sign-up
app.get("/teachers", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/sign-up(teacher).html"));
})

app.post("/signup", (req, res) => {
    const { name, email, password, department } = req.body;

    if (!name || !email || !password || !department) {
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    try {
        // Check if the user's email already exists in the database
        db.query("SELECT * FROM teachers WHERE teacherEmail = ?", [email], (err, result) => {
            if (err) {
                console.log(`Error: ${err}`);
                return res.status(500).json({ message: "Database error" });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: "User already exists." });
            }

            const hashedPassword = bcrypt.hashSync(password, 10);

            // Insert new user/teacher if the data doesn't exist
            const sql = "INSERT INTO teachers (teacherName, teacherEmail, teacherPassword, department) VALUES (?, ?, ?, ?)";
            db.query(sql, [name, email, hashedPassword, department], (err, result) => {
                if (err) {
                    console.log(`Error: ${err}`);
                    return res.status(500).json({ message: "Database error" });
                }
                res.status(201).json({ message: "Successfully signed up!" });
            });
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({ message: "Database error" });
    }
});
//Teachers Sign-up

//Students Sign-up
app.get("/students", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/sign-up.html"));
})

app.post("/studentsignup", (req, res) =>{
    const { name, email, studentID, password, course, section } = req.body;

    if (!name || !email || !studentID || !password || !course || !section) {
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    //Checking if the user is already existing in the database
    db.query("SELECT * FROM students WHERE studentEmail = ? OR studentID = ?", [email, studentID], (err, result) => {
        if (err) {
            console.error(`Database error: ${err}`);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: "User already exists." });
        }

        // If the user didn't exist in the database this will run
        const hashedPass = bcrypt.hashSync(password, 10);
        const sql = "INSERT INTO students (studentName, studentEmail, studentID, studentPassword, course, section) VALUES (?, ?, ?, ?, ?, ?)";

        db.query(sql, [name, email, studentID, hashedPass, course, section], (err, result) => {
            if (err) {
                console.error(`Database error: ${err}`);
                return res.status(500).json({ message: "Database error" });
            }
            res.status(201).json({ message: "Successfully signed up!" });
        });
    });
})

//Students Sign-up

//Sign In Teachers
app.get("/teachersign", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/sign-in(teacher).html"));
})

app.get("/dashboard", (req, res) => {
    return res.render("Dashboard");
})

app.post("/teacherSignedin", (req, res) => {
    const { email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    //Check if the user(teacher) exists
    const sql = "SELECT * FROM teachers WHERE teacherEmail = ?";
    db.query(sql, [email], (err, results) => {
        if(err){
            console.error(err);
            return res.status(500).json({ message: "Error in the Database"});
        }

        if(results.length === 0){
            return res.status(404).json({message:"User not found."});
        }

        const user = results[0];

        const passwordMatch = bcrypt.compareSync(password, user.teacherPassword);

        if(!passwordMatch){
            return res.status(401).json({ message: "Password is invalid or wrong!"});
        }
        res.status(200).json({ message: "You're signed in!"});
    })
})

//Sign in teachers

//Sign in Students
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/sign-in.html"))
})

app.get("/subject", (req, res) => {
    return res.render("Subjects");
})

app.post("/studentSignin", (req, res) => {
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    const sql = "SELECT * FROM students WHERE studentEmail = ?";
    db.query(sql, [email], (err, results) => {
        if(err){
            console.error(err);
            return res.status(500).json({ message: "Error in the Database"});
        }

        if(results.length === 0){
            return res.status(404).json({message:"User not found."});
        }

        const user = results[0];

        const passwordMatch = bcrypt.compareSync(password, user.studentPassword);

        if(!passwordMatch){
            return res.status(401).json({ message: "Password is invalid or wrong!"});
        }

        res.status(200).json({ message: "You're signed in!"});
    })
})
//Sign in Students


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});