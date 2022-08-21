import { EventEmitter } from "eventemitter3";

export const Emits = {
    update: "update"
}

export class Emitter extends EventEmitter {
    async emitUpdate() {
        return this.emit(Emits.update)
    }
}

export const $emitter = new Emitter();