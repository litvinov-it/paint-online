import { canvasState } from "../store/canvasState";
import { wsState } from "../store/wsState";
import { Tool } from "./tool";

export class Circle extends Tool {
    constructor() {
        super()
    }

    mouseUpHandler() {
        wsState.sendDraw({
            method: 'draw',
            figure: {
                type: 'circle',
                startX: this.startX,
                startY: this.startY,
                radius: this.radius
            }
        })
    }

    mouseMoveHandler(e) {
        // Положение в котором курсор в моменте рисования
        let currentX = e.pageX - e.target.offsetLeft
        let currentY = e.pageY - e.target.offsetTop

        let width = currentX - this.startX
        let height = currentY - this.startY

        this.radius = Math.sqrt(width * width + height * height)

        this._oneDraw()
    }

    draw() {
        canvasState.ctx.beginPath()
        canvasState.ctx.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI, false)
        canvasState.ctx.fill()
        canvasState.ctx.stroke()
        canvasState.ctx.beginPath()
    }

    static staticDraw({ startX, startY, radius, fillStyle, strokeStyle, lineWidth }) {
        const settings = { lineWidth, fillStyle, strokeStyle }

        Tool.drawWithSetSettings(settings, () => {
            canvasState.ctx.beginPath()
            canvasState.ctx.arc(startX, startY, radius, 0, 2 * Math.PI, false)
            canvasState.ctx.fill()
            canvasState.ctx.stroke()
            canvasState.ctx.beginPath()
        })
    }

}