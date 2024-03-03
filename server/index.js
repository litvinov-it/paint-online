const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWSS = WSServer.getWss()
const cors = require('cors')
const { postIdRoom } = require('./api/id-room')
const { postImage, getImage } = require('./api/image')

const PORT = 5000

app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {

    ws.on('message', message => {
        message = JSON.parse(message)

        switch (message.method) {
            case 'connection':
                connectionHandler(ws, message)
                break
            case 'draw':
                broadcastMessage(ws, message)
                break
        }
    })

})

app.get('/id-room', (req, res) => postIdRoom(req, res, aWSS))
app.post('/image', postImage)
app.get('/image', getImage)

app.listen(PORT, () => console.log('Server started on PORT:', PORT))

const connectionHandler = (ws, message) => {
    ws.id = message.id;
    broadcastMessage(ws, message)
}

const broadcastMessage = (ws, msg) => {
    aWSS.clients.forEach(client => {
        if (client.id === ws.id) {
            client.send(JSON.stringify(msg))
        }
    })
}