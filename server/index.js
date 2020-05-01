const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT =  process.env.PORT || 5005;

const router = require('./router');
const User = require('./user');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{

    console.log("socket.io is ready to accept event");

    socket.on('join',({name,room},callback)=>{
        console.log(name,room);
        const  {error , user } = User.addUser({id : socket.id , name , room});

        if(error)callback(error);
        socket.emit('message', {user : 'admin', text : `${user.name}, welcome to the room ${user.room}`});

        socket.broadcast.to(user.room).emit('message',  {user : 'admin', text : `${user.name} has joined `});

        io.to(user.room).emit('roomData', { room: user.room, users: User.getUsersInRoom(user.room) });
        
        callback();
    });

    socket.on('sendMessage',(message,callback)=>{
        const user = User.getUser(socket.id);

        io.to(user.room).emit('message',{ user : user.name , text :message});

        callback();
    });

    socket.on(('disconnect'),()=>{
        const user = User.removeUser(socket.id);

        if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: User.getUsersInRoom(user.room)});
        }
    });
});

app.use(router);


server.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});