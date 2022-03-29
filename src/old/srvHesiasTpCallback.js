const http = require('http');

const serv = http.createServer((request,result) => {
    const url = request.url.substring(1);
    const urlParams = url.split("/");

    switch (urlParams[0]){
        case "name":
            result.setHeader('Content-Type', 'text/plain');
            if (urlParams.length > 1){
                result.write(`bonjour, ${urlParams[1]}`)
            }else {
                result.write("Je n’ai pas votre nom")
            }
            break;
        case "info":
            result.setHeader('Content-Type', 'application/json');
            result.write(JSON.stringify({'content':'content'}))
            break;
        default:
            result.setHeader('Content-Type', 'text/plain');
            result.write("hello world")
            break;  
    }

    res.statusCode = 200;
    result.end()
});

const port = 5500;
const host = "127.0.0.1";
serv.listen(port,host, ()=>{
    console.log(`running  on http://${host}:${port}`);
})