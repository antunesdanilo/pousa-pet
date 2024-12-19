import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PetCreateInput {
  @IsString({ message: 'O ID do tutor está em um formato inválido' })
  @IsNotEmpty({ message: 'O ID do tutor deve ser informado' })
  @ApiProperty({
    description: 'The ID of the tutor.',
    example: 'e02a25a6-052a-4d44-b685-9682391b331d',
  })
  tutorId: string;

  @IsString({ message: 'O ID da espécie do pet está em um formato inválido' })
  @IsNotEmpty({ message: 'O ID da espécie do pet de ser informada' })
  @ApiProperty({
    description: 'The pet species ID.',
    example: 'Cachorro',
  })
  speciesId: string;

  @IsString({ message: 'O ID da raça do pet está em um formato inválido' })
  @IsNotEmpty({ message: 'A ID da raça do pet de ser informado' })
  @ApiProperty({
    description: 'The pet breed ID.',
    example: 'Labrador',
  })
  breedId: string;

  @IsString({ message: 'O nome do pet está em um formato inválido' })
  @IsNotEmpty({ message: 'O nome do pet deve ser informado' })
  @ApiProperty({
    description: 'The destination location of the ride.',
    example: 'Teddy',
  })
  name: string;
}
