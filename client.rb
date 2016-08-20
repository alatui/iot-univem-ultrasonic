require 'rubygems'
require 'mqtt'

MQTT::Client.connect('mqtt://test.mosquitto.org') do |c|
    c.get('iot-univem/#') do |topic, message|
        puts "#{topic}: #{message}"
    end
end