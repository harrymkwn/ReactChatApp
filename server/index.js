const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT =  process.nextTick.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{
    console.log("hello io");

    socket.on(('disconnect'),()=>{
        console.log("connection is no longer ");
    });
});

app.use(router);


server.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});