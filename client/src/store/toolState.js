import { makeAutoObservable } from 'mobx'

class ToolState {
    tool = null
    toolType = null

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool
        this.toolType = tool.constructor.name
    }

    setFillColor(color) {
        this.tool.fillColor = color
    }

    setStrokeColor(color) {
        this.tool.strokeColor = color
    }

    setLineWidth(width) {
        this.tool.lineWidth = width
    }

}

export const toolState = new ToolState()
