import { makeAutoObservable } from 'mobx'

class CanvasState {
    canvas = null

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
    }

    fillColor(color) {
        this.ctx.fillStyle = color
    }

    strokeColor(color) {
        this.ctx.strokeStyle = color
    }

    lineWidth(width) {
        this.ctx.lineWidth = width
    }
}

export const canvasState = new CanvasState()