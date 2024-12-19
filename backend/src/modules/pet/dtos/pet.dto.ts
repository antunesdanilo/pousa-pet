import { ApiProperty } from '@nestjs/swagger';

export class PetDto {
  @ApiProperty({
    description: 'The unique identifier of the pet.',
    example: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
  })
  petId: string;

  @ApiProperty({
    description: 'The unique identifier of the tutor.',
    example: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
  })
  tutorId: string;

  @ApiProperty({
    description: 'The unique identifier of the species.',
    example: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
  })
  speciesId: string;

  @ApiProperty({
    description: 'The unique identifier of the breed.',
    example: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
  })
  breedId: string;

  @ApiProperty({
    description: 'The name of the pet.',
    example: 'Teddy',
  })
  name: string;
}
