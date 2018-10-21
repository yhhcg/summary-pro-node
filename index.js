var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var logger = function(req, res, next) {
  console.log('LOGGER');
  next();
}

app.use(logger);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());
// Parse text/plain
app.use(bodyParser.text());

app.use(function(req, res, next) {
  // Allow code from any origin to access a resource
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post('/login', function (req, res) {
  console.log('POST');
  console.log(req.body);
  console.log(req.query);
  res.status(200).json({
    errorCode: '0',
    errMessage: 'ok',
  });
});
99
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
