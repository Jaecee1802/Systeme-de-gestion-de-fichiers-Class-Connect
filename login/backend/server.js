const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const hash  = require("crypto");
const fs = require("fs");
const multer = require("multer");
const archiver = require('archiver');
const zip = require('express-zip');
const session = require("express-session");

const app = express();
dotenv.config();

app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 } //3600000 = 1 hour
}))


app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
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
        console.log("Database Connected!");
    }
});

const noCache = (req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
}
//Teachers Sign-up
app.get("/teachers", noCache, (req, res) => {
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
                req.session.teacher = {
                    id: result.insertId,
                    name,
                    email,
                    department
                };
                res.status(201).json({ message: "Successfully signed up!", name });
            });
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({ message: "Database error", name: user.teacherName });
    }
});
//Teachers Sign-up

//Students Sign-up
app.get("/students", noCache, (req, res) => {
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
            req.session.student = {
                id: result.insertId,
                name,
                email,
                studentID,
                course,
                section
            };
            res.status(201).json({ message: "Successfully signed up!", name });
        });
    });
})

//Students Sign-up

//Dashboard Route
app.get("/dashboard", noCache,(req, res) => {
    if (req.session.teacher) {
        res.sendFile(path.join(__dirname, "../public/Dashboard.html"));
    }
    else if(req.session.student){
        res.sendFile(path.join(__dirname, "../public/Dashboard.html"));
    }
    else if(req.session.admin){
        res.sendFile(path.join(__dirname, "../public/Dashboard.html"));
    }
     else {
        res.redirect("/");
    }
})


//Subject Route
app.get("/subjectRoute", noCache, (req, res) => {
    if(req.session.admin){
        res.sendFile(path.join(__dirname, "../public/Subjects.html"));
    }
    else if(req.session.teacher){
        res.sendFile(path.join(__dirname, "../public/Subjects.html"));
    }
    else if(req.session.student){
        res.sendFile(path.join(__dirname, "../public/Subjects.html"));
    }
    else{
        res.redirect("/");
    }
})

//My Files Route
app.get("/myfilesRoute", noCache, (req, res) => {
    if(req.session.admin){
        res.sendFile(path.join(__dirname, "../public/My Files.html"));
    }
    else if(req.session.teacher){
        res.sendFile(path.join(__dirname, "../public/My Files.html"));
    }
    else if(req.session.student){
        res.sendFile(path.join(__dirname, "../public/My Files.html"));
    }
    else{
        res.redirect("/");
    }
})

//Grades Route
app.get("/gradesRoute", noCache, (req, res) => {
    if(req.session.admin){
        res.sendFile(path.join(__dirname, "../public/Grades.html"));
    }
    else if(req.session.teacher){
        res.sendFile(path.join(__dirname, "../public/Grades.html"));
    }
    else if(req.session.student){
        res.sendFile(path.join(__dirname, "../public/Grades.html"));
    }
    else{
        res.redirect("/");
    }
})

//Settings Route
app.get("/settingsRoute", noCache, (req, res) => {
    if(req.session.admin){
        res.sendFile(path.join(__dirname, "../public/Settings.html"));
    }
    else if(req.session.teacher){
        res.sendFile(path.join(__dirname, "../public/Settings.html"));
    }
    else if(req.session.student){
        res.sendFile(path.join(__dirname, "../public/Settings.html"));
    }
    else{
        res.redirect("/");
    }
})

//Sign In Teachers
app.get("/teachersign", noCache,  (req, res) => {
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

        if(passwordMatch){
            req.session.teacher = {
                id: user.teacherID,
                name: user.teacherName,
                email: user.teacherEmail,
                department: user.department
            };
            res.status(200).json({ message: "You're signed in!", name: user.teacherName });
        }
    })
})

//Sign in teachers

//Sign in Students
app.get("/", noCache, (req, res) => {
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

        if(passwordMatch){
            req.session.student = {
                id: user.studID,
                name: user.studentName,
                email: user.studentEmail,
                course: user.course,
                section: user.section
            }
        }

        res.status(200).json({ message: "You're signed in!", name: user.studentName });

    })
})
//Sign in Students


//Admin and Data Extractor(for admins)
app.get("/admin", noCache, (req, res) => {
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

        if(passwordMatch){
            req.session.admin = {
                id: user.adminID,
                username: user.adminUsername
            }
        }
        res.status(200).json({ message: "You're signed in!", admin: user.adminUsername });
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
       req.session.destroy((err) => {
           if(err){
               console.error(err);
               return res.status(500).json({ message: "Error signing out."});
           }
           res.clearCookie("connect.sid");
           res.status(200).json({ message: "You're signed out!"});
       })
});
//Sign out

