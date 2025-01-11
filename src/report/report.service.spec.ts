import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { PrismaService } from '../prisma.service';
import { GetInfectedReportResponse } from './dto/get-infected-report-response.dto';

describe('ReportService', () => {
  let reportService: ReportService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    reportService = module.get<ReportService>(ReportService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  const mockPrismaService = {
    survivor: {
      count: jest.fn(),
      findMany: jest.fn(),
    },
    inventory: {
      aggregate: jest.fn(),
    },
  };

  describe('getInfectedReport', () => {
    it('should return the correct infected report', async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Mock PrismaService responses
      mockPrismaService.survivor.count
        .mockResolvedValueOnce(100) // Total survivors in the last 30 days
        .mockResolvedValueOnce(50); // Total survivors before the last 30 days

      mockPrismaService.survivor.findMany
        .mockResolvedValueOnce([
          {
            id: 1,
            infected: true,
            name: '',
            age: 0,
            gender: '',
            latitude: 0,
            longitude: 0,
            createdAt: undefined,
            updatedAt: undefined,
          },
          {
            id: 2,
            infected: true,
            name: '',
            age: 0,
            gender: '',
            latitude: 0,
            longitude: 0,
            createdAt: undefined,
            updatedAt: undefined,
          },
        ]) // Infected survivors in the last 30 days
        .mockResolvedValueOnce([
          {
            id: 3,
            infected: true,
            name: '',
            age: 0,
            gender: '',
            latitude: 0,
            longitude: 0,
            createdAt: undefined,
            updatedAt: undefined,
          },
        ]); // Infected survivors before the last 30 days

      const expectedResult: GetInfectedReportResponse = {
        value: 2,
        percentage: (2 / 100) * 100,
        trend: 'DOWN',
        report: {
          infectedSurvivors: [
            {
              id: 1,
              infected: true,
              name: '',
              age: 0,
              gender: '',
              latitude: 0,
              longitude: 0,
              createdAt: undefined,
              updatedAt: undefined,
            },
            {
              id: 2,
              infected: true,
              name: '',
              age: 0,
              gender: '',
              latitude: 0,
              longitude: 0,
              createdAt: undefined,
              updatedAt: undefined,
            },
          ],
          previousInfectedSurvivors: [
            {
              id: 3,
              infected: true,
              name: '',
              age: 0,
              gender: '',
              latitude: 0,
              longitude: 0,
              createdAt: undefined,
              updatedAt: undefined,
            },
          ],
        },
      };

      const result = await reportService.getInfectedReport();
      expect(result).toEqual(expectedResult);

      // Verify that PrismaService methods were called correctly
      expect(mockPrismaService.survivor.count).toHaveBeenCalledTimes(2);
      expect(mockPrismaService.survivor.findMany).toHaveBeenCalledTimes(2);
    });
  });

  // Tests for getNonInfectedReport and getAverageResourcesAllocation should follow similar structure.
});
