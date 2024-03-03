function postIdRoom(req, res, aWSS) {
    if(!req.query.id) res.status(400).json({ message: 'not id param' })
    const id = req.query.id
    const clients = Array.from(aWSS.clients)
    const isRoom = clients.some(client => client.id === id)
    res.send({ isRoom: isRoom })
}

module.exports = { postIdRoom };