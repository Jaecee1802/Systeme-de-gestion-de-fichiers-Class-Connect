const http = require('http');
const mysql = require('mysql2');


const app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    const url = req.url;

    if(url === '/') {
        res.write('<h1>Hello ClassConnect Test</h1>');
        res.end();
    }
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'jaecee1802',
    database: 'classconnectdb'
})

db.connect((err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log('MySQL is Connected...');
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})