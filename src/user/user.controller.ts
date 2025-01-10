// src/user/user.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
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

  @Get(':email')
  findOne(email: string) {
    return this.userService.findOne(email);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
