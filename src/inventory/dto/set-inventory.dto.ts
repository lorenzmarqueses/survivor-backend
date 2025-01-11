import { ApiProperty } from '@nestjs/swagger';

export class SetInventoryDto {
  @ApiProperty({
    description: 'ID of the survivor',
    example: 1,
  })
  survivorId: number;

  @ApiProperty({
    description: 'ID of the item',
    example: 101,
  })
  itemId: number;

  @ApiProperty({
    description: 'Quantity of the item',
    example: 5,
  })
  quantity: number;
}
