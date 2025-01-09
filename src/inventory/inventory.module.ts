// src/inventory/inventory.module.ts
import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PrismaService } from '../prisma.service';
import { TradeLogService } from 'src/trade-log/trade-log.service';

@Module({
  imports: [],
  controllers: [InventoryController],
  providers: [InventoryService, TradeLogService, PrismaService],
})
export class InventoryModule {}
