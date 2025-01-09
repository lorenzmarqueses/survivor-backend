import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Prisma service
import { Survivor } from '@prisma/client';

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
  async findAll(): Promise<Survivor[]> {
    return this.prisma.survivor.findMany();
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
