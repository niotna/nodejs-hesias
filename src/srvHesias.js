import http from 'http';

const port = 5500;
const host = "127.0.0.1";


const serv = http.createServer((request,result) => {
    console.log('hey')
    console.log(request.url);
});

serv.listen(port,host, ()=>{
    console.log(`running  on http://${host}:${port}`);
})