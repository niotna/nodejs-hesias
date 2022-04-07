const express = require('express');
const { Server } = require('ws');
const fs = require('fs');

const PORT = 8099;
const HOME = '/index.html';
const imagePath = __dirname+"/images";
const images = (() => {
    return fs.readdirSync(imagePath).map(file => imagePath+"/"+file)
})();
const timer = {"current":0, "max":(images.length)};

const server = express()
.use((req, res) => res.sendFile(HOME, { root: __dirname }))
.listen(PORT, () => console.log(`Listening on ${PORT}`));

const ws = new Server({ server });

ws.on('connection', (socket) => {
    socket.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
    ws.clients.forEach((client) => {
        if (timer.current == timer.max) {
            timer.current = 0;
        }
        console.log(timer.current , timer.max)
        let contents = fs.readFileSync(images[timer.current], {encoding: 'base64'});
        timer.current++;
        client.send(contents);
    });
}, 1000);