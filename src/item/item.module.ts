// src/item/item.module.ts
import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [ItemController],
  providers: [ItemService, PrismaService],
})
export class ItemModule {}
