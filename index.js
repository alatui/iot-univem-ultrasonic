var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', function() {
    console.log('[connected]');
    client.subscribe('iot-univem/ulrasonic_semcafe');
    //client.publish('presence', 'Hello mqtt fernando');
});

client.on('message', function(topic, message) {
    console.log(message.toString());
    //client.end();
})