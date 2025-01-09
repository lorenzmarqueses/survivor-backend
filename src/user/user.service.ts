// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService, // Prisma service to interact with DB
  ) {}

  async create(data: { email: string; password: string }) {
    const hashedPassword = bcrypt.hashSync(data.password, 10); // Hash password before saving
    return this.prisma.user.create({
      data: { email: data.email, password: hashedPassword },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}
