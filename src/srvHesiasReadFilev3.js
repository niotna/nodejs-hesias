const http = require('http');
const path = require('path');
const {fileURLToPath} = require('url');
const {readFile, stat} = require('fs/promises');

const serv = http.createServer((request,result) => {
    result.statusCode = 200
    result.setHeader('Content-Type', 'text/plain')
    const url = request.url;
    const filePath = __dirname+url+".html";
    if (url === "favicon.ico" || url === "/favicon.ico"){
        return;
    }

    read(filePath);
    
    result.write("hello world")
    result.end()
});

const read = async (file) => {
    try {
        const data = await readFile(file)
        console.log(data.toString('utf-8'))
    } catch (error) {
        console.log(error)
    }
}

const port = 5504;
const host = "127.0.0.1";
serv.listen(port,host, ()=>{
    console.log(`running  on http://${host}:${port}`);
})