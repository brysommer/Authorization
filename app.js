const createError = require('http-errors');
const express = require('express');
const MongoStore = require('connect-mongo');
const path = require('path');
const db = require('./db');
const escapeHtml = require('escape-html');
const session = require('express-session')
const logger = require('morgan');


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
app.use('/css/bootstrap.css.map', express.static('node_modules/bootstrap/dist/css/bootstrap.css.map'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/autorization',
    ttl: 3600,
    autoRemove: 'interval',
    autoRemoveInterval: 1 // In minutes. Default 10
  })
}))

// middleware to test if authenticated
const isAuthenticated = async (req, res, next) => {
  if (req.session.user) {
    next()
  } 
  else next('route')
}

app.get('/', isAuthenticated,  (req, res) => {
  console.log(req.sessionID)
  console.log(req.session);
  console.log('Checking autherf ' + req.session.user)
  // this is only called when there is an authentication user due to isAuthenticated
  res.send('hello, ' + escapeHtml(req.session.user) + '!' +
    ' <a href="/users/logout">Logout</a>')
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
