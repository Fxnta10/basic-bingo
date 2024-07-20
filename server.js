
import {SOCKET_MESSAGE_TYPES} from "./public/GLOBAL_CONSTANTS.js";
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from "socket.io";
import http from 'http';

// constants
const PORT = process.env.PORT ?? 3000;

// initialisation
const app = express()
const server = http.createServer(app);
const io = new Server(server);

// app middlewares
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routes
app.post('/signin', function (req, res) {
  // res.send('Hello '+req.query.nickname)
  res.send(`Hello ${req.body.nickname}`)
})
app.use(express.static('public'))

// websocket
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on(SOCKET_MESSAGE_TYPES.CHAT_MESSAGE.label, (msg) => {
    io.emit(SOCKET_MESSAGE_TYPES.CHAT_MESSAGE.label, msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

// listen on port
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});