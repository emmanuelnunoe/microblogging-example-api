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
mongoose.set('useCreateIndex', true);

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('mymerndb connection successful'))
  .catch((err) => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
//app.use(express.json());    //borrado
//app.use(express.urlencoded({ extended: false }));  //borrado
app.use(cors()); //nuevo
app.use(bodyParser.json({ limit: '50mb' })); //nuevo
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); //nuevo

app.use(cookieParser());
app.use(
  express.static(
    path.join(__dirname, 'cliente/microblogging-example-react/build')
  )
);

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
  //res.render('error');
  res.json({ message: err.message, error: err }); //nuevo
});

module.exports = app;
