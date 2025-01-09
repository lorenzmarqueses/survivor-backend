import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

@Injectable()
export class JwtStrategy {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate JWT token and extract user info
  async validate(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.authService.validateUser(
        decoded.email,
        decoded.sub,
      );
      if (!user) {
        throw new Error('User not found');
      }
      return user; // Return user if JWT is valid
    } catch (error) {
      throw new Error('Unauthorized');
    }
  }
}
