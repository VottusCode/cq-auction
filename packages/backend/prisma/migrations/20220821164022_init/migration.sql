-- CreateTable
CREATE TABLE "AuctionItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "donatedBy" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "currentPrice" INTEGER NOT NULL DEFAULT 0,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT NOT NULL DEFAULT 'placeholder.jpg'
);
