var express 	= require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    mongoose    = require('mongoose'),
    config = require('./config'), // get our config file
    path    = require("path"),
    AutCtrl = require('./app/controllers/aut'),
    UsuariosCtrl = require('./app/controllers/users'),
    PaisesCtrl = require('./app/controllers/catpaises'),
    ProyectCtrl = require('./app/controllers/projectCtr'),
    Middleware = require('./app/middleware'),
    Helper   = require('./app/helpers/general'),
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

app.use(cookieParser('dsasdas'));

var server = require('http').Server(app);
var io = require('socket.io')(server);
//var idactual = null;
global.globalIo = io;
app.locals.idactual = null;


mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
  /* other options */
});
//var online = {};
var Globalonline = [];
global.Globalonline = Globalonline;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

/** SOCKET IO **/

var usernames = {};
var rooms = [];


//io.use(ios(session));

io.sockets.on('connection', function (socket) {
   //socket.join('masterroom');
   console.log('Socket IO conectado');


  // console.log(socket);

    socket.on('adduser', function (data) {
        var username = data.username;
        var room = data.room;

        if (rooms.indexOf(room) != -1) {
            socket.username = username;
            socket.room = room;
            usernames[username] = username;
            socket.join(room);


            socket.emit('updatechat', 'SERVER', 'You are connected. Start chatting');
            socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
        } else {
            socket.emit('updatechat', 'SERVER', 'Please enter valid code.');
        }
    });
    
    socket.on('createroom', function (data) {
            
        var new_room =   parseInt( data.newroom, 10);  //("" + Math.random()).substring(2, 7);parseInt(req.params.year, 10);
        rooms.push(new_room);
        data.room = new_room;
       // socket.emit('updatechat', 'SERVER', 'Your room is ready, invite someone using this ID:' + new_room);
       // console.log(new_room);
       // console.log(data);

        socket.emit('roomcreated', data);

    });

    socket.on('sendchat', function (data) {
               console.log(' mensaje data:'+data + ' - '+socket.room);
        io.sockets.in(socket.room).emit('updatechat', socket.username, data);

    });

    socket.on('disconnect', function (m) {
        delete usernames[socket.username];
        console.log('desconectado');
        console.log(socket.usuarios);
        if(app.locals.idactual!= null){
          var index = Globalonline.indexOf(app.locals.idactual);
            if (index != -1) {
              console.log('----------------------borrando'+app.locals.idactual);
              delete Globalonline[socket.id];
                 Globalonline.splice(index, app.locals.idactual);
            }
        }
        io.sockets.emit('updateusers', usernames);
        if (socket.username !== undefined) {
            socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
            socket.leave(socket.room);
        }
    });
});

var i18n = require('i18n');

i18n.configure({

    //define how many languages we would support in our application
    locales:['en', 'zh'],

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
    cookie: { maxAge: 60000 }
}));


app.use(i18n.init);


// mn
// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
//mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// =================================================================
// routes ==========================================================
// =================================================================
// Paginas

app.post('/usuario', UsuariosCtrl.InsertarUsuario );
app.post('/reset', UsuariosCtrl.RandomPassword );

app.post('/InsertarProyecto',ProyectCtrl.InsertarProyecto);


Helper.Pagina('/registro','registro',{ title: "Registro de Usuarios"} , app);
Helper.Pagina('/login','login',{ title: "Registro de Usuarios"} , app);
Helper.Pagina('/demo','registro',{ title: "Diferente"},app);
Helper.Pagina('/home','home',{ title: "Inicio"},app);



Helper.Pagina('/generar','generar',{ title: "Reset Password"},app);
Helper.Pagina('/newproject','newproject',{ title: "Nuevo Proyecto"},app);

Helper.Pagina('/createproject','project',{ title: "Creando Proyecto"},app);
Helper.Pagina('/search','search',{ title: "Buscar Proyecto"},app);
Helper.Pagina('/usuarios','users',{ title: "Usuarios"},app);



// Paginas Mongo

app.get('/setup', UsuariosCtrl.UsuarioMongoDb);
app.get('/paises', PaisesCtrl.CatalogoPaises );
app.get('/visitante', PaisesCtrl.Visitante );

app.get('/users', UsuariosCtrl.GetUsers);
app.get('/online', UsuariosCtrl.GetUsersOnline);


app.get('/Categorias', PaisesCtrl.CategoriasProyecto );
app.get('/Projects', ProyectCtrl.GetProjects );
app.get('/SubCategorias', PaisesCtrl.SubCategoriasProyecto );
app.get('/Presupuestos', PaisesCtrl.Presupuestos );


// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------

var apiRoutes = express.Router(); 

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', AutCtrl.autentificarMysql);

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(Middleware.Verificar);

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', function(req, res) {
 //console.log(req.decoded.id) ;
    app.locals.idactual = req.decoded.id;

    //  console.log(socket.handshake);
   if(app.locals.idactual != null){
       var existe = Globalonline.indexOf(app.locals.idactual);
       console.log(existe);
       if(existe == -1){
             Globalonline[Math.floor((Math.random() * 10000) + Math.random())] = app.locals.idactual;
           console.log('insertando:'+app.locals.idactual+'. por que existe:'+existe);
       }

   }

	res.json({ success:true, message: 'Welcome to the coolest API on earth!' , user:req.decoded.usuario, correo:req.decoded.correo});
});

apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});

app.use('/api', apiRoutes);
// =================================================================
// start the server ================================================
// =================================================================
server.listen(port);
console.log('Magic happens at http://localhost:' + port);


process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});






/** SOCKET IO **/

/** facebook login 
// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: '1385758038128333',
    clientSecret: '9ef675b8f47eb7d1557bf9552b0c9923',
    callbackURL: 'http://localhost:8080/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });



app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

 facebook login **/

function findValue(o, value) {
    for (var prop in o) {
        if (o.hasOwnProperty(prop) && o[prop] === value) {
            return prop;
        }
    }
    return null;
}