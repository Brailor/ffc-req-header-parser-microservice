const express = require("express");
const useragent = require("express-useragent");
const app = express();

app.use(useragent.express());

app.get('/', (req, res) => {
    var os = { 
        first : req.useragent.source.indexOf('(', 0) + 1,
        second : req.useragent.source.indexOf(')', 0) 
        };
    var software = req.useragent.source.slice(os.first, os.second);
    var language = req.headers['accept-language'].split(';')[0].split(',')[0];
    var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;
        
    res.json({
        ipaddress : ip,
        language : language,
        software : software
    });
   
});

app.listen( process.env.PORT || 8080, () =>{
    console.log("Server is active!");
})