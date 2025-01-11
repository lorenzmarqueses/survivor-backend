export interface GetAverageResourcesReportResponse {
  data: GetAverageResourcesReport[];
}

export interface GetAverageResourcesReport {
  resource: string;
  average: number;
  daysWorth: number;
}
