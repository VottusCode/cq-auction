import fp from "fastify-plugin";
import { $s } from "../container";

export const biddingController = fp(async (app) => {
    const globals = $s("globals");
    const db = $s("db");

    app.post<{ Body: { itemId: number } }>("/item", async (req, res) => {
        const itemId = req.body.itemId;

        const item = await db.auctionItem.findUnique({
            where: {
                id: itemId,
            },
        });

        if (!item) {
            return res.status(400).send({
                error: "Invalid item",
            });
        }

        globals.setCurrentItem(item.id);

        res.send({
            item,
        });
    });

    app.post("/set-sold", async (_, res) => {
        const currentItemId = globals.getCurrentItem();

        if (!currentItemId) {
            return res.send({
                error: "No item on display",
            });
        }

        const item = await db.auctionItem.update({
            where: {
                id: currentItemId,
            },
            data: {
                sold: true,
            },
        });

        res.send({
            item
        }) 
    });
});
