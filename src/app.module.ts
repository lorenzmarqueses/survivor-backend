import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { InventoryModule } from './inventory/inventory.module';
import { ItemModule } from './item/item.module';
import { ReportModule } from './report/report.module';
import { SurvivorModule } from './survivor/survivor.module';
import { TradeLogModule } from './trade-log/trade-log.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SurvivorModule,
    ItemModule,
    InventoryModule,
    ReportModule,
    TradeLogModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
