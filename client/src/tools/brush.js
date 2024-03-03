import { wsState } from "../store/wsState";
import { Tool } from "./tool";
import { canvasState } from "../store/canvasState";

export class Brush extends Tool {
    constructor() {
        super()
    }

    mouseUpHandler() {
        wsState.send({
            method: 'draw',
            figure: {
                type: 'finish',
            }
        })
    }

    mouseMoveHandler(e) {
        wsState.sendDraw({
            method: 'draw',
            figure: {
                type: 'brush',
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop,
            }
        })
    }

    draw() {
        canvasState.ctx.lineTo(this.startX, this.startY)
        canvasState.ctx.stroke()
    }

    static staticDraw({fillStyle, strokeStyle, lineWidth, x, y}) {
        const settings = { lineWidth, fillStyle, strokeStyle }

        Tool.drawWithSetSettings(settings, () => {
            canvasState.ctx.lineTo(x, y)
        canvasState.ctx.stroke()
        })
    }

}