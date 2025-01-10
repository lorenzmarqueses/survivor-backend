import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    description: 'The page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'The limit of items per page',
    example: 10,
  })
  limit: number;
}
