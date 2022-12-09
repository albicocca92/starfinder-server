const express = require('express')
const app = express()
// environment variables
// root
app.get('/', (req, res) => {
  res.sendStatus(200)
})






var dgram = require("dgram");
var server1 = dgram.createSocket("udp4")
var server2 = dgram.createSocket("udp4")
var testo = ""
var indirizzo1 = 0
var indirizzo2 = 0
var porta1 = 0
var porta2 = 0
var connesso = "Dispositivo connesso"


console.log("Server inizializzando")
server1.on("message", function (msg, rinfo) {
    console.log("connesso server");

    porta1 = rinfo.port
    indirizzo1 = rinfo.address

    
    testo = String(msg)
    console.log(testo);
    if (indirizzo2 != 0)
        server2.send(testo, porta2, indirizzo2)  
});

server2.on("message", function (msg, rinfo) {
    console.log("connesso client");

    indirizzo2 = rinfo.address
    porta2 = rinfo.port

    if(indirizzo1 != 0)
        server1.send(connesso, porta1, indirizzo1) 
});
server1.bind(52464)
server2.bind(52465)

console.log("Server Operativo")