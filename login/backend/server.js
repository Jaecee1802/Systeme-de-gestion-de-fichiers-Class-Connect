const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const hash  = require("crypto");
const fs = require("fs");
const multer = require("multer");
const session = require("express-session");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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
        db.execute("SELECT * FROM teachers WHERE teacherEmail = ?", [email], (err, result) => {
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
    db.execute("SELECT * FROM students WHERE studentEmail = ? OR studentID = ?", [email, studentID], (err, result) => {
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

//Dashboard Route(Admin)
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/Dashboard.html"));
})

//Sign In Teachers
app.get("/teachersign", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/sign-in(teacher).html"));
})

app.post("/teacherSignedin", (req, res) => {
    const { email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    //Check if the user(teacher) exists
    const sql = "SELECT * FROM teachers WHERE teacherEmail = ?";
    db.execute(sql, [email], (err, results) => {
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
    db.execute(sql, [email], (err, results) => {
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


//Admin and Data Extractor(for admins)
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/sign-in(admin).html"));
})

app.post("/adminsignedin", (req, res) => {
    const { username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({ message: "Please fill all of the fields." });
    }

    const sql = "SELECT * FROM admin WHERE adminUsername = ?";
    db.execute(sql, [username], (err, results) => {
        if(err){
            console.error(err);
            return res.status(500).json({ message: "Error in the database"});
        }

        if(results.length === 0){
            return res.status(404).json({message:"User not found."});
        }

        const user = results[0];

        const passwordMatch = bcrypt.compareSync(password, user.adminPass);

        if(!passwordMatch){
            return res.status(401).json({ message: "Password is invalid or wrong!"});
        }
        res.status(200).json({ message: "You're signed in!"});
    })

})

app.get("/newadmin", (req , res) => {
    res.sendFile(path.join(__dirname, "../public/adminextractor.html"));
})

app.post("/insertadmin", (req, res) => {
    const { username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({ message: "Please fill all of the fields." });
    }

    const hashPass = bcrypt.hashSync(password, 10);
    const sql = "INSERT INTO admin (adminUsername, adminPass) VALUES (?, ?)";
    db.query(sql, [username, hashPass], (err, results) => {
        if(err){
            console.error(err);
            return res.status(500).json({ message: "Data Insert Failed."});
        }
        res.status(200).json({ message: "Data Inserted Successfully!"});
    })
})
//Admin and Data Extractor(for admins)

//Sign out(with Session)
app.post("/signout", (req, res) => {
        res.json({ message: "You're signed out!" });
});
//Sign out


//Load Folders//
app.get('/api/folders', async(req, res) => {
    db.query("SELECT * FROM folders", (err, result) => {
        if(err){
            return res.status(500).json({  error: err.message });
        }
        res.json(result);
    });
})
//Load Folders//

//Create Folder//
app.post('/api/createfolder', (req, res) => {
    const { folderName } = req.body;
    const folderPath = path.join(__dirname, `../public/uploads/${folderName}`);

    fs.mkdir(folderPath, { recursive: true }, (err) => {
        if(err){
            return res.json({ success: false, message: 'Folder creation failed' });
        }

        db.query("INSERT INTO folders (name) VALUES (?)", [folderName], (err, result) => {
            if(err){
                console.error(err);
                return res.json({ success: false, message: 'Database error.' });
            }
            return res.json({ success: true, message: 'Folder created.' });
        })
    })
})
//Create Folder//

//Delete Folder
app.post('/api/deletefolder', (req, res) => {
    const { folderName } = req.body;
    const folderPath = path.join(__dirname, `../public/uploads/${folderName}`);

    fs.rm(folderPath, { recursive: true}, (err) => {
        if(err){
            console.error(err);
            return res.json({ success: false, message: `Deleting ${folderName} failed.` });
        }

        db.query("DELETE FROM folders WHERE name = ?", [folderName], (err, result) => {
            if(err){
                console.error(err);
                return res.json({ success: false, message: 'Database error.' });
            }
            return res.json({ success: true, message: 'Folder deleted.' });
        })

        db.query("DELETE FROM files WHERE folder_name = ?", [folderName], (err, result) => {
            if(err){
                console.error(err);
                return res.json({ success: false, message: 'Database error.' });
            }
        })
    })
})
//Delete Folder

// Rename Folder
app.get('/api/folderslist', (req, res) =>{
    db.query('SELECT * FROM folders', (err, results) => {
        if(err){
            console.error(err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }
        res.json({ success: true, folders: results });
    })
})

app.post('/api/renamefolder', (req, res) => {
    const { selectedFolder, newFolderName } = req.body;

    const oldFolderPath = path.join(__dirname, `../public/uploads/${selectedFolder}`);
    const newFolderPath = path.join(__dirname, `../public/uploads/${newFolderName}`);

    fs.rename(oldFolderPath, newFolderPath, (err) => {
        if(err){
            console.error(`File system error: ${err}`);
            return res.json({ success: false, message: 'File system error.' });
        }

        db.query("UPDATE folders SET name = ? WHERE name = ?", [newFolderName, selectedFolder], (err, result) => {
            if(err){
                console.error(err);
                return res.json({ success: false, message: 'Database error.' });
            }

            return res.json({ success: true, message: 'Folder renamed.' });
        })

        db.query("UPDATE files SET folder_name = ? WHERE folder_name = ?", [newFolderName, selectedFolder], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ success: false, message: 'Database error updating files table.' });
            }
        })
    })
 })
// Rename Folder

//Access Folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.body.folder;
        const folderPath = path.join(__dirname, `../public/uploads/${folder}`);
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath, { recursive: true });
        }
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.get('/api/folder/:folderName/files', (req, res) => {
    const folderName = req.params.folderName;
    const folderPath = path.join(__dirname, `../public/uploads/${folderName}`);

    res.sendFile(path.join(__dirname, "../public/AccessFolder.html"));

    fs.readdir(folderPath, (err, files) => {
        if(err){
            return res.status(500).json({ error: err});
        }
        res.json(files);
    })
})
//Access Folder

//Upload Files
const uploadDir = path.join(__dirname, `../public/uploads`);
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    const { customName } = req.body;
    const folderName = req.query.folder;  

    if (!req.file || !customName || !folderName) {
        return res.status(400).json({ message: "Missing file or data" });
    }

    const folderPath = path.join(__dirname, `../public/uploads/${folderName}`);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const newFilePath = path.join(folderPath, req.file.filename);
    fs.rename(req.file.path, newFilePath, (err) => {
        if (err) {
            console.error("Error moving file:", err);
            return res.status(500).json({ message: "Error saving file" });
        }

        // Insert file details into MySQL
        const sql =
            "INSERT INTO files (custom_name, original_name, file_path, folder_name, upload_date) VALUES (?, ?, ?, ?, ?)";
        db.query(
            sql,
            [customName, req.file.originalname, path.join(folderName, req.file.filename), folderName, new Date()],
            (err) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Database error" });
                }
                res.json({ message: "File uploaded successfully", filePath: newFilePath });
            }
        );
    });
});

