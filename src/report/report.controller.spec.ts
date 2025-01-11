import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

describe('ReportController', () => {
  let reportController: ReportController;
  let reportService: ReportService;

  const mockReportService = {
    getInfectedReport: jest.fn(),
    getNonInfectedReport: jest.fn(),
    getAverageResourcesAllocation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [
        {
          provide: ReportService,
          useValue: mockReportService,
        },
      ],
    }).compile();

    reportController = module.get<ReportController>(ReportController);
    reportService = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(reportController).toBeDefined();
  });

  describe('getInfectedReport', () => {
    it('should call ReportService.getInfectedReport and return the result', async () => {
      const result = { infected: 50 };
      mockReportService.getInfectedReport.mockReturnValue(result);

      const response = reportController.getInfectedReport();
      expect(reportService.getInfectedReport).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('getNonInfectedReport', () => {
    it('should call ReportService.getNonInfectedReport and return the result', async () => {
      const result = { nonInfected: 50 };
      mockReportService.getNonInfectedReport.mockReturnValue(result);

      const response = reportController.getNonInfectedReport();
      expect(reportService.getNonInfectedReport).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('getAverageResourcesAllocation', () => {
    it('should call ReportService.getAverageResourcesAllocation and return the result', async () => {
      const result = { food: 10, water: 5 };
      mockReportService.getAverageResourcesAllocation.mockReturnValue(result);

      const response = reportController.getAverageResourcesAllocation();
      expect(reportService.getAverageResourcesAllocation).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });
});
