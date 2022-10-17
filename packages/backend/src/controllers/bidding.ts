import fp from "fastify-plugin";
import { $s } from "../container";

export const biddingController = fp(async (app) => {
  const globals = $s("globals");
  const db = $s("db");

  app.post<{ Body: { itemId: number } }>("/current-item", async (req, res) => {
    const itemId = req.body.itemId;

    if (itemId) {
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

      return res.send({
        item,
      });
    }

    globals.setCurrentItem(null);

    res.send({
      item: null,
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

    globals.setCurrentItem(null);

    res.send({
      item,
    });
  });
});
