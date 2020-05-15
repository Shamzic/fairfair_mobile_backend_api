//  app.use(express.static(path.join(__dirname, 'public'))); 

var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser');
var artisansRoute = require('./routes/artisans');
const positionsRoute = require('./routes/positions');
const dashboardRoute = require('./routes/dashboard');
const notificationsRoute = require('./routes/notifications');
// require('./expoServices')();

require('dotenv').config({ path: './.env' });

const dbPort = 64500;

var app = express();

app.locals.moment = require('moment');
app.use(bodyParser.json());
app.use('/artisans', artisansRoute);
app.use('/positions', positionsRoute);
app.use('/dashboard', dashboardRoute);
app.use('/notifications', notificationsRoute);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);

// ROUTES
app.get('/', (req, res) => {
  res.send("Welcome to the Fairfair mobile API");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// Connect to DB
console.log("DB preparation...");
// 

  if(process.env.HOME =="/home/ec2-user") {
    console.log("Node server running on EC2 instance..")
    mongoose.connect("mongodb://my_user:my_pwd@localhost:27017/test",  { useNewUrlParser: true, useUnifiedTopology: true } , function(err, res) {
      if (err) {
        throw err;
      }
      console.log("connected to DB !")
    })
  } else  {
    console.log("Node server running on test mode..")
    mongoose.connect("mongodb://localhost:"+dbPort+"/test",  { useNewUrlParser: true, useUnifiedTopology: true } , function(err, result) {
      if (err) {
        throw err;
      }
      console.log("connected to DB !")
    })
  }

module.exports = app;
