import { PetDto } from './pet.dto';
import { UserDto } from './user.dto';

export interface BoardingDto {
  boardingId: string;
  petId: string;
  checkInDate: Date;
  expectedDailyStays: number;
  insertedByUserId: string;
  // relations
  pet?: PetDto;
  insertedByUser?: UserDto;
}
