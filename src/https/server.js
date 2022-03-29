const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./certs/key.pem'),
    passphrase: "root",
    cert: fs.readFileSync('./certs/cert.pem')
};

https.createServer(options, (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(8889);
