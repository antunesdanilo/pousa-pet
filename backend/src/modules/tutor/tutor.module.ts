import { Module } from '@nestjs/common';
import { TutorController } from './controllers/tutor.controller';
import { CreateTutorService } from './service/create.service';
import { FindTutorsService } from './service/find.service';

@Module({
  controllers: [TutorController],
  providers: [FindTutorsService, CreateTutorService],
})
export class TutorModule {}
