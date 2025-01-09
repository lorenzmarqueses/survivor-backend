import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ description: 'Name of the item', example: 'Water Bottle' })
  name: string;

  @ApiProperty({
    description: 'Description of the item',
    example: 'A bottle of clean drinking water',
  })
  description: string;

  @ApiProperty({ description: 'Type of the item', example: 'WATER' })
  options: 'WATER' | 'FOOD' | 'MEDICATION' | 'CVIRUS_VACCINE';
}
