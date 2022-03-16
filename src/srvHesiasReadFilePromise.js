const http = require('http');
const path = require('path');
const {fileURLToPath} = require('url');
const {readFile, stat} = require('fs/promises');

const serv = http.createServer((request,result) => {
    result.statusCode = 200
    result.setHeader('Content-Type', 'text/plain')
    const url = request.url;
    const filePath = __dirname+url+".html";

    stat(filePath).then((stat)=>{
        console.log(stat);
        readFile(filePath).then((file)=>{
            console.log(file.toString())
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err);
    })
    
    
    result.write("hello world")
    result.end()
});

const port = 5503;
const host = "127.0.0.1";
serv.listen(port,host, ()=>{
    console.log(`running  on http://${host}:${port}`);
})