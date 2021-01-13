

const PORT = process.env.PORT || 3030

// Dependencies
import * as express from 'express';
import {Server as HTTPServer} from 'http';
const morgan = require('morgan') // logging library
import * as path from 'path';
import {Server as SocketServer} from 'socket.io';

// Initialization
const app = express()
const server = new HTTPServer(app)

app.set('port', PORT)
app.use(morgan('dev'))

app.use('/dist', express.static(path.join(__dirname, '/dist')))

// 🚧  🚧 ROUTE 🚧  🚧  
app.get('', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist/index.html'))
})


//===== SOCKETS =====

const io = new SocketServer(server);

//---- Socket Manager ----
const CanvasClickSocketManager = require('./server/CanvasClickSocketManager');
const manager = new CanvasClickSocketManager();

import Constants from './src/Constants';

type Position = {x: number, y: number};

io.on('connection', socket => {

  // 📥  📥 receiver 📥  📥  
  socket.on(Constants.NEW_PLAYER, (data: Object, callback: (s: string) => void) => {
    manager.addNewPlayer(`player${Math.floor(Math.random()*200)}`, socket)
    callback('null');
  });

  // 📥  📥 receiver 📥  📥  
  socket.on(Constants.CLICK_POSITION, (data: Position) => {
    console.log(`Click: ${data.x} ${data.y}`);
    console.log(JSON.stringify(data));
    manager.sendClickToClients(data);
  })
})


//----- LISTEN -----

server.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`)
})
