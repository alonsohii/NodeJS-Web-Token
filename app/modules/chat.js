
module.exports = function(params,callback) {


	//app.use(express.static(__dirname + '/public'));



	/*mongoose.connect('mongodb://localhost/chat', {
	  useMongoClient: true,

	});*/

/*	var chatSchema =mongoose.Schema({
		//name:{first:String,last:String},
		nick:String,
		msg:String,
		created:{type:Date,default:Date.now}
	});*/

	//var Chat = mongoose.model('Message',chatSchema);



	app.get('/' , function(req,res){
		res.sendfile(__dirname+'/index.html');
	});

	params.io.sockets.on('connection',function(socket){
		//var query = Chat.find({});

		/*query.sort({created: -1}).limit(8).exec(function(err,docs){
			if(err) throw err;
			socket.emit('load old msgs',docs);

		});*/
		socket.on('new user',function(data,callback){
			if(data in users){  // icknames.indexOf(data) != -1
				callback(false);
			}else{
				callback(true);
				socket.nickname = data;
				users[socket.nickname] = socket;
				//nicknames.push(socket.nickname);
				updateNicknames();
			}

		});

		function updateNicknames(){
			io.sockets.emit('usernames',Object.keys(users)); //nicknames
		}
		socket.on('send message',function(data,callback){
			var msg  = data.trim();
			if(msg.substr(0,3) === '/w ' ){
			
				msg = msg.substr(3);
				var ind = msg.indexOf(' ');
				if(ind !== -1){
						console.log(1);
					var name = msg.substring(0,ind);
					var msg = msg.substring(ind+1);

					if(name in users){

						users[name].emit('whisper',{msg:msg,nick: socket.nickname});
						users[socket.nickname].emit('mywhisper',{msg:msg,nick: socket.nickname});
					   console.log('Whisper!');
					}else{
						callback('Error! Enter a valod user.');
					}


				}else{
					callback('Error! Please enter a message for you whisper');
				}
			}else{

				var newMsg = Chat({msg:data,nick: socket.nickname});
				newMsg.save(function(err){
					if(err) throw err;
					io.sockets.emit('new message',{msg:data,nick: socket.nickname});
				});
				

			}
			
			//socket.broadcast.emit('new message',data);

		});

		socket.on('private msg',function(data,callback){
			var name = data.user;
			var msg = data.msg;
			var send = data.send;
			console.log(data);

					if(name in users){

						users[name].emit('private sender',{msg:msg,nick: send});
						//users[socket.nickname].emit('mywhisper',{msg:msg,nick: socket.nickname});
					   console.log('Whisper!');
					}else{
						callback('Error! Enter a valod user.');
					}
		});

		socket.on('typing', function (data) {
	      console.log(data);
	      users[data.para].emit('typing', data);
	    });

		socket.on('disconnect',function(data){
			if(!socket.nickname) return;
			delete users[socket.nickname];
			//nicknames.splice(nicknames.indexOf(socket.nickname),1);
			updateNicknames();
		});
	});

}
