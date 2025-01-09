import { ApiProperty } from '@nestjs/swagger';

export class CreateTradeLogDto {
  @ApiProperty({
    description: 'The ID of the survivor who is sending the item',
    example: 1,
  })
  survivorFromId: number;

  @ApiProperty({
    description: 'The ID of the survivor who is receiving the item',
    example: 2,
  })
  survivorToId: number;

  @ApiProperty({
    description: 'The ID of the item being traded',
    example: 101,
  })
  itemId: number;

  @ApiProperty({
    description: 'The quantity of the item being traded',
    example: 5,
  })
  quantity: number;
}
