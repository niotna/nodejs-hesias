const http = require('http');
const {readFile} = require('fs');

const port = 5501;

const serv = http.createServer();
serv.listen(port);

serv.once('listening',()=>{
    console.log(`running  on http://127.0.0.1:${port}`);
});

serv.on('request',(req,res)=>{
    readFile('../index.html',(err,data)=>{
        console.log(data);
        if (err) {
            console.log(err);
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(data);
        res.end;
    })
});

serv.on('error',(e)=>{
    console.log("error ",e)
});
