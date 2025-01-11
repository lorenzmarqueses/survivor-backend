// src/report/report.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ItemType } from '@prisma/client';
import { GetNonInfectedReportResponse } from './dto/get-non-infected-report-response.dto';
import { GetInfectedReportResponse } from './dto/get-infected-report-response.dto';
import { GetAverageResourcesReportResponse } from './dto/get-average-resources-report-response.dto';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  // Get report of infected survivors
  async getInfectedReport(): Promise<GetInfectedReportResponse> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalSurvivorsCount,
      infectedSurvivors,
      previousInfectedSurvivors,
      previousTotalSurvivorsCount,
    ] = await Promise.all([
      this.prisma.survivor.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      this.prisma.survivor.findMany({
        where: { infected: true, createdAt: { gte: thirtyDaysAgo } },
      }),
      this.prisma.survivor.findMany({
        where: { infected: true, createdAt: { lt: thirtyDaysAgo } },
      }),
      this.prisma.survivor.count({
        where: { createdAt: { lt: thirtyDaysAgo } },
      }),
    ]);

    const percentage = totalSurvivorsCount
      ? (infectedSurvivors?.length / totalSurvivorsCount) * 100
      : 0;
    const previousPercentage = previousTotalSurvivorsCount
      ? (previousInfectedSurvivors?.length / previousTotalSurvivorsCount) * 100
      : 0;
    const trend = percentage > previousPercentage ? 'UP' : 'DOWN';

    return {
      value: infectedSurvivors?.length,
      percentage,
      trend,
      report: {
        infectedSurvivors: infectedSurvivors,
        previousInfectedSurvivors: previousInfectedSurvivors,
      },
    };
  }

  // Get report of non-infected survivors
  async getNonInfectedReport(): Promise<GetNonInfectedReportResponse> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalSurvivorsCount,
      nonInfectedSurvivors,
      previousNonInfectedSurvivors,
      previousTotalSurvivorsCount,
    ] = await Promise.all([
      this.prisma.survivor.count(),
      this.prisma.survivor.findMany({ where: { infected: false } }),
      this.prisma.survivor.findMany({
        where: { infected: false, createdAt: { lt: thirtyDaysAgo } },
      }),
      this.prisma.survivor.count({
        where: { createdAt: { lt: thirtyDaysAgo } },
      }),
    ]);

    const percentage = totalSurvivorsCount
      ? (nonInfectedSurvivors?.length / totalSurvivorsCount) * 100
      : 0;
    const previousPercentage = previousTotalSurvivorsCount
      ? (previousNonInfectedSurvivors?.length / previousTotalSurvivorsCount) *
        100
      : 0;
    const trend = percentage > previousPercentage ? 'UP' : 'DOWN';

    return {
      value: nonInfectedSurvivors?.length,
      percentage,
      trend,
      report: { nonInfectedSurvivors, previousNonInfectedSurvivors },
    };
  }

  // Get average allocation of each resource by survivor
  async getAverageResourcesAllocation(): Promise<GetAverageResourcesReportResponse> {
    const resources = ['WATER', 'FOOD', 'MEDICATION', 'CVIRUS_VACCINE'];
    const resourceAllocations = await Promise.all(
      resources.map(async (resource) => {
        const totalResource = await this.prisma.inventory.aggregate({
          _sum: { quantity: true },
          where: { item: { type: resource as ItemType } },
        });

        const totalSurvivors = await this.prisma.survivor.count();

        const average = totalSurvivors
          ? totalResource._sum.quantity / totalSurvivors
          : 0;

        const consumptionPerDay = 1; // Assume each survivor consumes 1 unit of each resource per day
        const daysWorth = average ? Math.floor(average / consumptionPerDay) : 0;
        return {
          resource,
          average,
          daysWorth,
        };
      }),
    );

    return {
      data: resourceAllocations,
    };
  }
}
