// src/trade-log/trade-log.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TradeLogService } from './trade-log.service';
import { TradeLogController } from './trade-log.controller';

@Module({
  imports: [],
  controllers: [TradeLogController],
  providers: [TradeLogService, PrismaService],
})
export class TradeLogModule {}
