import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { registerContainerServices } from "contairy";
import { itemsController } from "./controllers/items";
import fastifyWebsocket from "@fastify/websocket";
import { dataController } from "./controllers/data";
import { websocketController } from "./controllers/websocket";
import cors from "@fastify/cors";
import { Globals } from "./data/globals";
import { biddingController } from "./controllers/bidding";

const db = new PrismaClient();
const server = fastify();
const globals = new Globals();

registerContainerServices({
    db,
    server,
    globals,
});

server.register(cors, {
    origin: "*",
});

server.setErrorHandler((err, req, res) => {
    console.log(err);

    res.send({ message: err.message });
});

server.register(fastifyWebsocket, {
    options: {
        maxPayload: 1048576,
    },
});

server.register(itemsController);
server.register(dataController);
server.register(biddingController);
server.register(websocketController);

server
    .listen({
        port: 3000,
        host: "127.0.0.1",
    })
    .then((s) => console.log("Server started", s));
