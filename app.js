const express = require('express')
, path = require('path')
, favicon = require('serve-favicon')
, morgan = require('morgan')
, cookieParser = require('cookie-parser')
, bodyParser = require('body-parser')
, session = require('express-session')
, passport = require('passport')
, methodOverride = require('method-override')
, Usuario = require('./models/usuario')
, log4js = require('log4js')
, logger = log4js.getLogger()

, index = require('./routes/index')
, users = require('./routes/usuarios')
, login = require('./routes/login')
, logout = require('./routes/logout')
, kanban = require('./routes/kanban')
, projects = require('./routes/projects')
, statistics = require('./routes/statistics')
, tarjetas = require('./routes/tarjetas');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const auth = require('./routes/login');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret:'abcd12345',
  resave: false,
  saveUninitialized: false
}));
app.use('/auth', auth);
require('./auth')(passport);
app.use(passport.initialize());
app.use((req, res, next)=>{
  req.io = io;
  res.io = io;

  next();
});
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    var user = USERS[id];
    done(null, user);
});



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/kanban', kanban);
app.use('/projects', projects);
app.use('/statistics', statistics);
app.use('/tarjetas', tarjetas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  Usuario.findOne({_id: req.session.usuario}, (error, usuario) => {
    usuario = usuario || {};
    res.status(err.status || 500);
    res.render('error', { usuario });
  });
  // render the error page
});

module.exports = {app: app, server: server};
