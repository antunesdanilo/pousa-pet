import { Module } from '@nestjs/common';
import { BoardingController } from './controllers/boarding.controller';
import { FindBoardingsService } from './services/find.service';
import { CreateBoardingService } from './services/create.service';

@Module({
  controllers: [BoardingController],
  providers: [FindBoardingsService, CreateBoardingService],
})
export class BoardingModule {}
