import { makeAutoObservable } from 'mobx'
import { canvasState } from './canvasState'

class WsState {
    sessionId = null // id сессии/комнаты
    ws = null // Наше соединение

    constructor() {
        makeAutoObservable(this) // Инициализация отслеживания изменений
        this.initWS(`ws://localhost:5000`) // Инициализация WebSocket соединения
    }

    /**
     * Инициализация WebSocket соединения
     *
     * @param {string} path - путь для соединения
     * @return {void} 
     * 
     */
    initWS(path) {
        this.ws = new WebSocket(path)
        this.ws.onopen = () => console.log("connected server WS")
        this.ws.onclose = () => console.log("disconnected server WS")
    }

    /**
     * Установить id сессии.
     *
     * @param {type} sessionId - идентификатор сессии, который нужно установить
     * @return {void} 
     * 
     */
    setSessionId(sessionId) {
        this.sessionId = sessionId
    }

    /**
     * Отправить сообщение на сервер
     *
     * @param {type} msg - сообщение
     * @return {void} 
     * 
     */
    send(msg) {
        msg.id = this.sessionId
        wsState.ws.send(JSON.stringify(msg))
    }

    /**
     * Отправить сообщение на сервер с настройками для рисования
     *
     * @param {type} msg - сообщение
     * @return {void} 
     * 
     */
    sendDraw(msg) {
        // Устанавливаем настройки рисования
        msg.figure.fillStyle = canvasState.ctx.fillStyle
        msg.figure.strokeStyle = canvasState.ctx.strokeStyle
        msg.figure.lineWidth = canvasState.ctx.lineWidth
        this.send(msg)
    }

    /**
     * Устанавливает обратный вызов для обработки входящих сообщений.
     *
     * @param {function} callback - Функция для обработки входящих сообщений
     */
    onMessage(callback) {
        this.ws.onmessage = callback
    }
}

export const wsState = new WsState()