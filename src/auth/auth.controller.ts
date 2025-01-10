import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register route
  @Public()
  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data.email, data.password);
  }

  // Login route
  @Public()
  @Post('login')
  async login(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (user) {
      return this.authService.login(user); // Return token after successful login
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user; // User will be added to the request by AuthGuard
  }
}
