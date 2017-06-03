const nodemailer = require('nodemailer');

exports.Query = function(db,query){
var rowss ;
db.query(query, function(err, rows, fields) {
//console.log
  if(!err){
  	console.log( demo(rows));
  // rowss =  demo(rows);
  // demo(rows);
  rowss ='puta madre';

  }else {
  	console.log('mal');
  	rowss =  -1;
   // res.status(400);  res.send(err);  throw err;
  }

  });
return rowss;
}

function demo(x){
	return x;
}


module.exports.Query = function(callback,sql,db) {
    db.query(sql, function(err, rows, fields) {
        
        if (!err)
        	if(rows.length  ==0)
            	callback('nodata');
        	else
        		callback(rows);
        else
            callback(null);
    });

}

module.exports.Error = function (res,error){
	 res.status(400);  res.send(err);  throw err;
	 console.log(err);  
}

module.exports.Pagina  = function(url,ruta,param,app){
	app.get(url,function(req,res){  
	// res.set('Content-Type', 'application/javascript');
	  res.render(ruta, param);
      res.status(200);
	//res.sendFile(path.join(__dirname+'/app/views/registro.html'), { name: "example" });
	});
}

module.exports.mail = function(mailOptions){

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'alonsosendmail@gmail.com',
                            pass: 'marioalonso77'
                        }
                    });

                   transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
}

module.exports.Config = function(app){

}