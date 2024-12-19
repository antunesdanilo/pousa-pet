import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BoardingCreateInput {
  @IsString({ message: 'O ID do pet está em um formato inválido' })
  @IsNotEmpty({ message: 'O ID do pet deve ser informado' })
  @ApiProperty({
    description: 'The ID of the pet.',
    example: 'e02a25a6-052a-4d44-b685-9682391b331d',
  })
  petId: string;

  @IsDate({ message: 'A data de entrada do pet está em um formato inválido' })
  @IsNotEmpty({ message: 'A data de entrada do pet deve ser informada' })
  @ApiProperty({
    description: 'The check-in date.',
    example: '2024-12-23T00:00:00Z',
  })
  checkInDate: Date;

  @IsNumber(
    {},
    {
      message: 'A quantidade de diárias previstas está em um formato inválido',
    },
  )
  @IsNotEmpty({
    message: 'A quantidade de diárias previstas deve ser informada',
  })
  @ApiProperty({
    description: 'Expected number of daily stays.',
    example: 5,
  })
  expectedDailyStays: number;

  @IsString({ message: 'O ID do usuário está em um formato inválido' })
  @IsNotEmpty({ message: 'O ID do usuário deve ser informado' })
  @ApiProperty({
    description: 'The ID of the user.',
    example: 'e02a25a6-052a-4d44-b685-9682391b331d',
  })
  insertedByUserId: string;
}
