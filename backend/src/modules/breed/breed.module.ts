import { Module } from '@nestjs/common';
import { BreedController } from './controllers/breed.controller';
import { FindBreedsService } from './service/find.service';
import { CreateBreedService } from './service/create.service';

@Module({
  controllers: [BreedController],
  providers: [FindBreedsService, CreateBreedService],
})
export class BreedModule {}
