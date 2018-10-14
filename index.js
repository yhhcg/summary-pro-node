var express = require('express');
var app = express();

var logger = function(req, res, next) {
  console.log('LOGGER');
  next();
}

app.use(logger);

app.post('/login', function (req, res) {
  console.log('POST');
  console.log(req.body);
  res.send('success');
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
