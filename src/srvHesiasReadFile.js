const http = require('http');
const path = require('path');
const {fileURLToPath} = require('url');
const { existsSync, readFile, readFileSync, stat, statSync } = require('fs');


const serv = http.createServer((request,result) => {
    result.statusCode = 200
    result.setHeader('Content-Type', 'text/plain')
    const url = request.url;
    const uri = url;
    
    const exist = existsSync(__dirname+uri+".html");
    if (exist){
        const file = readFile(__dirname+uri+".html",(err,file)=>{
            if (err) {
                console.log(err);
                return;
            };
            console.log(file.toString('utf-8'))
        })
        result.write("hello world")
        
    }

    result.end()
});

const port = 5502;
const host = "127.0.0.1";
serv.listen(port,host, ()=>{
    console.log(`running  on http://${host}:${port}`);
})