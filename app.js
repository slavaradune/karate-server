let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let membersRouter = require('./routes/members');
let memberProfileRouter = require('./routes/memberProfile');
let memberPaymentsRouter = require('./routes/memberPayments');
let eventsRouter = require('./routes/events');
let eventInfoRouter = require('./routes/eventInfo');
let db = require('./db/db');

db.dbConnect();
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/members', membersRouter);
app.use('/memberProfile', memberProfileRouter);
app.use('/memberPayments', memberPaymentsRouter);
app.use('/events', eventsRouter);
app.use('/event', eventInfoRouter);

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
