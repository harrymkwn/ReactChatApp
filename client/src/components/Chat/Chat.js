import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";

let socket;
function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  console.log(name, room);
  const ENDPOINT = "localhost:5005";

  useEffect(() => {
    const {name,room} = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room } , ({name})=> {
      alert(name);
    });

    return () => {
      socket.emit('disconnect');
    };

  }, [ENDPOINT, location.search]);
  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
}

export default Chat;
