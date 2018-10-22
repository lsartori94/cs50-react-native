export default class Timer {
    constructor(duration, onTick, onEnd) {
        this.duration = duration
        this.onTick = onTick
        this.onEnd = onEnd
        this.end = Date.now() + duration
        this.tick()
    }

    get timeRemaining() {
        return this.end - Date.now()
    }

    get isRunning() {
        return !!this.end
    }

    clearTick = () => {
        clearTimeout(this.timeout)
        this.timeout = null
    }

    tick = () => {
        if (this.end < Date.now()) {
            this.onTick(0)
            this.onEnd()
        } else {
            this.onTick(this.timeRemaining)

            // account for delays
            const nextTick = this.timeRemaining % 1000

            this.timeout = setTimeout(this.tick, nextTick)
        }
    }

    stop = () => {
        if (!this.isRunning) {
            return
        }
        this.clearTick()
        this.duration = this.timeRemaining
        this.end = null
    }

    start = () => {
        if (this.isRunning) return
        this.end = Date.now() + this.duration
        this.tick()
    }
}
