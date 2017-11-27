

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
	this.Helper.Pagina('/','home',{ title: "Registro de Usuarios"} , app);
	this.Helper.Pagina('/login','login',{ title: "Registro de Usuarios"} , app);
	this.Helper.Pagina('/demo','registro',{ title: "Diferente"},app);
	this.Helper.Pagina('/home','home',{ title: "Inicio"},app);



	this.Helper.Pagina('/generar','generar',{ title: "Reset Password"},app);
	this.Helper.Pagina('/newproject','newproject',{ title: "Nuevo Proyecto"},app);

	this.Helper.Pagina('/createproject','project',{ title: "Creando Proyecto"},app);
	this.Helper.Pagina('/search','search',{ title: "Buscar Proyecto"},app);
	this.Helper.Pagina('/search2','searchapi',{ title: "Buscar Proyecto"},app);
	this.Helper.Pagina('/usuarios','users',{ title: "Usuarios"},app);


	// Paginas Mongo

	this.app.get('/setup', this.UsuariosCtrl.UsuarioMongoDb);
	this.app.get('/paises', this.PaisesCtrl.CatalogoPaises );
	this.app.get('/visitante', this.PaisesCtrl.Visitante );

	this.app.get('/users', this.UsuariosCtrl.GetUsers);
	this.app.get('/online', this.UsuariosCtrl.GetUsersOnline);


	this.app.get('/Categorias', this.PaisesCtrl.CategoriasProyecto );
	this.app.get('/Projects', this.ProyectCtrl.GetProjects );
	this.app.get('/ProjectsM', this.ProyectCtrl.GetProjectsMongo );
	this.app.get('/SubCategorias', this.PaisesCtrl.SubCategoriasProyecto );
	this.app.get('/Presupuestos', this.PaisesCtrl.Presupuestos );

	this.app.get('/searchapi', this.ProyectCtrl.SearchProjectsMongo);

	this.app.get('/project/:nombre', function(req, res) {

	    var param = {};

       this.ProyectCtrl.GetProject(null,function(data){
      // 	this.Helper.UrlReplace(req.params.nombre)
     // console.log(data);

		    if(data != null){
			    res.render('detalle', data[0]);
			    res.status(200);
		    }else{
		    	var data = { nombre:'(404) No existe un proyecto con este nombre' , desarrollo:"", categoria:"",subcategoria :""}
		        res.render('detalle', data);
		        res.status(200);
		    }

       },req.params.nombre);



    });

    /*app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});*/




	this.greet = function(params,callback){

    };


}


