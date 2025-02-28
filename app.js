const http = require('http');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

dotenv.config({
    path: './.env'
});

const app = express();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const pubDirectory = path.join(__dirname, '../signindesign');
const imgDirectory = path.join(__dirname, '../images');
app.use(express.static(pubDirectory));
app.use(express.static(imgDirectory));
app.set('view engine', 'hbs');

db.connect((err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log('MySQL is Connected...');
    }
})

app.get("/", (req, res) => {
    res.render("../views/sign-up");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})