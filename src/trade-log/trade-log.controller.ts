// src/trade-log/trade-log.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TradeLogService } from './trade-log.service';
import { CreateTradeLogDto } from './dto/create-trade-log.dto';

@Controller('api/trade-logs')
export class TradeLogController {
  constructor(private readonly tradeLogService: TradeLogService) {}

  // Endpoint to log a trade
  @Post()
  logTrade(
    @Body()
    data: CreateTradeLogDto,
  ) {
    return this.tradeLogService.logTrade(
      data.survivorFromId,
      data.survivorToId,
      data.itemId,
      data.quantity,
    );
  }

  // Endpoint to get all trade logs
  @Get()
  getTradeLogs() {
    return this.tradeLogService.getTradeLogs();
  }
}
