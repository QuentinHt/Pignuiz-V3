const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/socket.html');
});
server.listen(3005, () => {
  console.log('listening on *:3000');
});