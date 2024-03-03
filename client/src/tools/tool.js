import { canvasState } from "../store/canvasState"
import axios from 'axios'
import { wsState } from "../store/wsState"

export class Tool {

    /**
     * @param {Boolean} mouseDown - нажата ли ЛКМ || опущено ли перо
     * @param {Object} saved - для сохранения состояния холста
     * @param {Number} startX - координата Х старта рисования
     * @param {Number} startY - координата У старта рисования
     */

    mouseDown = false
    saved = null
    startX = 0
    startY = 0

    constructor() {
        this._listen()
    }

    _listen() {
        // Каждый раз при инициализации нового инструмента - переопределяем функционал
        canvasState.canvas.onmouseup = this._mouseUpHandler.bind(this)
        canvasState.canvas.onmousedown = this._mouseDownHandler.bind(this)
        canvasState.canvas.onmousemove = this._mouseMoveHandler.bind(this)
    }

    _mouseUpHandler(e) {
        if (this.mouseDown) {
            // Базовый функционал для всех инструментов
            this.mouseDown = false
            // Определяется каждым инструментом отдельно при необходимости
            if (this.mouseUpHandler) this.mouseUpHandler(e)
            // Сохранить изменения на сервере
            axios
                .post(`http://localhost:5000/image?sessionId=${wsState.sessionId}`, {
                    image: canvasState.canvas.toDataURL(),
                })
        }
    }

    _mouseDownHandler(e) {
        // Базовый функционал для всех инструментов
        this.mouseDown = true
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = canvasState.canvas.toDataURL()
        // Определяется каждым инструментом отдельно при необходимости
        if (this.mouseDownHandler) this.mouseDownHandler(e)
    }

    _mouseMoveHandler(e) {
        if (this.mouseDown) {
            // Определяется каждым инструментом отдельно при необходимости
            if (this.mouseMoveHandler) this.mouseMoveHandler(e)
        }
    }

    /**
     * Чистит холст до начала рисования фигуры и рисует то, что сейчас рисуется.
     * Это костыль для правильного отображения и рисования фигур
     */
    _oneDraw() {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            canvasState.ctx.clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height)
            canvasState.ctx.drawImage(img, 0, 0, canvasState.canvas.width, canvasState.canvas.height)
            // Рисуем
            this._draw()
        }
    }

    _draw() {
        // Определяется каждым инструментом отдельно при необходимости
        if (this.draw) this.draw()
    }

    static drawWithSetSettings(settings, draw) {
        // Сохраняем наши настройки
        const fillStyleLast = canvasState.ctx.fillStyle
        const strokeStyleLast = canvasState.ctx.strokeStyle
        const lineWidthLast = canvasState.ctx.lineWidth
        // Ставим временно нужные настройки чтобы отрисовать новый элемент
        canvasState.fillColor(settings.fillStyle)
        canvasState.strokeColor(settings.strokeStyle)
        canvasState.lineWidth(settings.lineWidth)
        // Рисуем
        draw()
        // Возвращаем наши настройки в исходное состояние
        canvasState.fillColor(fillStyleLast)
        canvasState.strokeColor(strokeStyleLast)
        canvasState.lineWidth(lineWidthLast)
    }
}