import { Test, TestingModule } from '@nestjs/testing';
import { SurvivorService } from './survivor.service';
import { PrismaService } from '../prisma.service';

describe('SurvivorService', () => {
  let survivorService: SurvivorService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    survivor: {
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
        SurvivorService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    survivorService = module.get<SurvivorService>(SurvivorService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new survivor', async () => {
      const survivorData = {
        name: 'John Doe',
        age: 30,
        gender: 'male',
        latitude: 35.6895,
        longitude: 139.6917,
      };
      const createdSurvivor = { id: 1, ...survivorData };
      mockPrismaService.survivor.create.mockResolvedValue(createdSurvivor);

      const result = await survivorService.create(survivorData);

      expect(result).toEqual(createdSurvivor);
      expect(mockPrismaService.survivor.create).toHaveBeenCalledWith({
        data: survivorData,
      });
    });
  });

  describe('findAll', () => {
    it('should return all survivors', async () => {
      const survivors = [
        {
          id: 1,
          name: 'John Doe',
          age: 30,
          gender: 'male',
          latitude: 35.6895,
          longitude: 139.6917,
        },
      ];
      mockPrismaService.survivor.findMany.mockResolvedValue(survivors);

      const result = await survivorService.findAll();

      expect(result).toEqual(survivors);
      expect(mockPrismaService.survivor.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a survivor by ID', async () => {
      const survivor = {
        id: 1,
        name: 'John Doe',
        age: 30,
        gender: 'male',
        latitude: 35.6895,
        longitude: 139.6917,
      };
      mockPrismaService.survivor.findUnique.mockResolvedValue(survivor);

      const result = await survivorService.findOne(1);

      expect(result).toEqual(survivor);
      expect(mockPrismaService.survivor.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null if no survivor is found', async () => {
      mockPrismaService.survivor.findUnique.mockResolvedValue(null);

      const result = await survivorService.findOne(99);

      expect(result).toBeNull();
      expect(mockPrismaService.survivor.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('update', () => {
    it('should update a survivor', async () => {
      const updateData = { name: 'Jane Doe', age: 28 };
      const updatedSurvivor = {
        id: 1,
        name: 'Jane Doe',
        age: 28,
        gender: 'female',
        latitude: 35.6895,
        longitude: 139.6917,
      };
      mockPrismaService.survivor.update.mockResolvedValue(updatedSurvivor);

      const result = await survivorService.update(1, updateData);

      expect(result).toEqual(updatedSurvivor);
      expect(mockPrismaService.survivor.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
    });
  });

  describe('remove', () => {
    it('should remove a survivor by ID', async () => {
      const deletedSurvivor = {
        id: 1,
        name: 'John Doe',
        age: 30,
        gender: 'male',
        latitude: 35.6895,
        longitude: 139.6917,
      };
      mockPrismaService.survivor.delete.mockResolvedValue(deletedSurvivor);

      const result = await survivorService.remove(1);

      expect(result).toEqual(deletedSurvivor);
      expect(mockPrismaService.survivor.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
