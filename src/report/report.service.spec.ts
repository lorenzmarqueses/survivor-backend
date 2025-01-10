import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { PrismaService } from '../prisma.service';

describe('ReportService', () => {
  let reportService: ReportService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    survivor: {
      count: jest.fn(),
    },
    inventory: {
      aggregate: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    reportService = module.get<ReportService>(ReportService);
    prismaService = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks(); // Clears all calls to mock functions
  });

  describe('getInfectedPercentage', () => {
    it('should return the percentage of infected survivors', async () => {
      mockPrismaService.survivor.count.mockResolvedValueOnce(100); // Total survivors
      mockPrismaService.survivor.count.mockResolvedValueOnce(25); // Infected survivors

      const result = await reportService.getInfectedPercentage();

      expect(result).toBe(25);
      expect(mockPrismaService.survivor.count).toHaveBeenCalledTimes(2);
    });

    it('should handle division by zero if no survivors exist', async () => {
      mockPrismaService.survivor.count.mockResolvedValue(0);

      const result = await reportService.getInfectedPercentage();

      expect(result).toBe(0);
    });
  });

  describe('getNonInfectedPercentage', () => {
    it('should return the percentage of non-infected survivors', async () => {
      mockPrismaService.survivor.count.mockResolvedValueOnce(100); // Total survivors
      mockPrismaService.survivor.count.mockResolvedValueOnce(75); // Non-infected survivors

      const result = await reportService.getNonInfectedPercentage();

      expect(result).toBe(75);
      expect(mockPrismaService.survivor.count).toHaveBeenCalledTimes(2);
    });

    it('should handle division by zero if no survivors exist', async () => {
      mockPrismaService.survivor.count.mockResolvedValue(0);

      const result = await reportService.getNonInfectedPercentage();

      expect(result).toBe(0);
    });
  });

  describe('getAverageResourceAmount', () => {
    it('should return the average amount of each resource per survivor', async () => {
      const resources = ['WATER', 'FOOD', 'MEDICATION', 'CVIRUS_VACCINE'];
      const totalSurvivors = 10;

      mockPrismaService.survivor.count.mockResolvedValue(totalSurvivors);

      mockPrismaService.inventory.aggregate.mockImplementation(({ where }) => {
        const resourceType = where.item.type;
        const mockQuantities = {
          WATER: 50,
          FOOD: 30,
          MEDICATION: 20,
          CVIRUS_VACCINE: 10,
        };
        return Promise.resolve({
          _sum: { quantity: mockQuantities[resourceType] },
        });
      });

      const result = await reportService.getAverageResourceAmount();

      expect(result).toEqual([
        { resource: 'WATER', average: 5 },
        { resource: 'FOOD', average: 3 },
        { resource: 'MEDICATION', average: 2 },
        { resource: 'CVIRUS_VACCINE', average: 1 },
      ]);
      expect(mockPrismaService.survivor.count).toHaveBeenCalledTimes(4);
      expect(mockPrismaService.inventory.aggregate).toHaveBeenCalledTimes(
        resources.length,
      );
    });

    it('should handle zero survivors by returning average as 0 for all resources', async () => {
      mockPrismaService.survivor.count.mockResolvedValue(0);

      const resources = ['WATER', 'FOOD', 'MEDICATION', 'CVIRUS_VACCINE'];

      mockPrismaService.inventory.aggregate.mockResolvedValue({
        _sum: { quantity: 0 },
      });

      const result = await reportService.getAverageResourceAmount();

      expect(result).toEqual(
        resources.map((resource) => ({
          resource,
          average: 0,
        })),
      );
      expect(mockPrismaService.survivor.count).toHaveBeenCalledTimes(4);
      expect(mockPrismaService.inventory.aggregate).toHaveBeenCalledTimes(
        resources.length,
      );
    });
  });
});
