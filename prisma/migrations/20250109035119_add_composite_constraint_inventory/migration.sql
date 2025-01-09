/*
  Warnings:

  - A unique constraint covering the columns `[survivorId,itemId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inventory_survivorId_itemId_key" ON "Inventory"("survivorId", "itemId");
