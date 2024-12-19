import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserFindManyService } from './service/find-many.service';
import { UserFindByIdService } from './service/find-by-id.service';
import { UserCreateService } from './service/create.service';

@Module({
  controllers: [UserController],
  providers: [UserFindManyService, UserFindByIdService, UserCreateService],
})
export class UserModule {}
