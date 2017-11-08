

module.exports = function(params,callback) {

    this.UsuariosCtrl = params.UsuariosCtrl;
    this.ProyectCtrl = params.ProyectCtrl;
    this.PaisesCtrl = params.PaisesCtrl;
    this.Helper = params.Helper;
    this.app = params.app;


	this.app.post('/usuario', this.UsuariosCtrl.InsertarUsuario );
	this.app.post('/reset', this.UsuariosCtrl.RandomPassword );

	this.app.post('/InsertarProyecto',this.ProyectCtrl.InsertarProyecto);


	this.Helper.Pagina('/registro','registro',{ title: "Registro de Usuarios"} , app);
	this.Helper.Pagina('/login','login',{ title: "Registro de Usuarios"} , app);
	this.Helper.Pagina('/demo','registro',{ title: "Diferente"},app);
	this.Helper.Pagina('/home','home',{ title: "Inicio"},app);



	this.Helper.Pagina('/generar','generar',{ title: "Reset Password"},app);
	this.Helper.Pagina('/newproject','newproject',{ title: "Nuevo Proyecto"},app);

	this.Helper.Pagina('/createproject','project',{ title: "Creando Proyecto"},app);
	this.Helper.Pagina('/search','search',{ title: "Buscar Proyecto"},app);
	this.Helper.Pagina('/usuarios','users',{ title: "Usuarios"},app);


	// Paginas Mongo

	this.app.get('/setup', this.UsuariosCtrl.UsuarioMongoDb);
	this.app.get('/paises', this.PaisesCtrl.CatalogoPaises );
	this.app.get('/visitante', this.PaisesCtrl.Visitante );

	this.app.get('/users', this.UsuariosCtrl.GetUsers);
	this.app.get('/online', this.UsuariosCtrl.GetUsersOnline);


	this.app.get('/Categorias', this.PaisesCtrl.CategoriasProyecto );
	this.app.get('/Projects', this.ProyectCtrl.GetProjects );
	this.app.get('/SubCategorias', this.PaisesCtrl.SubCategoriasProyecto );
	this.app.get('/Presupuestos', this.PaisesCtrl.Presupuestos );

	this.app.get('/project/:nombre', function(req, res) {

	    var param = {};
	    param = {
	        nombre: req.params.nombre
	    };
	    res.render('detalle', { nombre: req.params.nombre ,title:'Detalle proyecto' });
	    res.status(200);
    });



	this.greet = function(params,callback){

    };


}


