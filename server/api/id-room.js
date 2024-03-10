function postIdRoom(req, res, aWSS) {
    if(!req.query.id) return res.status(400).json({ message: 'not id param' })
    const id = req.query.id
    const clients = Array.from(aWSS.clients)
    const isRoom = clients.some(client => client.id === id)
    return res.send({ isRoom: isRoom })
}

module.exports = { postIdRoom };