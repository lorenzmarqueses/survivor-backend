import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate user by email and password
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user; // Return user if valid
    }
    return null; // Return null if invalid
  }

  // Generate JWT Token
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // Sign the JWT token
    };
  }

  // Register user (with hashed password)
  async register(email: string, password: string) {
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash password before saving
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword },
    });
    return this.login(user); // Return the JWT token after registration
  }
}
