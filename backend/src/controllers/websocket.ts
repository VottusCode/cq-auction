import fp from "fastify-plugin";
import { $s } from "../container";
import { $emitter, Emits } from "../data/emitter";

export const websocketController = fp(async (app) => {
    const db = $s("db");
    const globals = $s("globals")

    app.get('/ws', { websocket: true }, (connection, req) => {
        const fetchData = async () => ({
            customMessage: globals.getCustomMessage() ?? "",
            items: await db.auctionItem.findMany({ orderBy: {
                id: "asc"
            } }),
            currentItem: globals.getCurrentItem(),
        });

        connection.socket.on('message', async (message) => {
            if (message.toString() === "update") {
                connection.socket.send(JSON.stringify({
                    type: "update",
                    ...await fetchData()
                }));
            }
        })

        $emitter.on(Emits.update, async () => {
            connection.socket.send(JSON.stringify({
                type: "update",
                ...await fetchData()
            }));
        });
      })
});
