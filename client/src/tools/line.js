import { canvasState } from "../store/canvasState";
import { wsState } from "../store/wsState";
import { Tool } from "./tool";

export class Line extends Tool {
    constructor() {
        super()
    }

    mouseUpHandler() {
        wsState.sendDraw({
            method: 'draw',
            figure: {
                type: 'line',
                startX: this.startX,
                startY: this.startY,
                endX: this.endX,
                endY: this.endY,
            }
        })
    }

    mouseMoveHandler(e) {
        this.endX = e.pageX - e.target.offsetLeft
        this.endY = e.pageY - e.target.offsetTop
        if (this.mouseDown) this._oneDraw()
    }

    draw() {
        canvasState.ctx.beginPath()
        canvasState.ctx.moveTo(this.startX, this.startY)
        canvasState.ctx.lineTo(this.endX, this.endY)
        canvasState.ctx.stroke()
    }

    static staticDraw({ fillStyle, strokeStyle, lineWidth, startX, startY, endX, endY }) {
        const settings = { lineWidth, fillStyle, strokeStyle }

        Tool.drawWithSetSettings(settings, () => {
            canvasState.ctx.beginPath()
            canvasState.ctx.moveTo(startX, startY)
            canvasState.ctx.lineTo(endX, endY)
            canvasState.ctx.stroke()
        })
    }
}