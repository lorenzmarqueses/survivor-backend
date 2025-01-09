import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { TradeItemsDto } from './dto/trade-items.dto';

@Controller('api/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() data: CreateInventoryDto) {
    return this.inventoryService.create(data);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.inventoryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateInventoryDto) {
    return this.inventoryService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.inventoryService.remove(id);
  }

  @Post('trade')
  tradeItems(
    @Body()
    data: TradeItemsDto,
  ) {
    return this.inventoryService.tradeItems(
      data.survivorFromId,
      data.survivorToId,
      data.itemId,
      data.quantity,
    );
  }
}
