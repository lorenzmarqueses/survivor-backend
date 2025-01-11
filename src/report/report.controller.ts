// src/report/report.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('api/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // Get report of infected survivors
  @Get('infected')
  getInfectedReport() {
    return this.reportService.getInfectedReport();
  }

  // Get report of non-infected survivors
  @Get('non-infected')
  getNonInfectedReport() {
    return this.reportService.getNonInfectedReport();
  }

  // Get average resources allocation
  @Get('average-resources-allocation')
  getAverageResourcesAllocation() {
    return this.reportService.getAverageResourcesAllocation();
  }
}
