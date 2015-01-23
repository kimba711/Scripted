var express = require('express');
var request = require('request');
var http    = require('http');
var path    = require('path');

var app = express();

var oauthUrl = 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13';
var clientId = "Q9VnbjHWpTkLIsKh";
var clientSecret = "6CAX6IJg2SHq+mLGqXZOXIXb6rASx/NlQd9A9Xi28r4=";

var translatorScope = "http://api.microsofttranslator.com";
var baseUrl = "http://api.microsofttranslator.com/v2/Ajax.svc"
var translateUrl = baseUrl + "/Translate"

app.use(express.static(path.join(__dirname, 'public')));

app.get('/token', function(req, res) {
    var formData = {
                    client_id: clientId, 
                    client_secret: clientSecret,
                    scope: translatorScope,
                    grant_type: "client_credentials"
                   };
    request.post(oauthUrl).form(formData).pipe(res);
});

app.get('/translate', function(req, res){
    request.get({
        url: translateUrl, 
        qs: req.query,
        headers: {
            Authorization: req.get("Authorization")
        }
    }).pipe(res);
})

var httpServer = http.createServer(app);
httpServer.listen(process.env.PORT, process.env.IP);