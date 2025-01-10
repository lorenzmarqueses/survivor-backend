import { Survivor } from '@prisma/client';

export interface FindAllSurvivorsResponse {
  data: {
    survivors: Survivor[];
    infectedCount: number;
    nonInfectedCount: number;
  };
  total: number;
  page: number;
  limit: number;
}
