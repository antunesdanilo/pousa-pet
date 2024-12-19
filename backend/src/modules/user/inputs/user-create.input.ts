import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateInput {
  @IsString({ message: 'O ID do usuário está em um formato inválido' })
  @IsNotEmpty({ message: 'O ID do usuário deve ser informado' })
  @ApiProperty({
    description: 'The ID of the user.',
    example: '22124a98-872e-4918-9e5e-b969d271758d',
  })
  userId: string;

  @IsString({ message: 'O nome do usuário está em um formato inválido' })
  @IsNotEmpty({ message: 'O nome do usuário deve ser informado' })
  @ApiProperty({
    description: 'The full name of the user.',
    example: 'John Doe',
  })
  name: string;
}
