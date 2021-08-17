if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var bodyParser = require('body-parser'); //nuevo
var cors = require('cors'); //nuevo

require('dotenv').config();

var mongoose = require('mongoose');

// Mongoose conection2
mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('mymerndb connection succesful'))
  .catch((err) => console.error(err));

var app = express();

app.use('/posts', postsRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors()); //nuevo
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});

module.exports = app;
