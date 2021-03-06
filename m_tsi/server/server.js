const express = require('express');
const app = express();
const mqtt = require('mqtt');
const http = require('http');

require('dotenv').config({path: '../.env'});

const options = {
    clientId:"mqttjs02",
    username: process.env.isita_adafruit_username,
    password: process.env.isita_adafruit_key,
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
        
        var topic_list = [process.env.isita_feed_1]
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




