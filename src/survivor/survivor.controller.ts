import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SurvivorService } from './survivor.service';
import { Public } from 'src/auth/public.decorator';

@Controller('api/survivors')
export class SurvivorController {
  constructor(private readonly survivorService: SurvivorService) {}

  @Post()
  create(
    @Body()
    data: {
      name: string;
      age: number;
      gender: string;
      latitude: number;
      longitude: number;
    },
  ) {
    return this.survivorService.create(data);
  }

  @Get()
  findAll() {
    return this.survivorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.survivorService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    data: {
      name?: string;
      age?: number;
      gender?: string;
      latitude?: number;
      longitude?: number;
    },
  ) {
    return this.survivorService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.survivorService.remove(id);
  }
}
