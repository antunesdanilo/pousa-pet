import { Module } from '@nestjs/common';
import { SpeciesController } from './controllers/species.controller';
import { FindSpeciesService } from './service/find.service';
import { CreateSpeciesService } from './service/create.service';

@Module({
  controllers: [SpeciesController],
  providers: [FindSpeciesService, CreateSpeciesService],
})
export class SpeciesModule {}
