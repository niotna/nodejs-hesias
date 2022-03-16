const http = require('http');

const port = 5500;
const host = "127.0.0.1";


const serv = http.createServer((request,result) => {
    result.statusCode = 200
    result.setHeader('Content-Type', 'text/plain')
    result.end("hello world")
});

serv.listen(port,host, ()=>{
    console.log(`running  on http://${host}:${port}`);
})