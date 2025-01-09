import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(
    @Body()
    data: {
      name: string;
      description: string;
      options: 'WATER' | 'FOOD' | 'MEDICATION' | 'CVIRUS_VACCINE';
    },
  ) {
    return this.itemService.create(data);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itemService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    data: {
      name?: string;
      description?: string;
      options?: 'WATER' | 'FOOD' | 'MEDICATION' | 'CVIRUS_VACCINE';
    },
  ) {
    return this.itemService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemService.remove(id);
  }
}
