var express = require('express');

var app = express.createServer(express.logger());

fs = require ('fs');
var readfile = new Buffer(30);
var teststring = "teststring";
var readfile = fs.readFileSync('index.html');
var readstring = toString(readfile);
app.get('/', function(request, response) {
  response.send(teststring);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
console.log("listening on " + port);
});
