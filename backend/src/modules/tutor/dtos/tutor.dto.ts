import { ApiProperty } from '@nestjs/swagger';

export class TutorDto {
  @ApiProperty({
    description: 'Unique identifier for the tutor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  tutorId: string;

  @ApiProperty({
    description: 'Name of the tutor',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Phone number of the tutor in international format',
    example: '+5511998765432',
  })
  phoneNumber: string;
}
