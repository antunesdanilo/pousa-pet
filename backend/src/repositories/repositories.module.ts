import { Global, Module } from '@nestjs/common';

// Abstract repositories
import { UserRepository } from './abstract-repositories/user.repository';
import { TutorRepository } from './abstract-repositories/tutor.repository';
import { SpeciesRepository } from './abstract-repositories/species.repository';
import { BreedRepository } from './abstract-repositories/breed.repository';
import { PetRepository } from './abstract-repositories/pet.repository';
import { BoardingRepository } from './abstract-repositories/boarding.repository';

// Prisma repositories
import { PrismaUserRepository } from './prisma-repositories/repositories/user.repository';
import { PrismaTutorRepository } from './prisma-repositories/repositories/tutor.repository';
import { PrismaSpeciesRepository } from './prisma-repositories/repositories/species.repository';
import { PrismaBreedRepository } from './prisma-repositories/repositories/breed.repository';
import { PrismaPetRepository } from './prisma-repositories/repositories/pet.repository';
import { PrismaBoardingRepository } from './prisma-repositories/repositories/boarding.repository';

@Global()
@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: TutorRepository,
      useClass: PrismaTutorRepository,
    },
    {
      provide: SpeciesRepository,
      useClass: PrismaSpeciesRepository,
    },
    {
      provide: BreedRepository,
      useClass: PrismaBreedRepository,
    },
    {
      provide: PetRepository,
      useClass: PrismaPetRepository,
    },
    {
      provide: BoardingRepository,
      useClass: PrismaBoardingRepository,
    },
  ],
  exports: [
    UserRepository,
    TutorRepository,
    SpeciesRepository,
    BreedRepository,
    PetRepository,
    BoardingRepository,
  ],
})
export class RepositoriesModule {}
