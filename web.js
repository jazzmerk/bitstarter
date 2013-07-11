var express = require('express');

var app = express.createServer(express.logger());

var readstring = new Buffer(30);
readstring = fs.readFileSync('index.html');
readstring = buf.toString(readstring);
app.get('/', function(request, response) {
  response.send(readstring);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
