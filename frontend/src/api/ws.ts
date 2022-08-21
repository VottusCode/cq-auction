import { AuctionItem } from "./ItemsRepository";
import EventEmitter from "eventemitter3";

export interface UpdateData {
    customMessage: string;
    currentItem: number | null;
    items: AuctionItem[];
}

export const WsEmits = {
    message: "message",
    json: "json",
};

export interface CreateWebSocket {
    socket: WebSocket;
    emitter: EventEmitter;
}

export const createWebSocket = (): CreateWebSocket => {
    const ws = new WebSocket("ws://127.0.0.1:3000/ws");

    const emitter = new EventEmitter();

    ws.addEventListener("message", (event) => {
        let msg: any = event.data;

        emitter.emit(WsEmits.message, event);

        try {
            msg = JSON.parse(event.data) as any;
            emitter.emit(WsEmits.json, msg);
        } catch (_) {
            return;
        }

        if (msg.type) {
            emitter.emit(msg.type, msg);
        }
    });

    return { socket: ws, emitter };
};
