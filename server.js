var express = require('express');

var app = express();

var http = require('http').Server(app);

var io     =require('socket.io')(http);

var shortid              = require('shortid');
app.use(express.static(__dirname ));
var clients =[];

//var clientLookup={};



io.on('connection',function(socket){

  var current_player;

socket.on("PING",function(pack){

console.log('menssagem recebida do unity'+pack.message);


var Json_pack = {

   message:"pong!!!"

};

socket.emit("PONG",Json_pack);

});

socket.on("JOIN_ROOM", function(pack){

current_player = {

  name : pack.name,
  id: socket.id
};
clientLookup[current_player.id] = current_player;
socket.emit("JOIN_SUCCESS",current_player);
});

});

http.listen(process.env.PORT || 3000, function(){

console.log('server listen 3000');
});
console.log('--------Nodejs sevidor is rolando-------');
