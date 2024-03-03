import { makeAutoObservable } from 'mobx'
import { canvasState } from './canvasState'

class WsState {
    sessionId = null

    constructor() {
        makeAutoObservable(this)

        this.ws = new WebSocket(`ws://localhost:5000`)
        this.ws.onopen = () => console.log("connection server WS")
        this.ws.onclose = () => console.log("disconnected server WS")
    }

    setSessionId(sessionId) {
        this.sessionId = sessionId
    }

    send(msg) {
        msg.id = this.sessionId
        wsState.ws.send(JSON.stringify(msg))
    }

    sendDraw(msg) {
        msg.figure.fillStyle = canvasState.ctx.fillStyle
        msg.figure.strokeStyle = canvasState.ctx.strokeStyle
        msg.figure.lineWidth= canvasState.ctx.lineWidth
        this.send(msg)
    }

    onMessage(callback) {
        wsState.ws.onmessage = callback
    }
}

export const wsState = new WsState()