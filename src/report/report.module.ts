// src/report/report.module.ts
import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [ReportController],
  providers: [ReportService, PrismaService],
})
export class ReportModule {}
