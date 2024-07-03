const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

function onRequest(req, res) {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const postData = querystring.parse(body);
            const name = postData['name']; 
            const password = postData['password'];

            if (name === 'lipiga' && password === '1234') {
                // Serve the next HTML file upon successful login
                serveHTMLFile(res, 'preview.html');
            } else {
                // Serve the login page HTML file
                serveHTMLFile(res, 'login.html');
            }
        });
    } else {
        // Only respond with this message if it's not a POST request
        res.end('Only POST requests are supported');
    }
}

function serveHTMLFile(res, filename) {
    fs.readFile(path.join(__dirname, filename), (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Internal Server Error');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

http.createServer(onRequest).listen(2520);
console.log("Server is started...");