//////////////////////////////
////// MY FILES SECTION //////
//////////////////////////////

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

//Load Folders at the Dashboard//
app.get('/api/recent-folders', async (req, res) => {
    db.query("SELECT * FROM folders ORDER BY dateofCreation DESC LIMIT 5", (err, result) => {
        if(err){
            return res.status(500).json({  error: err.message });
        }
        res.json(result);
    })
})
//Load Folders at the Dashboard//

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

//Search Folder
app.get('/api/search-folders', (req, res) => {
    const { query } = req.query;

    // Escape user input to prevent SQL injection
    const searchQuery = `%${query}%`;

    db.query("SELECT * FROM folders WHERE name LIKE ?", [searchQuery], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});
//Search Folder

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

//Download All Folders
app.get('/listFolders', (req, res) => {
    const sql = "SELECT * FROM files";
    db.query(sql, (err, results) => {
        if(err){
            console.error(`Database error: ${err}`);
        }

        res.json({ success: true, files: results });
    })
});


//Download All Folders
app.get('/downloadFolder', (req, res) => {
    const folderName = req.query.folderName;
    if (!folderName) return res.status(400).send('Folder name is required.');

    const archiveName = `${folderName}.zip`;
    const archivePath = path.join(__dirname, archiveName);

    const output = fs.createWriteStream(archivePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        res.download(archivePath, archiveName, (err) => {
            if (err) {
                console.error('Download error:', err);
                res.sendStatus(500);
            }
            fs.unlinkSync(archivePath); // cleanup
        });
    });

    archive.on('error', (err) => {
        console.error('Archiving error:', err);
        res.sendStatus(500);
    });

    archive.pipe(output);

    const query = 'SELECT file_path, custom_name, original_name FROM files WHERE folder_name = ?';

    db.query(query, [folderName], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.sendStatus(500);
            return;
        }

        if (results.length === 0) {
            res.status(404).send('No files found for this folder.');
            return;
        }

        results.forEach(file => {
            const fullPath = path.join(__dirname, '../public', file.file_path);
            if (fs.existsSync(fullPath)) {
                const ext = path.extname(file.original_name);
                const customFileName = `${file.custom_name}${ext}`;
                archive.file(fullPath, { name: `${folderName}/${customFileName}` });
            }
        });

        archive.finalize();
    });
});

///////////////////////////////////////////////////
//FILES SECTION////////////////////////////////////
///////////////////////////////////////////////////

//Upload Files
const uploadDir = path.join(__dirname, `../public/uploads`);
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../public/uploads/");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    console.log("File upload started...");

    const { customName } = req.body;
    const folderName = req.query.folder;  

    console.log("Received File:", req.file);
    console.log("Custom Name:", customName);
    console.log("Folder Name:", folderName);

    if (!req.file || !customName || !folderName) {
        console.log("Error: Missing file or data");
        return res.status(400).json({ message: "Missing file or data" });
    }

    const folderPath = path.join(__dirname, `../public/uploads/${folderName}`);
    if (!fs.existsSync(folderPath)) {
        console.log("Creating folder:", folderPath);
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const newFilePath = path.join(folderPath, req.file.filename);
    console.log("New File Path:", newFilePath);

    fs.rename(req.file.path, newFilePath, (err) => {
        if (err) {
            console.error("Error moving file:", err);
            return res.status(500).json({ message: "Error saving file" });
        }

        console.log("File moved successfully.");

        const filePath = `uploads/${folderName}/${req.file.filename}`;
        const sql =
            "INSERT INTO files (custom_name, original_name, file_path, folder_name, upload_date) VALUES (?, ?, ?, ?, ?)";

        db.query(
            sql,
            [customName, req.file.originalname, filePath, folderName, new Date()],
            (err) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Database error" });
                }
                console.log("Database insert successful.");
                res.json({ message: "File uploaded successfully", filePath });
            }
        );
    });
});


app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
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
app.post("/api/deletefile", (req, res) => {
    const { fileName } = req.body;

    if (!fileName) {
        return res.json({ success: false, message: "Please provide a file name to delete." });
    }

    const sqlSelect = "SELECT folder_name, original_name FROM files WHERE custom_name = ?";
    db.query(sqlSelect, [fileName], (err, results) => {
        if (err) {
            console.error(`Database error: ${err}`);
            return res.json({ success: false, message: "Database error while fetching file details." });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "File not found." });
        }

        const folderName = results[0].folder_name;
        const originalFileName = results[0].original_name; // Full file name
        const filePath = path.join(__dirname, `../public/uploads/${folderName}/${originalFileName}`);

        // Check if file exists before attempting to delete
        if (!fs.existsSync(filePath)) {
            return res.json({ success: false, message: "File does not exist on server." });
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`File system error: ${err}`);
                return res.json({ success: false, message: "Error deleting file from server." });
            }

            // Remove file entry from the database
            const sqlDelete = "DELETE FROM files WHERE custom_name = ?";
            db.query(sqlDelete, [fileName], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.json({ success: false, message: "Database error while deleting file." });
                }

                return res.json({ success: true, message: "File deleted successfully." });
            });
        });
    });
});
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

