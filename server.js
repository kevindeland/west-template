

const PORT = process.env.PORT || 3030

// Dependencies
const express = require('express')
const http = require('http')
const morgan = require('morgan') // logging library
const path = require('path')

// Initialization
const app = express()
const server = http.Server(app)

app.set('port', PORT)
app.use(morgan('dev'))

app.use('/dist', express.static(path.join(__dirname, '/dist')))

// 🚧  🚧 ROUTE 🚧  🚧  
app.get('', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist/index.html'))
})


//===== SOCKETS =====

const socketIO = require('socket.io')
const io = socketIO(server)

//---- Socket Manager ----
const CanvasClickSocketManager = require('./server/CanvasClickSocketManager');
const manager = new CanvasClickSocketManager();

io.on('connection', socket => {

  // 📥  📥 receiver 📥  📥  
  socket.on('new-client', (data, callback) => {
    manager.addNewPlayer(`player${Math.floor(Math.random()*200)}`, socket)
    callback('null');
  });

  // 📥  📥 receiver 📥  📥  
  socket.on('click-position', (data) => {
    console.log(`Click: ${data.x} ${data.y}`);
    console.log(JSON.stringify(data));
    manager.sendClickToClients(data);
  })
})


//----- LISTEN -----

server.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`)
})
