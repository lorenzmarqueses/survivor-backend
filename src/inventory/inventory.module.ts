// src/inventory/inventory.module.ts
import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TradeLogService } from '../trade-log/trade-log.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [InventoryController],
  providers: [InventoryService, TradeLogService, PrismaService],
})
export class InventoryModule {}