//////////////////////////////
////// MY FILES SECTION //////
//////////////////////////////




////////////////////////////////////////
////// Enrolled Subjects Section //////
///////////////////////////////////////


//Create a Subject Folder
app.post("/api/createsubjectfolder", (req, res) => {
    const { subjectFolderName } = req.body;
    const folderPath = path.join(__dirname, `../public/uploads/${subjectFolderName}`);

    fs.mkdir(folderPath, { recursive: true }, (err) => {
        if(err){
            return res.json({ success: false, message: 'Folder creation failed' });
        }

        db.query("INSERT INTO subjectfolders (subjectname) VALUES (?)", [subjectFolderName], (err, result) => {
            if(err){
                console.error(err);
                return res.json({ success: false, message: 'Database error.' });
            }
            return res.json({ success: true, message: 'Folder created.' });
        })
    })
})

//Load Subject Folders
app.get("/api/subjectfolders", async (req, res) => {
    db.query("SELECT * FROM subjectfolders", (err, result) => {
        if(err){
            return res.status(500).json({  error: err.message });
        }
        res.json(result);
    });
})

//Delete Subject Folder
app.post('/api/deletesubjectfolder', (req, res) => {
    const { subjectFolderName } = req.body;
    const folderPath = path.join(__dirname, `../public/uploads/${subjectFolderName}`);

    fs.rm(folderPath, { recursive: true}, (err) => {
        if(err){
            console.error(err);
            return res.json({ success: false, message: `Deleting ${subjectFolderName} failed.` });
        }

        db.query("DELETE FROM subjectfolders WHERE subjectname = ?", [subjectFolderName], (err, result) => {
            if(err){
                console.error(err);
                return res.json({ success: false, message: 'Database error.' });
            }
            return res.json({ success: true, message: 'Folder deleted.' });
        })

        db.query("DELETE FROM subjectfiles WHERE folder_name = ?", [subjectFolderName], (err, result) => {
            if(err){
                console.error(err);
                return res.json({ success: false, message: 'Database error.' });
            }
        })
    })
})

//Rename Subject Folder
app.get('/api/subjectslist', (req, res) => {
    db.query('SELECT * FROM subjectfolders', (err, results) => {
        if(err){
            console.error(err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }
        res.json({ success: true, folders: results });
    })
})

app.post('/api/renamesubjectfolder', (req, res) => {
    const { selectedSubject, newSubjectName } = req.body;
    const oldSubjectPath = path.join(__dirname, `../public/uploads/${selectedSubject}`);
    const newSubjectPath = path.join(__dirname, `../public/uploads/${newSubjectName}`);

    fs.rename(oldSubjectPath, newSubjectPath, (err) => {
        if(err){
            console.error(err);
            return res.json({ success: false, message: 'Renaming Subject Folder Failed.' });
        }
        db.query("UPDATE subjectfolders SET subjectname = ? WHERE subjectname = ?", [newSubjectName, selectedSubject], (err, result) => {
            if(err){
                console.error(err);
                return res.json({ success: false, message: 'Database error.' });
            }
            return res.json({ success: true, message: 'Subject Folder Renamed.' });
        })
        db.query("UPDATE subjectfiles SET folder_name = ? WHERE folder_name = ?", [newSubjectName, selectedSubject], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ success: false, message: 'Database error updating files table.' });
            }
        })
    })
})

//Access Subject Folder
const subjectStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const subjectFolderName  = req.body.folder;
        const folderPath = path.join(__dirname, `../public/uploads/${subjectFolderName}`);
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath, { recursive: true });
        }
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.get('/api/folder/:subjectFolderName/files', (req, res) => {
    const subjectFolderName = req.params.subjectFolderName;
    const folderPath = path.join(__dirname, `../public/uploads/${subjectFolderName}`);

    res.sendFile(path.join(__dirname, "../public/AccessSubjFolder.html"));

    fs.readdir(folderPath, (err, files) => {
        if(err){
            return res.status(500).json({ error: err});
        }
        res.json(files);
    })
})

//Download All Folders


//Upload Subject File
const uploadSubDir = path.join(__dirname, `../public/uploads`);
if(!fs.existsSync(uploadSubDir)) {
    fs.mkdirSync(uploadSubDir, { recursive: true });
}

const subjectStor = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../public/uploads/");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const subUpload = multer({ storage: subjectStor });

