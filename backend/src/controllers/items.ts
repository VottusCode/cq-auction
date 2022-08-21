import { Prisma } from "@prisma/client";
import fp from "fastify-plugin";
import { $s } from "../container";
import { $emitter } from "../data/emitter";

export const itemsController = fp(async (app) => {
    const db = $s("db");
    const globals = $s("globals");

    app.get("/items", async (_, res) =>
        res.send({
            items: db.auctionItem.findMany(),
        })
    );

    app.put<{ Body: Prisma.AuctionItemCreateInput }>("/item", async (req, res) => {
        const item = await db.auctionItem.create({
            data: req.body,
        });

        $emitter.emitUpdate();

        res.send({
            item,
        });
    });

    app.post<{ Body: Prisma.AuctionItemUpdateInput; Params: { id: number | string } }>(
        "/item/:id",
        async (req, res) => {
            const data = req.body;

            const item = await db.auctionItem.update({
                where: {
                    id: typeof req.params.id !== "number" ? parseInt(req.params.id) : req.params.id,
                },
                data,
            });

            $emitter.emitUpdate();

            res.send({
                item,
            });
        }
    );

    app.delete<{ Params: { id: number | string } }>("/item/:id", async (req, res) => {
        const item = await db.auctionItem.delete({
            where: {
                id: typeof req.params.id !== "number" ? parseInt(req.params.id) : req.params.id,
            },
        });

        if (item.id === globals.getCurrentItem()) {
            globals.setCurrentItem(null);
        }

        $emitter.emitUpdate();

        res.send({
            item,
        });
    });
});
