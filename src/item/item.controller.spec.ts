import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemType } from '@prisma/client';

describe('ItemController', () => {
  let itemController: ItemController;
  let itemService: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    itemController = module.get<ItemController>(ItemController);
    itemService = module.get<ItemService>(ItemService);
  });

  describe('create', () => {
    it('should create an item and return it', async () => {
      const data = {
        name: 'Water Bottle',
        description: 'A bottle of fresh water',
        type: ItemType.WATER,
      };
      const result = { id: 1, ...data };
      jest.spyOn(itemService, 'create').mockResolvedValue(result);

      expect(await itemController.create(data)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const result = [
        {
          id: 1,
          name: 'Water Bottle',
          description: 'A bottle of fresh water',
          type: ItemType.WATER,
        },
        {
          id: 2,
          name: 'Medkit',
          description: 'A first aid kit',
          type: ItemType.MEDICATION,
        },
      ];
      jest.spyOn(itemService, 'findAll').mockResolvedValue(result);

      expect(await itemController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single item by id', async () => {
      const result = {
        id: 1,
        name: 'Water Bottle',
        description: 'A bottle of fresh water',
        type: ItemType.WATER,
      };
      jest.spyOn(itemService, 'findOne').mockResolvedValue(result);

      expect(await itemController.findOne(1)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an item and return the updated item', async () => {
      const id = 1;
      const data = { name: 'Updated Water Bottle' };
      const result = {
        id,
        name: 'Updated Water Bottle',
        description: 'A bottle of fresh water',
        type: ItemType.WATER,
      };
      jest.spyOn(itemService, 'update').mockResolvedValue(result);

      expect(await itemController.update(id, data)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove an item and return the removed item', async () => {
      const id = 1;
      const result = {
        id,
        name: 'Water Bottle',
        description: 'A bottle of fresh water',
        type: ItemType.WATER,
      };
      jest.spyOn(itemService, 'remove').mockResolvedValue(result);

      expect(await itemController.remove(id)).toBe(result);
    });
  });
});
