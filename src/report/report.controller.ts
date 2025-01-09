// src/report/report.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('api/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // Get percentage of infected survivors
  @Get('infected-percentage')
  getInfectedPercentage() {
    return this.reportService.getInfectedPercentage();
  }

  // Get percentage of non-infected survivors
  @Get('non-infected-percentage')
  getNonInfectedPercentage() {
    return this.reportService.getNonInfectedPercentage();
  }

  // Get average amount of each resource by survivor
  @Get('average-resources')
  getAverageResourceAmount() {
    return this.reportService.getAverageResourceAmount();
  }
}