app.post("/subjupload", subUpload.single("file"), (req, res) => {
    console.log("File upload started...");

    const { customName } = req.body;
    const subjectFolderName = req.query.folder;  

    console.log("Received File:", req.file);
    console.log("Custom Name:", customName);
    console.log("Folder Name:", subjectFolderName);

    if (!req.file || !customName || !subjectFolderName) {
        console.log("Error: Missing file or data");
        return res.status(400).json({ message: "Missing file or data" });
    }

    const folderPath = path.join(__dirname, `../public/uploads/${subjectFolderName}`);
    if (!fs.existsSync(folderPath)) {
        console.log("Creating folder:", folderPath);
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const newFilePath = path.join(folderPath, req.file.filename);
    console.log("New File Path:", newFilePath);

    fs.rename(req.file.path, newFilePath, (err) => {
        if (err) {
            console.error("Error moving file:", err);
            return res.status(500).json({ message: "Error saving file" });
        }

        console.log("File moved successfully.");

        const filePath = `uploads/${subjectFolderName}/${req.file.filename}`;
        const sql =
            "INSERT INTO subjectfiles (custom_name, original_name, file_path, folder_name, upload_date) VALUES (?, ?, ?, ?, ?)";

        db.query(
            sql,
            [customName, req.file.originalname, filePath, subjectFolderName, new Date()],
            (err) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Database error" });
                }
                console.log("Database insert successful.");
                res.json({ message: "File uploaded successfully", filePath });
            }
        );
    });
});


app.use("/subjuploads", express.static(path.join(__dirname, "../public/uploads")));

//Display the File in Subject Folder
app.get("/subjfiles", (req, res) => {
    const folderName = req.query.folder;
    const sql = "SELECT * FROM subjectfiles WHERE folder_name = ?";

    db.query(sql, [folderName], (err, results) => {
        if(err){
            console.error(`Database error: ${err}`);
            return res.status(500).json({message: "Database error"});
        }
        res.json(results);
    })
})

//Delete Subject File
app.post("/api/deletesubjfile", (req, res) => {
    const { fileName } = req.body;

    if (!fileName) {
        return res.json({ success: false, message: "Please provide a file name to delete." });
    }

    const sqlSelect = "SELECT folder_name, file_path FROM subjectfiles WHERE custom_name = ?";
    db.query(sqlSelect, [fileName], (err, results) => {
        if (err) {
            console.error(`Database error: ${err}`);
            return res.json({ success: false, message: "Database error while fetching file details." });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "File not found." });
        }

        const subjectFolderName = results[0].folder_name;
        const originalFileName = results[0].original_name; // Full file name
        const filePath = path.join(__dirname, "../public", results[0].file_path);

        // Check if file exists before attempting to delete
        if (!fs.existsSync(filePath)) {
            return res.json({ success: false, message: "File does not exist on server." });
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`File system error: ${err}`);
                return res.json({ success: false, message: "Error deleting file from server." });
            }

            // Remove file entry from the database
            const sqlDelete = "DELETE FROM subjectfiles WHERE custom_name = ?";
            db.query(sqlDelete, [fileName], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.json({ success: false, message: "Database error while deleting file." });
                }

                return res.json({ success: true, message: "File deleted successfully." });
            });
        });
    });
});

//Rename Subject File
app.get("/api/subjfileslist", (req, res) => {
    const sql = "SELECT * FROM subjectfiles";
    db.query(sql, (err, results) => {
        if(err){
            console.error(`Database error: ${err}`);
        }

        res.json({ success: true, files: results });
    })
})

app.post("/api/renamesubjfile", (req, res) => {
    const { selectedSubFile, newFileName } = req.body;

    if (!selectedSubFile || !newFileName) {
        return res.json({ success: false, message: 'Invalid input.' });
    }

    const sqlUpdate = "UPDATE subjectfiles SET custom_name = ? WHERE custom_name = ?";
    db.query(sqlUpdate, [newFileName, selectedSubFile], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: 'Database error while renaming file.' });
        }

        if (result.affectedRows === 0) {
            return res.json({ success: false, message: 'File not found.' });
        }

        return res.json({ success: true, message: 'File renamed successfully.' });
    });
});

//Load Subject Folders in Dashboard
app.get('/api/recent-subject-folders', async (req, res) => {
    db.query("SELECT * FROM subjectfolders ORDER BY folderCreation DESC LIMIT 4", (err, result) => {
        if(err){
            return res.status(500).json({  error: err.message });
        }
        res.json(result);
    })
})

////////////////////////////////////////
////// Enrolled Subjects Section //////
///////////////////////////////////////
app.listen(PORT, () => {
    console.log("Server is running on port 3100");
});