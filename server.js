

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


//----- LISTEN -----

server.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`)
})
