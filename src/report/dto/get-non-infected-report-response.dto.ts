import { Survivor } from '@prisma/client';

export interface GetNonInfectedReportResponse {
  value: number;
  percentage: number;
  trend: 'UP' | 'DOWN';
  report: GetNonInfectedReport;
}

export interface GetNonInfectedReport {
  nonInfectedSurvivors: Survivor[];
  previousNonInfectedSurvivors: Survivor[];
}
