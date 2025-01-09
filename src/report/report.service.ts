// src/report/report.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ItemType } from '@prisma/client';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  // Get percentage of infected survivors
  async getInfectedPercentage(): Promise<number> {
    const totalSurvivors = await this.prisma.survivor.count();
    const infectedSurvivors = await this.prisma.survivor.count({
      where: { infected: true },
    });
    return (infectedSurvivors / totalSurvivors) * 100;
  }

  // Get percentage of non-infected survivors
  async getNonInfectedPercentage(): Promise<number> {
    const totalSurvivors = await this.prisma.survivor.count();
    const nonInfectedSurvivors = await this.prisma.survivor.count({
      where: { infected: false },
    });
    return (nonInfectedSurvivors / totalSurvivors) * 100;
  }

  // Get average amount of each resource by survivor
  async getAverageResourceAmount(): Promise<any> {
    const resources = ['WATER', 'FOOD', 'MEDICATION', 'CVIRUS_VACCINE'];

    const averageResources = await Promise.all(
      resources.map(async (resource) => {
        const totalResourceQuantity = await this.prisma.inventory.aggregate({
          _sum: { quantity: true },
          where: {
            item: { options: resource as ItemType },
          },
        });

        const totalSurvivors = await this.prisma.survivor.count();
        return {
          resource,
          average: totalResourceQuantity._sum.quantity / totalSurvivors,
        };
      }),
    );

    return averageResources;
  }
}
