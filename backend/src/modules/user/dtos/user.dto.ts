import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The ID of the User.',
    example: 'e02a25a6-052a-4d44-b685-9682391b331d',
  })
  userId: string;

  @ApiProperty({
    description: 'The full name of the User.',
    example: 'John Doe',
  })
  name: string;
}
