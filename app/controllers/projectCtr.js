var mongoose = require('mongoose');
var User = require('../models/user'); // get our mongoose model
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
var express = require('express');
var db = require('../connection');
var app = express();
app.set('superSecret', config.secret); // secret variable
var crypto = require('crypto');
socketIOHelper = require('../../app/helpers/socketio');

var express = require('express'),
    app = express();

exports.InsertarProyecto = function(req, res) {
    var data = req.body;
    // #firstName,#pw,#email,#ComboCategorias,#ComboSubCategorias,#nombreproyecto,#descripcionproyecto,#ComboPresupuesto,#persupuestado'
    var proyecto = {

        //Nombre:data. , 
        Tiulo: data.nombreproyecto.replace(/[^a-z0-9 ]/gi,''),
        url:data.nombreproyecto.replace(/[^a-z0-9 ]/gi,'').replace(/[ ]+/g, '-'), 
        //tags:data. , 
        //descripcion:datadescripcionproyecto. , 
        oferta: data.persupuestado,
        //fecharegistro:data. , 
        fechaentrega: null,
        _idbp_Categorias: data.ComboCategorias,
        _idbp_Subcategorias: data.ComboSubCategorias,
        desarrollo: data.descripcionproyecto,
        _idPresupuesto: data.ComboPresupuesto

    };

    db.query('INSERT INTO bp_proyecto SET ?', proyecto, function(err, ress) {

        if (!err) {

            console.log('Proyecto insertado:', ress.insertId);

            var server = require('http').Server(app);
            var io = require('socket.io')(server);

            socketIOHelper.set(io);
            var receivers = require('../../app/sockets/receivers.server.sockets');
            receivers.receivers(io, "registrado");

            res.json({
                success: true
            });
            return 1;

        } else {

            res.status(400);
            res.send(err);
            throw err;
        }
    });
}

// Obtener Proyectos
exports.GetProjects = function(req, res) {

    Helper.Query(function(data) {
        if (data != 'nodata') {

            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        } else {
            //   data  = { ok:1};
            res.json({
                success: false
            });
            res.status(400);
        }
    }, "SELECT * from V_PROYECTOS", db);

}

// Projecto especifico 
exports.GetProject = function(req, callback, arg) {
  //console.log("SELECT * from V_PROYECTOS nombre ="+arg)
  console.log(arg);
    Helper.Query(function(data) {
        if (data != 'nodata') { 
           callback(data);
        } else {
           callback(null);

        }
    }, "SELECT * from V_PROYECTOS where urlproyecto ='"+arg+"'", db);

}
