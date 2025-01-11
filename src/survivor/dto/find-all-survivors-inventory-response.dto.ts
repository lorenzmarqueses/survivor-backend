import { Survivor } from '@prisma/client';

export interface FindAllSurvivorsInventoryResponse {
  data: {
    survivorsInventory: Survivor[];
    inventoryCount: number;
  };
  total: number;
  page: number;
  limit: number;
}
