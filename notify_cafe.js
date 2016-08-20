var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  //console.log('listening on *:3000');

});



client.on('connect', function() {
    console.log('[connected]');
    client.subscribe('iot-univem/ulrasonic_semcafe');
    //client.publish('presence', 'Hello mqtt fernando');
});


client.on('message', function(topic, message) {
    //console.log(message.toString());
    //client.end();
    io.emit('data_ultrasonic', message.toString());
});
