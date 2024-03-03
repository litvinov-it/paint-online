const fs = require('fs')
const path = require('path')

const canvasFormat = 'data:image/png;base64,'
const format = 'base64'

function postImage(req, res) {
    try {
        if(!req.query.sessionId || !req.body.image) return res.status(400).json({ message: 'not sessionId or image params' })
        const pathFile = getPath(req.query.sessionId)
        const data = req.body.image.replace(canvasFormat, '')
        fs.writeFileSync(pathFile, data, 'base64')
        return res.json({ message: 'Загружено' })
    } catch (error) {
        return res.status(500).json(error)
    }
}

function getImage(req, res) {
    try {
        if(!req.query.sessionId) res.status(400).json({ message: 'not sessionId param' })
        const pathFile = getPath(req.query.sessionId)
        if (!fs.existsSync(pathFile)) return res.json({ message: 'file not exist' })
        const file = fs.readFileSync(pathFile)
        const data = canvasFormat + file.toString(format)
        return res.json({ image: data })
    } catch (error) {
        return res.status(500).json(error)
    }
}

function getPath(sessionId) {
    return path.resolve(__dirname, 'files', `${sessionId}.png`)
}

module.exports = { postImage, getImage };