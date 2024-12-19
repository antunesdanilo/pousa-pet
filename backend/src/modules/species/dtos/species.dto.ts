import { ApiProperty } from '@nestjs/swagger';

export class SpeciesDto {
  @ApiProperty({
    description: 'The unique identifier of the species.',
    example: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
  })
  speciesId: string;

  @ApiProperty({
    description: 'The name of the species.',
    example: 'Dog',
  })
  name: string;
}
