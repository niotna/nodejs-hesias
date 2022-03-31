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

const menu = [
    {"title": "Home", "path": "/#header", "under": []},
    {"title": "About", "path": "/#about", "under": []},
    {"title": "Services", "path": "/#services", "under": []},
    {"title": "Plan", "path": "/#plans", "under": []},
    {"title": "Drop", "path": false, "under": [
        {"title": "Article Details","path": "article"},
        {"title": "Terms Conditions","path": "terms"},
        {"title": "Privacy Policy","path": "privacy"},
    ]},
    {"title": "Contact", "path": "/#contact", "under": []}
];

const plans = [
    {"title":"BASIC BUNDLE","desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit.", "points": [
        {"content": "Lorem ipsum dolor sit amet"},
        {"content": "Consectetur adipisicing elit."},
        {"content": "Sed do eiusmod tempor"},
        {"content": "Ut enim ad minim veniam."},
    ], "price": "$24/Month", "link": "#your-link"},
    {"title":"BUSINESS BUNDLE","desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit.", "points": [
        {"content": "Lorem ipsum dolor sit amet"},
        {"content": "Consectetur adipisicing elit."},
        {"content": "Sed do eiusmod tempor"},
        {"content": "Ut enim ad minim veniam."},
    ], "price": "$99/Month", "link": "#your-link"},
    {"title":"PREMIUM BUNDLE","desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit.", "points": [
        {"content": "Lorem ipsum dolor sit amet"},
        {"content": "Consectetur adipisicing elit."},
        {"content": "Sed do eiusmod tempor"},
        {"content": "Ut enim ad minim veniam."},
    ], "price": "$199/Month", "link": "#your-link"}
];

app.get('/', (req, res) => {
    const title = "Home";
    res.render(__dirname+'/views/index.ejs', {  menu: menu, plans: plans, title: title });
});

app.get('/article', (req, res) => {
    const title = "Article";
    res.render(__dirname+'/views/article.ejs', {  menu: menu, plans: plans, title: title });
});

app.get('/terms', (req, res) => {
    const title = "Terms";
    res.render(__dirname+'/views/terms.ejs', {  menu: menu, plans: plans, title: title });
});

app.get('/privacy', (req, res) => {
    const title = "Privacy";
    res.render(__dirname+'/views/privacy.ejs', {  menu: menu, plans: plans, title: title });
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.use((req, res, next) =>{
    const title = "404";
    //throw new Error('Error!');
    res.render(__dirname+"/views/404.ejs", {  menu: menu, title: title });
});

app.use((err, req, res, next) =>{
    console.error(err.stack);
    const title = "500";
    res.render(__dirname+"/views/500.ejs", {  menu: menu, title: title });
});