const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const uuid = require('uuid');

const port = 8069;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const HOME = '/index.html';
let users = [];
app.use((req, res) => res.sendFile(HOME, { root: __dirname }))


wss.on('connection', function connection(ws){
  const id = uuid.v4();
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(client)
        client.send(data);
       
      }
    })
  })
})

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})
