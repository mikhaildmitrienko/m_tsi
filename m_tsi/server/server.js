const express = require('express');
const app = express();
const mqtt = require('mqtt');
const http = require('http');

// var topic_s = "mdmit/feeds/test_feed"
// client.subscribe(topic_s, {qos:1})

// client.on('message',function(topic, message, packet){
// 	console.log("message is "+ message);
// 	console.log("topic is "+ topic);
// });

const options = {
    clientId:"mqttjs01",
    username:"mdmit",
    password:"aio_imqT34pO1hu4p3k7qeIbZk5z3bGo",
    clean:true
};

var client = mqtt.connect('mqtt://io.adafruit.com', options);

client.on("error", function(error){
    console.log("Can't connect" + error);
    process.exit(1)});


client.on("connect", function(){	
    console.log("connected");
})

http.createServer((request, response) => {

    if (request.url.toLowerCase().includes("/feed" )) {
        console.log("got it")

        response.writeHead(200, {
            Connection: "keep-alive",
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*"
        })
        
        var topic_list = ["mdmit/feeds/test_feed", "mdmit/feeds/test_feed2"]
        client.subscribe(topic_list, {qos:1})
        
        client.on('message', function(topic, message, packet){
            console.log("message is " + message);
            console.log("topic is " + topic);
            response.write(`data: ${JSON.stringify({'message': message, 'topic': topic})}`);
            response.write("\n\n");
            });

        
        response.on('close', () => {
            if(!response.finished){
                console.log("CLOSED");
                response.writeHead(404);
            }});

    } else {
    response.writeHead(404);
    response.end();
    }
})
.listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000/");
});






// var net = require('net')
// var mqttCon = require('mqtt-connection')
// var stream = net.createConnection(8883, 'io.adafruit.com')
// var conn = mqttCon(stream)

// const options = {
//     username: 'mdmit',
//     password: 'aio_imqT34pO1hu4p3k7qeIbZk5z3bGo',
//     clientId: 'my-device'
// }

// conn.connect(options);

// console.log(conn.console)

// console.log("Connected?")
