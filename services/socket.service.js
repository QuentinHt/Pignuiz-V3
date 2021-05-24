// // ES6 import or TypeScript
// import { io } from "socket.io-client";
// // CommonJS
// const io = require("socket.io-client");

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });
  
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

// module.exports = {
//     io
// }