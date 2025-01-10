/*
  Warnings:

  - You are about to drop the column `options` on the `Item` table. All the data in the column will be lost.
  - Added the required column `type` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "options",
ADD COLUMN     "type" "ItemType" NOT NULL;
