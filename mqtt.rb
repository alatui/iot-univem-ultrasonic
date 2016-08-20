require 'rubygems'
require 'mqtt'




# Subscribe example
MQTT::Client.connect('mqtt://test.mosquitto.org') do |c|
  # If you pass a block to the get method, then it will loop
  c.get('presence') do |topic,message|
    puts "#{topic}: #{message}"
  end
end


# Publish example
MQTT::Client.connect('mqtt://test.mosquitto.org') do |c|
  c.publish('presence', 'mesddddsage')
end