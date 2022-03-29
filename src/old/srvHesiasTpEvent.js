const http = require('http');
const router = require('./router/router');

const port = 5600;

const serv = http.createServer();
serv.listen(port);

serv.once('listening',()=>{
    console.log(`running  on http://127.0.0.1:${port}`);
});

serv.on('request',(request,result)=>{
    const url = request.url.substring(1);
    const urlParams = url === "" ? ['index.html'] : url.split("/");
    router(urlParams,result);
});

serv.on('error',(e)=>{
    console.log("error ",e)
});
