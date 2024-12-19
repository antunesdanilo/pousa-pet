import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TutorCreateInput {
  @IsString({ message: 'O nome do tutor está em um formato inválido' })
  @IsNotEmpty({ message: 'O nome do tutor deve ser informado' })
  @ApiProperty({
    description: 'The full name of the tutor.',
    example: 'John Doe',
  })
  name: string;

  @IsString({
    message: 'O número de telefone do usuário está em um formato inválido',
  })
  @IsNotEmpty({ message: 'O número de telefone do usuário deve ser informado' })
  @ApiProperty({
    description: 'The phone number of the tutor.',
    example: '(00)00000-0000',
  })
  phoneNumber: string;
}
