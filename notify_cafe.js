var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');
var request = require('request');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'iot_univem'
});


var is_empty = 10;
var last_notification = new Date() * 1;
var threshold = 1 * 60 * 1000;
//var threshold = 15 * 1000;


function notify(value) {
    console.log('['+value+']');
    var cur_date = new Date() * 1;
    if(value <= is_empty && (cur_date - last_notification) > threshold) {
        last_notification = new Date() * 1;
        request.post({
            url: 'https://smscommunity.herokuapp.com/sms/14996048600/?token_public=iot&token_secret=senha123',
            body: 'Encher máquina de café',
            }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('SMS enviado');
            } else {
                console.log('Erro SMS');
            }
        });
    }//if
}

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
    var data = JSON.parse(message.toString());
    connection.query("insert into iot(date,value) values (FROM_UNIXTIME('"+(data.date/1000)+"'),'"+data.value+"')");
    notify(data.value);
    io.emit('data_ultrasonic', message.toString());
});
