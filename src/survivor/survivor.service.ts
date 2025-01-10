import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Prisma service
import { Survivor } from '@prisma/client';
import { PaginationDto } from 'src/types/pagination-dto';
import { FindAllSurvivorsResponse } from './dto/find-all-survivors-response.dto';

@Injectable()
export class SurvivorService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new survivor
  async create(data: {
    name: string;
    age: number;
    gender: string;
    latitude: number;
    longitude: number;
  }): Promise<Survivor> {
    return this.prisma.survivor.create({
      data,
    });
  }

  // Get all survivors
  async findAll(
    paginationDto: PaginationDto,
  ): Promise<FindAllSurvivorsResponse> {
    const survivors = await this.prisma.survivor.findMany({
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit,
    });

    const infectedCount = await this.findAllInfectedCount();
    const nonInfectedCount = await this.findAllNonInfectedCount();
    const total = infectedCount + nonInfectedCount;
    const page = paginationDto.page;
    const limit = paginationDto.limit;

    return {
      data: {
        survivors,
        infectedCount,
        nonInfectedCount,
      },
      total,
      page,
      limit,
    };
  }

  // Get all infected survivors count
  async findAllInfectedCount(): Promise<number> {
    return this.prisma.survivor.count({
      where: {
        infected: true,
      },
    });
  }

  // Get all non-infected survivors count
  async findAllNonInfectedCount(): Promise<number> {
    return this.prisma.survivor.count({
      where: {
        infected: false,
      },
    });
  }

  // Get a survivor by ID
  async findOne(id: number): Promise<Survivor> {
    return this.prisma.survivor.findUnique({
      where: { id },
    });
  }

  // Update survivor
  async update(
    id: number,
    data: {
      name?: string;
      age?: number;
      gender?: string;
      latitude?: number;
      longitude?: number;
    },
  ): Promise<Survivor> {
    return this.prisma.survivor.update({
      where: { id },
      data,
    });
  }

  // Delete survivor
  async remove(id: number): Promise<Survivor> {
    return this.prisma.survivor.delete({
      where: { id },
    });
  }
}
