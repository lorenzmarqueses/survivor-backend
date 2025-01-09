-- CreateTable
CREATE TABLE "TradeLog" (
    "id" SERIAL NOT NULL,
    "survivorFrom" INTEGER NOT NULL,
    "survivorTo" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TradeLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TradeLog" ADD CONSTRAINT "TradeLog_survivorFrom_fkey" FOREIGN KEY ("survivorFrom") REFERENCES "Survivor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeLog" ADD CONSTRAINT "TradeLog_survivorTo_fkey" FOREIGN KEY ("survivorTo") REFERENCES "Survivor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeLog" ADD CONSTRAINT "TradeLog_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
