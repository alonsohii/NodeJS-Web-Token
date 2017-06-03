var db = require('../connection'),
    geoip = require('geoip-lite'),
    requestIp = require('request-ip');

exports.CatalogoPaises = function(req,res){

db.query('select * from v_paisesestados order by Nombre , nombreEstado', function(err, rows, fields) {

  res.setHeader('Content-Type', 'application/json');
 //res.writeHead(200, {'Content-Type': 'text/plain'});

res.json(rows);
//res.header("Access-Control-Allow-Origin", "*");
  if (!err)
  console.log('The solution is: ');
  else

    console.log('Error while performing Query.' + err);
  });
}

exports.Visitante = function(req,res){
console.log(requestIp.getClientIp(req));
var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] ;
res.json( requestIp.getClientIp(req));
}



function getClientIp(req) {
  var ipAddress;
  // The request may be forwarded from local web server.
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {

    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};
exports.Demo = function(demo){

return demo;
}