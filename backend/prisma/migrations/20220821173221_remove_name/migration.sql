/*
  Warnings:

  - You are about to drop the column `name` on the `AuctionItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AuctionItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "donatedBy" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "currentPrice" INTEGER NOT NULL DEFAULT 0,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT NOT NULL DEFAULT 'placeholder.jpg'
);
INSERT INTO "new_AuctionItem" ("currentPrice", "description", "donatedBy", "id", "image", "sold") SELECT "currentPrice", "description", "donatedBy", "id", "image", "sold" FROM "AuctionItem";
DROP TABLE "AuctionItem";
ALTER TABLE "new_AuctionItem" RENAME TO "AuctionItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
