import { Tool } from "./tool";
import { wsState } from "../store/wsState";
import { canvasState } from "../store/canvasState";

export class Rectangle extends Tool {
    constructor() {
        super()
    }

    mouseUpHandler() {
        wsState.sendDraw({
            method: 'draw',
            figure: {
                type: 'rectangle',
                startX: this.startX,
                startY: this.startY,
                width: this.width,
                height: this.height
            }
        })
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop

            this.width = currentX - this.startX
            this.height = currentY - this.startY

            this._oneDraw()
        }
    }

    draw() {
        canvasState.ctx.beginPath()
        canvasState.ctx.rect(this.startX, this.startY, this.width, this.height)
        canvasState.ctx.fill()
        canvasState.ctx.stroke()
        canvasState.ctx.beginPath()
    }

    static staticDraw({ startX, startY, width, height, fillStyle, strokeStyle, lineWidth }) {
        const settings = { lineWidth, fillStyle, strokeStyle }

        Tool.drawWithSetSettings(settings, () => {
            canvasState.ctx.beginPath()
            canvasState.ctx.rect(startX, startY, width, height)
            canvasState.ctx.fill()
            canvasState.ctx.stroke()
            canvasState.ctx.beginPath()
        })
    }

}