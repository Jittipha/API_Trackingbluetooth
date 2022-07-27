const mqtt = require("mqtt");
var client = mqtt.connect('mqtt://192.168.1.192:1883');
const topic ="/gw/ac233fc045ba/status";
var ProtoBuf = require("protobufjs");
var builder = ProtoBuf.loadProtoFile('event.proto'),
    as2 = builder.build('as2'),
    Message=as2.Message;
var message = Message({'asd':'asdasd'})
var buffer_messsage = message.encode();


client.on("connect",function() {
    setInterval(function() {
        var random = Math.random()*50;
        
        console.log(topic + buffer_messsage);
        
        client.publish(topic,buffer_messsage+'')
        

    }),30000;
});