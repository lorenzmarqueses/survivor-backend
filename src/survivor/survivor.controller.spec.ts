import { Test, TestingModule } from '@nestjs/testing';
import { SurvivorController } from './survivor.controller';
import { SurvivorService } from './survivor.service';
import { create } from 'domain';

describe('SurvivorController', () => {
  let survivorController: SurvivorController;
  let survivorService: SurvivorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurvivorController],
      providers: [
        {
          provide: SurvivorService,
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

    survivorController = module.get<SurvivorController>(SurvivorController);
    survivorService = module.get<SurvivorService>(SurvivorService);
  });

  describe('create', () => {
    it('should create a survivor and return the created survivor', async () => {
      const data = {
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        latitude: 10.12345,
        longitude: 20.12345,
        infected: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = { id: 1, ...data };
      jest.spyOn(survivorService, 'create').mockResolvedValue(result);

      expect(await survivorController.create(data)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of survivors', async () => {
      const result = [
        {
          id: 1,
          name: 'John Doe',
          age: 30,
          gender: 'Male',
          latitude: 10.12345,
          longitude: 20.12345,
          infected: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Jane Doe',
          age: 28,
          gender: 'Female',
          latitude: 11.12345,
          longitude: 21.12345,
          infected: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(survivorService, 'findAll').mockResolvedValue(result);

      expect(await survivorController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single survivor by id', async () => {
      const result = {
        id: 1,
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        latitude: 10.12345,
        longitude: 20.12345,
        infected: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(survivorService, 'findOne').mockResolvedValue(result);

      expect(await survivorController.findOne(1)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a survivor and return the updated survivor', async () => {
      const id = 1;
      const data = { name: 'John Updated' };
      const result = {
        id,
        name: 'John Updated',
        age: 30,
        gender: 'Male',
        latitude: 10.12345,
        longitude: 20.12345,
        infected: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(survivorService, 'update').mockResolvedValue(result);

      expect(await survivorController.update(id, data)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a survivor and return the removed survivor', async () => {
      const id = 1;
      const result = {
        id,
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        latitude: 10.12345,
        longitude: 20.12345,
        infected: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(survivorService, 'remove').mockResolvedValue(result);

      expect(await survivorController.remove(id)).toBe(result);
    });
  });
});
