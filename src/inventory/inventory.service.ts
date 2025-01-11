import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Inventory } from '@prisma/client';
import { TradeLogService } from '../trade-log/trade-log.service';
import { PaginationDto } from 'src/types/pagination-dto';
import { FindAllSurvivorsInventoryResponse } from 'src/survivor/dto/find-all-survivors-inventory-response.dto';
import { SetInventoryDto } from './dto/set-inventory.dto';

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

  // Get all survivors with their inventory
  async findAllSurvivorsWithInventory(
    paginationDto: PaginationDto,
  ): Promise<FindAllSurvivorsInventoryResponse> {
    const survivorsInventory = await this.prisma.survivor.findMany({
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit,
      include: {
        inventory: {
          include: {
            item: true, // Include the item details in the inventory
          },
        },
      },
    });

    const inventoryCount = await this.prisma.inventory.count();

    const total = await this.prisma.survivor.count();

    return {
      data: {
        survivorsInventory,
        inventoryCount,
      },
      total,
      page: paginationDto.page,
      limit: paginationDto.limit,
    };
  }

  // Get inventory by ID
  async findOne(id: number): Promise<Inventory> {
    return this.prisma.inventory.findUnique({
      where: { id },
    });
  }

  // Set inventory for a survivor
  async setInventory(data: SetInventoryDto): Promise<Inventory> {
    const { survivorId, itemId, quantity } = data;

    // Perform an upsert operation
    return this.prisma.inventory.upsert({
      where: {
        survivorId_itemId: {
          survivorId,
          itemId,
        },
      },
      update: {
        quantity,
      },
      create: {
        survivorId,
        itemId,
        quantity, // Create a new entry if it doesn't exist
      },
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
