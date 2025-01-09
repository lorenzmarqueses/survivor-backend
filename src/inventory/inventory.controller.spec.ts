import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

describe('InventoryController', () => {
  let inventoryController: InventoryController;
  let inventoryService: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: InventoryService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            tradeItems: jest.fn(),
          },
        },
      ],
    }).compile();

    inventoryController = module.get<InventoryController>(InventoryController);
    inventoryService = module.get<InventoryService>(InventoryService);
  });

  describe('create', () => {
    it('should create an inventory item', async () => {
      const data = { survivorId: 1, itemId: 2, quantity: 5 };
      const result = { id: 1, ...data };
      jest.spyOn(inventoryService, 'create').mockResolvedValue(result);

      expect(await inventoryController.create(data)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of inventory items', async () => {
      const result = [
        { id: 1, survivorId: 1, itemId: 2, quantity: 5 },
        { id: 2, survivorId: 2, itemId: 3, quantity: 3 },
      ];
      jest.spyOn(inventoryService, 'findAll').mockResolvedValue(result);

      expect(await inventoryController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single inventory item', async () => {
      const result = { id: 1, survivorId: 1, itemId: 2, quantity: 5 };
      jest.spyOn(inventoryService, 'findOne').mockResolvedValue(result);

      expect(await inventoryController.findOne(1)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update the inventory item', async () => {
      const id = 1;
      const data = { quantity: 10 };
      const result = { id, survivorId: 1, itemId: 2, quantity: 10 };
      jest.spyOn(inventoryService, 'update').mockResolvedValue(result);

      expect(await inventoryController.update(id, data)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove the inventory item', async () => {
      const id = 1;
      const result = { id, survivorId: 1, itemId: 2, quantity: 5 };
      jest.spyOn(inventoryService, 'remove').mockResolvedValue(result);

      expect(await inventoryController.remove(id)).toBe(result);
    });
  });

  describe('tradeItems', () => {
    it('should trade items between survivors', async () => {
      const data = {
        survivorFromId: 1,
        survivorToId: 2,
        itemId: 3,
        quantity: 2,
      };
      const result = { message: 'Trade successful' };
      jest.spyOn(inventoryService, 'tradeItems').mockResolvedValue(result);

      expect(await inventoryController.tradeItems(data)).toBe(result);
    });
  });
});
