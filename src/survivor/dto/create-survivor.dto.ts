import { ApiProperty } from '@nestjs/swagger';

export class CreateSurvivorDto {
  @ApiProperty({
    description: 'The name of the survivor',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The age of the survivor',
    example: 30,
  })
  age: number;

  @ApiProperty({
    description: 'The gender of the survivor',
    example: 'Male',
  })
  gender: string;

  @ApiProperty({
    description: 'The latitude position of the survivor',
    example: 52.52,
  })
  latitude: number;

  @ApiProperty({
    description: 'The longitude position of the survivor',
    example: 13.405,
  })
  longitude: number;
}
