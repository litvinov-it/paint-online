import { canvasState } from "../store/canvasState";
import { wsState } from "../store/wsState";
import { Tool } from "./tool";

export class Eraser extends Tool {
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
                type: 'eraser',
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop,
            }
        })
    }

    static erase({ x, y, lineWidth }) {
        canvasState.ctx.clearRect(x, y, lineWidth, lineWidth)
    }

}