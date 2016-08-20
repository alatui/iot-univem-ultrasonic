var SerialPort = require('serialport2').SerialPort;
var port = new SerialPort();

port.on('data', function(data) {
  console.log(data.toString());
});

port.on('error', function(err) {
  console.log(err);
});

port.open('/dev/cu.usbserial-A9OR35DH/', {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1
}, function(err) {
  //port.write("hello world");
  port.close();
});