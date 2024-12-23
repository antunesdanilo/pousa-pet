import { ApiProperty } from '@nestjs/swagger';
import { SpeciesDto } from 'src/modules/species/dtos/species.dto';

export class BreedDto {
  @ApiProperty({
    description: 'The unique identifier of the breed.',
    example: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
  })
  breedId: string;

  @ApiProperty({
    description: 'The unique identifier of the species.',
    example: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
  })
  speciesId: string;

  @ApiProperty({
    description: 'The name of the breed.',
    example: 'Labrador',
  })
  name: string;

  // relations

  @ApiProperty({
    description: 'The species of the breed.',
    type: SpeciesDto,
    example: {
      speciesId: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
      name: 'Cachorro',
    },
  })
  species?: SpeciesDto;
}
