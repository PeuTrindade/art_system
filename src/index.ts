import express from 'express'
import bodyParser from 'body-parser'
import { routes } from './routes'
import { Server } from 'socket.io';
import cors from 'cors'

const app = express()

app.use(cors())

const http = require('http').createServer(app)
const ioServer = new Server(http)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)


const port = 3200
const socketPort = 3999

ioServer.on('connection', (socket) => {
  socket.on('chat', (data) => {
    ioServer.emit('message', data)
  })
})

http.listen(socketPort, () => {
  return console.log(`Socket server is running on port ${socketPort}!`)
})

app.listen(port, () => {
  return console.log(`Server is running on port ${port}!`)
})