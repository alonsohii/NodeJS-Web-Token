var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;


module.exports = mongoose.model('TokenModel', new Schema({ 
	token: {type: String, index: true}, 
	fecha:{type:Date,default:Date.now},
    estatus:Boolean,
    createdAt: {type:Date,default: new Date()} 
}));


// db.TokenModel.ensureIndex({ "createdAt": 1 }, { expireAfterSeconds: 3600 } )
