const http = require('http');


const app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    const url = req.url;

    if(url === '/') {
        res.write('<h1>Hello ClassConnect Test</h1>');
        res.end();
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})