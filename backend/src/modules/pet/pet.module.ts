import { Module } from '@nestjs/common';
import { PetController } from './controllers/pet.controller';
import { FindPetsService } from './services/find.service';
import { CreatePetService } from './services/create.service';

@Module({
  controllers: [PetController],
  providers: [FindPetsService, CreatePetService],
})
export class PetModule {}
