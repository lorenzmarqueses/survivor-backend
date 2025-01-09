import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthGuard, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
