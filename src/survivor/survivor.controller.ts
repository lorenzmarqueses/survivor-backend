import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SurvivorService } from './survivor.service';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { UpdateSurvivorDto } from './dto/update-survivor.dto';
import { PaginationDto } from 'src/types/pagination-dto';

@Controller('api/survivors')
export class SurvivorController {
  constructor(private readonly survivorService: SurvivorService) {}

  @Post()
  create(
    @Body()
    data: CreateSurvivorDto,
  ) {
    return this.survivorService.create(data);
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    const paginationDto: PaginationDto = {
      page,
      limit,
    };

    return this.survivorService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.survivorService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    data: UpdateSurvivorDto,
  ) {
    return this.survivorService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.survivorService.remove(id);
  }
}
