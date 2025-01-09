// src/trade-log/trade-log.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TradeLog } from '@prisma/client';

@Injectable()
export class TradeLogService {
  constructor(private readonly prisma: PrismaService) {}

  // Log a trade between two survivors
  async logTrade(
    survivorFromId: number,
    survivorToId: number,
    itemId: number,
    quantity: number,
  ): Promise<TradeLog> {
    return this.prisma.tradeLog.create({
      data: {
        survivorFrom: survivorFromId,
        survivorTo: survivorToId,
        itemId,
        quantity,
      },
    });
  }

  // Get all trade logs
  async getTradeLogs(): Promise<TradeLog[]> {
    return this.prisma.tradeLog.findMany({
      include: {
        survivorFromRel: true,
        survivorToRel: true,
        item: true,
      },
    });
  }
}
