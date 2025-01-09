import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { PrismaService } from '../prisma.service';
import { TradeLogService } from '../trade-log/trade-log.service';

describe('InventoryService', () => {
  let inventoryService: InventoryService;
  let prismaService: PrismaService;
  let tradeLogService: TradeLogService;

  const mockPrismaService = {
    inventory: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      updateMany: jest.fn(),
      upsert: jest.fn(),
    },
  };

  const mockTradeLogService = {
    logTrade: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: TradeLogService, useValue: mockTradeLogService },
      ],
    }).compile();

    inventoryService = module.get<InventoryService>(InventoryService);
    prismaService = module.get<PrismaService>(PrismaService);
    tradeLogService = module.get<TradeLogService>(TradeLogService);
  });

  describe('create', () => {
    it('should create a new inventory entry', async () => {
      const data = { survivorId: 1, itemId: 1, quantity: 10 };
      const createdInventory = { id: 1, ...data };
      mockPrismaService.inventory.create.mockResolvedValue(createdInventory);

      const result = await inventoryService.create(data);

      expect(result).toEqual(createdInventory);
      expect(mockPrismaService.inventory.create).toHaveBeenCalledWith({ data });
    });
  });

  describe('findAll', () => {
    it('should return all inventory items', async () => {
      const inventoryList = [{ id: 1, survivorId: 1, itemId: 1, quantity: 10 }];
      mockPrismaService.inventory.findMany.mockResolvedValue(inventoryList);

      const result = await inventoryService.findAll();

      expect(result).toEqual(inventoryList);
      expect(mockPrismaService.inventory.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an inventory item by ID', async () => {
      const inventoryItem = { id: 1, survivorId: 1, itemId: 1, quantity: 10 };
      mockPrismaService.inventory.findUnique.mockResolvedValue(inventoryItem);

      const result = await inventoryService.findOne(1);

      expect(result).toEqual(inventoryItem);
      expect(mockPrismaService.inventory.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update the inventory item quantity', async () => {
      const updatedData = { quantity: 15 };
      const updatedInventory = {
        id: 1,
        survivorId: 1,
        itemId: 1,
        quantity: 15,
      };
      mockPrismaService.inventory.update.mockResolvedValue(updatedInventory);

      const result = await inventoryService.update(1, updatedData);

      expect(result).toEqual(updatedInventory);
      expect(mockPrismaService.inventory.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatedData,
      });
    });
  });

  describe('remove', () => {
    it('should remove an inventory entry by ID', async () => {
      const deletedInventory = {
        id: 1,
        survivorId: 1,
        itemId: 1,
        quantity: 10,
      };
      mockPrismaService.inventory.delete.mockResolvedValue(deletedInventory);

      const result = await inventoryService.remove(1);

      expect(result).toEqual(deletedInventory);
      expect(mockPrismaService.inventory.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('tradeItems', () => {
    it('should successfully trade items between survivors', async () => {
      const survivorFromId = 1;
      const survivorToId = 2;
      const itemId = 1;
      const quantity = 5;

      const tradeMessage = { message: 'Trade successful' };

      mockPrismaService.inventory.updateMany.mockResolvedValue({ count: 1 });
      mockPrismaService.inventory.upsert.mockResolvedValue({
        id: 2,
        survivorId: survivorToId,
        itemId,
        quantity,
      });
      mockTradeLogService.logTrade.mockResolvedValue(true);

      const result = await inventoryService.tradeItems(
        survivorFromId,
        survivorToId,
        itemId,
        quantity,
      );

      expect(result).toEqual(tradeMessage);
      expect(mockPrismaService.inventory.updateMany).toHaveBeenCalledWith({
        where: { survivorId: survivorFromId, itemId: itemId },
        data: { quantity: { decrement: quantity } },
      });
      expect(mockPrismaService.inventory.upsert).toHaveBeenCalledWith({
        where: {
          survivorId_itemId: { survivorId: survivorToId, itemId: itemId },
        },
        update: { quantity: { increment: quantity } },
        create: {
          survivorId: survivorToId,
          itemId: itemId,
          quantity: quantity,
        },
      });
      expect(mockTradeLogService.logTrade).toHaveBeenCalledWith(
        survivorFromId,
        survivorToId,
        itemId,
        quantity,
      );
    });
  });
});
