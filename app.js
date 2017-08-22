var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var mongoose = require('mongoose');
var morgan = require('morgan');
var routes = require('./routes/index');
var curso = require('./app/models/curso');


mongoose.connect('mongodb://localhost:27017/PP2')

app.use(cors());
app.use(morgan('combined'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

var port = process.env.PORT || 8080;




app.route('/')
 .get(function(req, res){
   res.json({message: 'BIENVENIDO :D'});
 });



app.use('/api', routes);



app.listen(port);
  console.log('Magic happens on port '+ port);
