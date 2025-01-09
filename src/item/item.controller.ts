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
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() data: CreateItemDto) {
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
    data: UpdateItemDto,
  ) {
    return this.itemService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemService.remove(id);
  }
}
