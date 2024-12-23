import { ApiProperty } from '@nestjs/swagger';
import { PetDto } from 'src/modules/pet/dtos/pet.dto';

export class BoardingDto {
  @ApiProperty({
    description: 'The unique identifier of the boarding.',
    example: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
  })
  boardingId: string;

  @ApiProperty({
    description: 'The unique identifier of the pet.',
    example: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
  })
  petId: string;

  @ApiProperty({
    description: 'The date the pet is checked in for boarding.',
    example: '2024-12-19T00:00:00Z',
  })
  checkInDate: Date;

  @ApiProperty({
    description:
      'The expected number of daily stays during the boarding period.',
    example: 3,
  })
  expectedDailyStays: number;

  @ApiProperty({
    description:
      'The unique identifier of the user who inserted the boarding record.',
    example: 'f1b59f32-a8ab-4c92-8e7d-5ecb1a76179c',
  })
  insertedByUserId: string;

  // relations

  @ApiProperty({
    description: 'The pet that is staying',
    type: PetDto,
    example: {
      petId: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
      tutorId: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
      speciesId: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
      breedId: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
      name: 'Teddy',
    },
  })
  pet?: PetDto;
}
