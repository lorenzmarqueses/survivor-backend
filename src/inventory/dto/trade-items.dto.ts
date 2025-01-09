import { ApiProperty } from '@nestjs/swagger';

export class TradeItemsDto {
  @ApiProperty({
    description: 'ID of the survivor who is trading the item',
    example: 1,
  })
  survivorFromId: number;

  @ApiProperty({
    description: 'ID of the survivor who is receiving the item',
    example: 2,
  })
  survivorToId: number;

  @ApiProperty({
    description: 'ID of the item being traded',
    example: 101,
  })
  itemId: number;

  @ApiProperty({
    description: 'Quantity of the item being traded',
    example: 5,
  })
  quantity: number;
}
