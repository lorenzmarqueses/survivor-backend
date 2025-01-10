import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { PrismaService } from '../prisma.service';
import { ItemType } from '@prisma/client';

describe('ItemService', () => {
  let itemService: ItemService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    item: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    itemService = module.get<ItemService>(ItemService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new item', async () => {
      const data = {
        name: 'Water',
        description: 'Clean water',
        type: ItemType.WATER,
      };
      const createdItem = { id: 1, ...data };
      mockPrismaService.item.create.mockResolvedValue(createdItem);

      const result = await itemService.create(data);

      expect(result).toEqual(createdItem);
      expect(mockPrismaService.item.create).toHaveBeenCalledWith({ data });
    });
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      const itemsList = [
        { id: 1, name: 'Water', description: 'Clean water', type: 'WATER' },
      ];
      mockPrismaService.item.findMany.mockResolvedValue(itemsList);

      const result = await itemService.findAll();

      expect(result).toEqual(itemsList);
      expect(mockPrismaService.item.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an item by ID', async () => {
      const item = {
        id: 1,
        name: 'Water',
        description: 'Clean water',
        type: 'WATER',
      };
      mockPrismaService.item.findUnique.mockResolvedValue(item);

      const result = await itemService.findOne(1);

      expect(result).toEqual(item);
      expect(mockPrismaService.item.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updatedData = {
        name: 'Updated Water',
        description: 'Filtered water',
      };
      const updatedItem = {
        id: 1,
        name: 'Updated Water',
        description: 'Filtered water',
        type: ItemType.WATER,
      };
      mockPrismaService.item.update.mockResolvedValue(updatedItem);

      const result = await itemService.update(1, updatedData);

      expect(result).toEqual(updatedItem);
      expect(mockPrismaService.item.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatedData,
      });
    });
  });

  describe('remove', () => {
    it('should remove an item by ID', async () => {
      const deletedItem = {
        id: 1,
        name: 'Water',
        description: 'Clean water',
        type: ItemType.WATER,
      };
      mockPrismaService.item.delete.mockResolvedValue(deletedItem);

      const result = await itemService.remove(1);

      expect(result).toEqual(deletedItem);
      expect(mockPrismaService.item.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
