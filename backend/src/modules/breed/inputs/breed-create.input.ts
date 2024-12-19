import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BreedCreateInput {
  @IsString({ message: 'O ID da espécie está em um formato inválido' })
  @IsNotEmpty({ message: 'O ID da espécie deve ser informado' })
  @ApiProperty({
    description: 'The species ID.',
    example: 'dc49b5ef-c085-4c05-a2b4-094dbbd7464c',
  })
  speciesId: string;

  @IsString({ message: 'O nome da raça está em um formato inválido' })
  @IsNotEmpty({ message: 'O nome da raça deve ser informado' })
  @ApiProperty({
    description: 'The name of the breed.',
    example: 'Labrador',
  })
  name: string;
}
