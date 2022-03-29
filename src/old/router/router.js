const fs = require('fs');

const static = ['js','css','assets','webfonts'];

module.exports = routeManage = async (urlParams,result)=>{
    const path = __dirname.replace("old/router","mirko");
    let filePath = "";
    urlParams.forEach(element => {
        filePath += "/"+element;
    });

    if (static.includes(urlParams[0].substring(1))){
        return;
    }
    
    result.setHeader("Content-Type", "text/html");

    exist(urlParams[0],path+filePath,result); 
}

const exist = async (filename,filePath,result) => {
    const fileExist = fs.existsSync(filePath);
    console.log(fileExist);
    if (!fileExist) {
        filePath.replace(filename,"404.html");
    }

    result.statusCode = fileExist ? 200 : 404;
    read(filePath,result)
}

const read = async (filePath,result)=>{
    fs.readFile(filePath, (err, html) => {
        if (err) {
            console.log(err);
            return;
        }     
        result.write(html.toString());
        result.end();
    });
}