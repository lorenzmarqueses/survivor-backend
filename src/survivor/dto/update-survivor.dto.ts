import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSurvivorDto {
  @ApiPropertyOptional({
    description: 'The name of the survivor',
    example: 'Jane Doe',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'The age of the survivor',
    example: 28,
  })
  age?: number;

  @ApiPropertyOptional({
    description: 'The gender of the survivor',
    example: 'Female',
  })
  gender?: string;

  @ApiPropertyOptional({
    description: 'The latitude position of the survivor',
    example: 51.1657,
  })
  latitude?: number;

  @ApiPropertyOptional({
    description: 'The longitude position of the survivor',
    example: 10.4515,
  })
  longitude?: number;
}
