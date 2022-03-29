const https = require('https');
const fs = require('fs');
const express = require('express');
const ejs = require('ejs');

const options = {
    key: fs.readFileSync('./certs/key.pem'),
    passphrase: "root",
    cert: fs.readFileSync('./certs/cert.pem')
};

const app = express();
app.set('view engine', 'ejs');
// app.use(express.static('src/mirko'));
app.use(express.static('src/https'));

https.createServer(options, app).listen(8080);

app.get('/', (req, res) => {
    const menu = [
        "Home",
        "About",
        "Services",
        "Plan"
    ];
    res.render(__dirname+'/views/index.ejs', {  menu: menu });
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.use((req, res, next) =>{
    //throw new Error('Error!');
    res.sendFile(__dirname+"/views/404.ejs");
});

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.sendFile("500.html", { root: "src/mirko" });
});