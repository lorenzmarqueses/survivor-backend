import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'strongPassword123',
  })
  readonly password: string;
}