app.use("/uploads", express.static("uploads"));
//Upload Files

//Load Files
app.get("/files", (req, res) => {
    const folderName = req.query.folder;
    const sql = "SELECT * FROM files WHERE folder_name = ?";

    db.query(sql, [folderName], (err, results) => {
        if(err){
            console.error(`Database error: ${err}`);
            return res.status(500).json({message: "Database error"});
        }
        res.json(results);
    })
})
//Load Files


//Delete File
//Delete File

//Rename File
app.get("/api/fileslist", (req, res) => {
    const sql = "SELECT * FROM files";
    db.query(sql, (err, results) => {
        if(err){
            console.error(`Database error: ${err}`);
        }

        res.json({ success: true, files: results });
    })
})

app.post("/api/renamefile", (req, res) => {
    const { selectedFile, newFileName } = req.body;

    const sqlSelect = "SELECT folder_name, original_name FROM files WHERE custom_name = ?";
    db.query(sqlSelect, [selectedFile], (err, results) => {
        if (err) {
            console.error(`Database error: ${err}`);
            return res.json({ success: false, message: 'Database error while fetching folder name.' });
        }
        if (results.length === 0) {
            return res.json({ success: false, message: 'File not found.' });
        }
        
        const folderName = results[0].folder_name;
        const originalFileName = results[0].original_name; 
        const fileExtension = path.extname(originalFileName); // File extension
        const sanitizedNewFileName = newFileName.replace(/\s+/g, '_') + fileExtension; // Ensure new name has the file extension
    
        const oldFilePath = path.join(__dirname, `../public/uploads/${folderName}/${originalFileName}`);
        const newFilePath = path.join(__dirname, `../public/uploads/${folderName}/${sanitizedNewFileName}`);
    
        if (!fs.existsSync(oldFilePath)) {
            return res.json({ success: false, message: 'Original file does not exist.' });
        }
    
        fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
                console.error(`File system error: ${err}`);
                return res.json({ success: false, message: 'File rename failed.' });
            }
    
            const sqlUpdate = "UPDATE files SET custom_name = ?, original_name = ? WHERE custom_name = ?";
            db.query(sqlUpdate, [newFileName, sanitizedNewFileName, selectedFile], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.json({ success: false, message: 'Database error while renaming file.' });
                }
    
                return res.json({ success: true, message: 'File renamed successfully.' });
            });
        });
    });
});
//Rename File

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});