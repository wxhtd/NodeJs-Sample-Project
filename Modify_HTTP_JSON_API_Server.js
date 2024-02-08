const http = require("http");
const url = require("url");

function zeroFill(i){
    return (i<10 ? '0':'')+i;
};

function parseTime(dt){
    return { 
        "year":dt.getFullYear(),
        "month":zeroFill(dt.getMonth()+1),
        "date": zeroFill(dt.getDate()),
        "hour": zeroFill(dt.getHours()),
        "minute":zeroFill(dt.getMinutes())       
    };
};

var server = http.createServer((req,res) => {
    var parsedUrl = url.parse(req.url,true);
    var dt = parsedUrl.query.iso ? new Date(parsedUrl.query.iso) : new Date();
    var result = parseTime(dt);
    if (result){
        res.writeHead(200, {"Content-type":"application/json"});
        res.end(JSON.stringify(result));
    }else{
        res.writeHead(404);
        res.end();
    }
})

server.listen(Number(process.argv[2]));
