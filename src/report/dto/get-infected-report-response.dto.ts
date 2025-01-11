import { Survivor } from '@prisma/client';

export interface GetInfectedReportResponse {
  value: number;
  percentage: number;
  trend: 'UP' | 'DOWN';
  report: GetNonInfectedReport;
}

export interface GetNonInfectedReport {
  infectedSurvivors: Survivor[];
  previousInfectedSurvivors: Survivor[];
}
