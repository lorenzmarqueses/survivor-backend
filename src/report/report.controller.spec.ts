import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

describe('ReportController', () => {
  let reportController: ReportController;
  let reportService: ReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [
        {
          provide: ReportService,
          useValue: {
            getInfectedPercentage: jest.fn(),
            getNonInfectedPercentage: jest.fn(),
            getAverageResourceAmount: jest.fn(),
          },
        },
      ],
    }).compile();

    reportController = module.get<ReportController>(ReportController);
    reportService = module.get<ReportService>(ReportService);
  });

  describe('getInfectedPercentage', () => {
    it('should return the infected percentage', async () => {
      const result = 35;
      jest
        .spyOn(reportService, 'getInfectedPercentage')
        .mockResolvedValue(result);

      expect(await reportController.getInfectedPercentage()).toBe(result);
    });
  });

  describe('getNonInfectedPercentage', () => {
    it('should return the non-infected percentage', async () => {
      const result = 65;
      jest
        .spyOn(reportService, 'getNonInfectedPercentage')
        .mockResolvedValue(result);

      expect(await reportController.getNonInfectedPercentage()).toBe(result);
    });
  });

  describe('getAverageResourceAmount', () => {
    it('should return the average resource amount', async () => {
      const result = {
        averageResources: { water: 10, food: 5, medication: 2 },
      };
      jest
        .spyOn(reportService, 'getAverageResourceAmount')
        .mockResolvedValue(result);

      expect(await reportController.getAverageResourceAmount()).toBe(result);
    });
  });
});
