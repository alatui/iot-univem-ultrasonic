require "serialport"
require 'rubygems'
require 'mqtt'
require 'json'
require 'date'

port_str = "/dev/cu.usbserial-A9OR35DH"
baud_rate = 9600
data_bits = 8
stop_bits = 1
parity = SerialPort::NONE
sp = SerialPort.new(port_str, baud_rate, data_bits, stop_bits, parity)


client = MQTT::Client.connect('mqtt://test.mosquitto.org')
client.connect()

while (i = sp.gets.chomp) do
  data = JSON.generate({ date: DateTime.now.strftime('%Q'), value: i })
  client.publish('iot-univem/ulrasonic_semcafe', data)
  client.publish('iot-univem/ulrasonic/semcafe', JSON.generate({ timestamp: DateTime.now.iso8601.to_s, value: i }))
  puts data
end

client.disconnect()
sp.close