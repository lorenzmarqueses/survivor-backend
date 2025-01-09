// src/survivor/survivor.module.ts
import { Module } from '@nestjs/common';
import { SurvivorService } from './survivor.service';
import { SurvivorController } from './survivor.controller';
import { PrismaService } from '../prisma.service'; // Prisma service for DB interactions

@Module({
  imports: [], // Add other modules if needed (e.g., ItemModule, ReportModule)
  controllers: [SurvivorController],
  providers: [SurvivorService, PrismaService], // Add services here
})
export class SurvivorModule {}
