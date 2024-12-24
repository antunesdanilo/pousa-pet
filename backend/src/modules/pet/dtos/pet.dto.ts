import { ApiProperty } from '@nestjs/swagger';
import { BreedDto } from 'src/modules/breed/dtos/breed.dto';
import { SpeciesDto } from 'src/modules/species/dtos/species.dto';
import { TutorDto } from 'src/modules/tutor/dtos/tutor.dto';

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

  // relations

  @ApiProperty({
    description: 'The tutor of the pet.',
    type: TutorDto,
    example: {
      tutorId: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      phoneNumber: '+5511998765432',
    },
  })
  tutor?: TutorDto;

  @ApiProperty({
    description: 'The species of the pet.',
    type: SpeciesDto,
    example: {
      speciesId: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Cachorro',
    },
  })
  species?: SpeciesDto;

  @ApiProperty({
    description: 'The breed of the pet.',
    type: BreedDto,
    example: {
      breedId: '123e4567-e89b-12d3-a456-426614174000',
      speciesId: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Labrador',
    },
  })
  breed?: BreedDto;
}
