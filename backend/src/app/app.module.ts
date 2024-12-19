import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { PrismaModule } from 'src/repositories/prisma-repositories/prisma.module';
import { UserModule } from 'src/modules/user/user.module';
import { TutorModule } from 'src/modules/tutor/tutor.module';
import { SpeciesModule } from 'src/modules/species/species.module';
import { BreedModule } from 'src/modules/breed/breed.module';
import { PetModule } from 'src/modules/pet/pet.module';
import { BoardingModule } from 'src/modules/boarding/boarding.module';

@Module({
  imports: [
    PrismaModule,
    RepositoriesModule,
    UserModule,
    TutorModule,
    SpeciesModule,
    BreedModule,
    PetModule,
    BoardingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
