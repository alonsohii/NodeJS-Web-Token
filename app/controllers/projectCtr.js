var mongoose = require('mongoose');
var User = require('../models/user'); // get our mongoose model
var ProyModel = require('../models/proyecto'); // get our mongoose model
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
var express = require('express');
var db = require('../connection');
var app = express();
app.set('superSecret', config.secret); // secret variable
var crypto = require('crypto');
socketIOHelper = require('../../app/helpers/socketio');
var regex = /(<([^>]+)>)/ig;

var express = require('express'),
    app = express();

exports.InsertarProyecto = function(req, res) {
    var data = req.body;
    // #firstName,#pw,#email,#ComboCategorias,#ComboSubCategorias,#nombreproyecto,#descripcionproyecto,#ComboPresupuesto,#persupuestado'
    var proyecto = {

        //Nombre:data. , 
        Tiulo: data.nombreproyecto.replace(/[^a-z0-9 ]/gi, ''),
        url: data.nombreproyecto.replace(/[^a-z0-9 ]/gi, '').replace(/[ ]+/g, '-'),
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

            var nick = new ProyModel({
                nombre: proyecto.Tiulo,
                descripcioncorta: proyecto.desarrollo.replace(regex, " ").replace(/\W+/g, " "),
                estatus: 1,
                categoriaid: proyecto._idbp_Categorias,
                Subcatagoriaid: proyecto._idbp_Subcategorias,
                Presupuestoid: proyecto._idPresupuesto,
                urlproyecto: proyecto.url,
                idproyecto:ress.insertId
            });
            nick.save(function(err) {
                if (err) {
                    res.json({
                        success: false
                    });
                    throw err;

                } else {

                    console.log('Proyect saved successfully on Mongodb');
                    res.json({
                        success: true
                    });
                    return 1;

                }

            });

        } else {

            res.status(400);
            res.send(err);
            throw err;
        }
    });
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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

// Obtener Proyectos MongoDB
exports.GetProjectsMongo = function(req, res) {
    var ProyModel = mongoose.model('ProyModel', ProyModel);

    var query = ProyModel.find({});

    query.sort({
        fecha: -1
    }).limit(8).exec(function(err, docs) {
        if (err) {
            res.json({
                success: false
            });
            res.status(400);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.json(docs);

        }

    });

}

// Obtener Proyectos MongoDB
exports.SearchProjectsMongo = function(req, res) {

    var ProyModel = mongoose.model('ProyModel', ProyModel);
    var negacion = ' -la -los -el -de -en -las -que';
    console.log(req.query.last);
    if (req.query.last == null) {

        var query = ProyModel.find({
            $text: {
                $search: req.query.q + negacion
            }
        }, {
            score: {
                $meta: "textScore"
            }
        }).sort({
                score: {
                    $meta: "textScore"
                }
            }

        );

        query.sort({
            fecha: -1
        }).exec(function(err, docs) {
            if (err) {
                res.json({
                    success: false
                });
                res.status(400);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.json(docs);

            }

        });

    } else {
        var query = ProyModel.find();

        query.sort({
            fecha: -1
        }).limit(100).exec(function(err, docs) {
            if (err) {
                res.json({
                    success: false
                });
                res.status(400);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.json(docs);

            }

        });
    }

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
    }, "SELECT * from V_PROYECTOS where urlproyecto ='" + arg + "'", db);

}

exports.UsuarioMongoDb = function(req, res) {

}