  var socket ;


   socket = io.connect();




  socket.on('connect', function () { });

  socket.on('updatechat', function (username, data) {
    debugger;
    var user = {};
    user.username = username;
    user.message = data;
    user.date = new Date().getTime();
    user.image = 'http://dummyimage.com/250x250/000/fff&text=' + username.charAt(0).toUpperCase();
    //$scope.users.push(user);
    //console.log(data);
    $('#chat').append(user.username+ ':'+user.message+'<br>');
  });

  socket.on('roomcreated', function (data) {
    debugger;
    socket.emit('adduser', data);
  });

  socket.on('disconnect', function (data) {
   
   //alert('alv');
  });

  


  socket.on('emi', function (data) {

   //console.log('alv');
   alert('alv');
  });



function crearSala(data){
     // $scope.curtrentUser = data.username;

     data.username = 'mario';
    socket.emit('createroom', data);
}

function joinSala(data){
   // socket.on('connect', function () { });
      data.username = 'mario';
    socket.emit('adduser', data);
}


function mensaje(msg){

   // socket.on('connect', function () { });
   debugger;
    socket.emit('sendchat', msg);

}



