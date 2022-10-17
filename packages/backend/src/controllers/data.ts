import fp from "fastify-plugin";
import { $s } from "../container";

export const dataController = fp(async (app) => {
    const globals = $s("globals");

    app.post<{ Body: { customMessage: string } }>("/set-message", async (req, res) => {
        const customMessage = req.body.customMessage;

        globals.setCustomMessage(customMessage);

        res.send({
            customMessage,
        });
    });
});
