let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let boolParser = require('express-query-boolean');
let logger = require('morgan');

let membersRouter = require('./routes/members');
let memberPaymentsRouter = require('./routes/memberPayments');
let eventsRouter = require('./routes/events');
let imagesRouter = require('./routes/images');
let groupsRouter = require('./routes/groups');
let pricingRouter = require('./routes/pricing');
let db = require('./db/common');

db.dbConnect();
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(boolParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/members', membersRouter);
app.use('/memberPayments', memberPaymentsRouter);
app.use('/events', eventsRouter);
app.use('/images', imagesRouter);
app.use('/groups', groupsRouter);
app.use('/pricing', pricingRouter);

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
