const https = require('https');
const fs = require('fs');
const express = require('express');

const options = {
    key: fs.readFileSync('./certs/key.pem'),
    passphrase: "root",
    cert: fs.readFileSync('./certs/cert.pem')
};

const app = express();
app.use(express.static('src/mirko'));

https.createServer(options, app).listen(8080);

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.use(function(req, res, next) {
    res.sendFile("404.html", { root: "src/mirko" });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});