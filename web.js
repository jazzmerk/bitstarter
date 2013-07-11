var express = require('express');

var app = express.createServer(express.logger());

fs = require ('fs');
var readfile = new Buffer(40);
var readfile = toString(fs.readFileSync('index.html'));
//var readstring = toString(readfile);
app.get('/', function(request, response) {
  response.send(readfile);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
console.log("listening on " + port);
});
