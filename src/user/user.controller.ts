// src/user/user.controller.ts
import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import the JWT Auth Guard
import { Public } from '../auth/public.decorator'; // Public decorator to bypass authentication
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body()
    data: {
      email: string;
      password: string;
    },
  ) {
    return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
