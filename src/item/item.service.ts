import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Item } from '@prisma/client';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new item
  async create(data: CreateItemDto): Promise<Item> {
    return this.prisma.item.create({
      data,
    });
  }

  // Get all items
  async findAll(): Promise<Item[]> {
    return this.prisma.item.findMany();
  }

  // Get item by ID
  async findOne(id: number): Promise<Item> {
    return this.prisma.item.findUnique({
      where: { id },
    });
  }

  // Update item
  async update(id: number, data: UpdateItemDto): Promise<Item> {
    return this.prisma.item.update({
      where: { id },
      data,
    });
  }

  // Delete item
  async remove(id: number): Promise<Item> {
    return this.prisma.item.delete({
      where: { id },
    });
  }
}
