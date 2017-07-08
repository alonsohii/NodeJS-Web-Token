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
    Middleware = require('./app/middleware'),
    Helper   = require('./app/helpers/general'),
    ejs = require('ejs');
    const cors = require('cors');
    const corsOptions = {
      origin: 'http://localhost:8080'
    }
	var dummy;
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

Helper.Pagina('/registro','registro',{ title: "Registro de Usuarios"} , app);
Helper.Pagina('/login','login',{ title: "Registro de Usuarios"} , app);
Helper.Pagina('/demo','registro',{ title: "Diferente"},app);
Helper.Pagina('/home','home',{ title: "Inicio"},app);

app.get('/webdemo', function(req, res, next) {
   res.render('home', {query : req.query , title:'asdas'});
});

Helper.Pagina('/generar','generar',{ title: "Reset Password"},app);



//

// Paginas Mongo

app.get('/setup', UsuariosCtrl.UsuarioMongoDb);
app.get('/paises', PaisesCtrl.CatalogoPaises );
app.get('/visitante', PaisesCtrl.Visitante );




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
	res.json({ message: 'Welcome to the coolest API on earth!' });
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
app.listen(port);
console.log('Magic happens at http://localhost:' + port);


process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

