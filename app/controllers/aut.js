var mongoose = require('mongoose');
var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
var express 	= require('express');
var db = require('../connection');
var app         = express();
app.set('superSecret', config.secret); // secret variable
var crypto = require('crypto');

exports.autentificar = function(req, res) {
	

	User.findOne({
		name: req.query.name
	}, function(err, user) {
		if (err) {
           res.status(400); res.send(err);
				throw err;

		};

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.query.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresIn: 86400 // expires in 24 hours
				});

				console.log(token);

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		

		}

	});
}


exports.autentificarMysql = function(req,res){


 db.query('SELECT correo, pw FROM rank.bp_personas    WHERE correo = "' + req.body.name + '"'  /* + 'AND password =' [hash] */ , function(err, rows, fields) {

if(rows != undefined){
	  

		const secret = 'webos con frijoles@327';
     	const hash = crypto.createHmac('sha256', secret)
	                   .update(req.body.password)
	                   .digest('hex');
console.log(hash);
console.log(rows[0].pw)

 	    if (rows[0].pw != hash) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(rows[0], app.get('superSecret'), {
					expiresIn: 5000  // expires in 24 hours

				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}	
 

}else{


}

  

  if (!err)
  console.log('The solution is: ');
  else
    console.log('Error while performing Query.' + err);
  });


}

// SELECT correo, pw FROM projectb.bp_personas;