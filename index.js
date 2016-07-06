const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', (request, response) => {
    var acceptedLanguages = request.acceptsLanguages();
    var language_ = "not defined";
    if(acceptedLanguages.length > 0)
        language_ = acceptedLanguages[0];
    
    var osMatch = request.headers['user-agent'].match(/\((.+\))/);
    if(osMatch == null){
        osMatch = "not defined";
    }
    else{
        osMatch = osMatch[1];
    }
    
    var headers = {
        ipaddress: request.headers['x-forwarded-for'] || 
             request.connection.remoteAddress || 
             request.socket.remoteAddress ||
             request.connection.socket.remoteAddress,
        language: language_,
        software: osMatch 
    };
    
    response.send(JSON.stringify(headers, null, 2));
});

app.listen(app.get('port'));