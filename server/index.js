const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT =  process.env.PORT || 5005;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{

    console.log("socket.io is ready to accept event");

    socket.on('join',({name,room},callback)=>{
        console.log(name,room);

        callback({name});
    });

    socket.on(('disconnect'),()=>{
        console.log("connection is no longer ");
    });
});

app.use(router);


server.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});