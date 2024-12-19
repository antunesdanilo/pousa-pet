import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SpeciesCreateInput {
  @IsString({ message: 'O nome da espécie está em um formato inválido' })
  @IsNotEmpty({ message: 'O nome da espécie deve ser informado' })
  @ApiProperty({
    description: 'The name of the species.',
    example: 'Cat',
  })
  name: string;
}
