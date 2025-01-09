import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Inventory } from '@prisma/client';
import { TradeLogService } from 'src/trade-log/trade-log.service';

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tradeLogService: TradeLogService,
  ) {}

  // Create an inventory entry
  async create(data: {
    survivorId: number;
    itemId: number;
    quantity: number;
  }): Promise<Inventory> {
    return this.prisma.inventory.create({
      data,
    });
  }

  // Get all inventory items
  async findAll(): Promise<Inventory[]> {
    return this.prisma.inventory.findMany();
  }

  // Get inventory by ID
  async findOne(id: number): Promise<Inventory> {
    return this.prisma.inventory.findUnique({
      where: { id },
    });
  }

  // Update inventory
  async update(id: number, data: { quantity?: number }): Promise<Inventory> {
    return this.prisma.inventory.update({
      where: { id },
      data,
    });
  }

  // Delete inventory entry
  async remove(id: number): Promise<Inventory> {
    return this.prisma.inventory.delete({
      where: { id },
    });
  }

  // Trade items between two survivors
  async tradeItems(
    survivorFromId: number,
    survivorToId: number,
    itemId: number,
    quantity: number,
  ): Promise<any> {
    // Subtract quantity from survivorFrom
    await this.prisma.inventory.updateMany({
      where: {
        survivorId: survivorFromId,
        itemId: itemId,
      },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });

    // Add quantity to survivorTo
    await this.prisma.inventory.upsert({
      where: {
        survivorId_itemId: {
          survivorId: survivorToId,
          itemId: itemId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        survivorId: survivorToId,
        itemId: itemId,
        quantity: quantity,
      },
    });

    // Log the trade
    await this.tradeLogService.logTrade(
      survivorFromId,
      survivorToId,
      itemId,
      quantity,
    );

    return { message: 'Trade successful' };
  }
}
