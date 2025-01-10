import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // Validate user by email
  async validateUser(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      return user; // Return user if valid
    }
    return null; // Return null if invalid
  }

  // Generate JWT Token
  async login(data: LoginDto) {
    const user = await this.userService.findOne(data.email);

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // Sign the JWT token
    };
  }

  // Register user (with hashed password)
  async register(data: RegisterDto) {
    const hashedPassword = bcrypt.hashSync(data.password, 10); // Hash password before saving
    const user = await this.prisma.user.create({
      data: { email: data.email, password: hashedPassword },
    });

    if (!user) {
      throw new Error('User not created');
    }

    return this.login(data); // Return the JWT token after registration
  }
}
