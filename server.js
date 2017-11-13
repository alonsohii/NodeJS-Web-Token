var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config'), // get our config file
    path = require("path"),
    AutCtrl = require('./app/controllers/aut'),
    UsuariosCtrl = require('./app/controllers/users'),
    PaisesCtrl = require('./app/controllers/catpaises'),
    ProyectCtrl = require('./app/controllers/projectCtr'),
    Middleware = require('./app/middleware'),
    Helper = require('./app/helpers/general'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    config = require('./oauth.js'),
    Strategy = require('passport-facebook').Strategy,
    cookie = require('cookie'),
    socketIOHelper = require('./app/helpers/socketio');
// TwitterStrategy = require('passport-twitter').Strategy,
// GithubStrategy = require('passport-github2').Strategy,
// GoogleStrategy = require('passport-google-oauth2').Strategy,
// InstagramStrategy = require('passport-instagram').Strategy,
ejs = require('ejs');
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:8080'
}

var users = {};

app.use(cookieParser('dsasdas'));

var server = require('http').Server(app);
var io = require('socket.io')(server);

global.globalIo = io;
app.locals.idactual = null;

mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true
});
//var online = {};
var Globalonline = [];
global.Globalonline = Globalonline;


/** SOCKET IO **/

//var usernames = {};
//var rooms = [];

var i18n = require('i18n');

i18n.configure({

    //define how many languages we would support in our application
    locales: ['en', 'zh'],

    //define the path to language json files, default is /locales
    directory: __dirname + '/locales',

    //define the default language
    defaultLocale: 'en',

    // define a custom cookie name to parse locale settings from 
    cookie: 'i18n'
});

app.use(cookieParser("demomulti"));

app.use(session({
    secret: "demomulti",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));

app.use(i18n.init);

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
//mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// ======================= Modulos ==========================

var Modulo = require('./app/modules/chat.js')({
    io: io,
    app: app
});



var Modulo = require('./app/modules/pages.js')({
    UsuariosCtrl: UsuariosCtrl,
    ProyectCtrl: ProyectCtrl,
    PaisesCtrl: PaisesCtrl,
    app: app,
    Helper: Helper
});



var Modulo = require('./app/modules/api.js')({
    AutCtrl: AutCtrl,
    Middleware: Middleware
});



// =================================================================
// start the server ================================================
// =================================================================
server.listen(port);
console.log('Magic happens at http://localhost:' + port);

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});



