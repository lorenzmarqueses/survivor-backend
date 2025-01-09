import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InventoryModule } from './inventory/inventory.module';
import { ItemModule } from './item/item.module';
import { ReportModule } from './report/report.module';
import { SurvivorModule } from './survivor/survivor.module';
import { TradeLogService } from './trade-log/trade-log.service';
import { TradeLogController } from './trade-log/trade-log.controller';
import { TradeLogModule } from './trade-log/trade-log.module';
import { AppService } from './app.service';

@Module({
  imports: [
    SurvivorModule,
    ItemModule,
    InventoryModule,
    ReportModule,
    TradeLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
