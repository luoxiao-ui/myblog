const bodyParser = require('body-parser');
const express = require('express');
const blogApi = require('./index.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', blogApi);

app.listen(3000, function() {
  console.log('listening port 3000!')
});

module.exports = app;
