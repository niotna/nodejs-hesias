import http from 'http';

const port = 5501;

const serv = http.createServer();
serv.listen(port);

serv.once('listening',()=>{
    console.log(`running  on http://127.0.0.1:${port}`);
})


serv.on('request',(req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world 2');
})

serv.on('error',(e)=>{
    console.log("error ",e)
})
