import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
  @ApiProperty({
    description: 'The quantity of items in the inventory',
    example: 10,
  })
  quantity?: number;
}
