import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateInput {
  @IsString({ message: 'O nome do usuário está em um formato inválido' })
  @IsNotEmpty({ message: 'O nome do usuário deve ser informado' })
  @ApiProperty({
    description: 'The full name of the user.',
    example: 'John Doe',
  })
  name: string;
}
