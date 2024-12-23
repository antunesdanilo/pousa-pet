import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma-repositories/prisma.service';
import { BreedRepository } from 'src/repositories/abstract-repositories/breed.repository';
import { BreedDto } from 'src/modules/breed/dtos/breed.dto';
import { BreedCreateData } from 'src/repositories/create-data/breed-create.data';

@Injectable()
export class PrismaBreedRepository implements BreedRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(): Promise<BreedDto[]> {
    return this.prisma.breed.findMany({ include: { species: true } });
  }

  findById(breedId: string): Promise<BreedDto | undefined> {
    return this.prisma.breed.findUnique({
      where: { breedId },
      include: { species: true },
    });
  }

  findByName(name: string): Promise<BreedDto | undefined> {
    return this.prisma.breed.findFirst({
      where: { name },
      include: { species: true },
    });
  }

  async create(createData: BreedCreateData): Promise<void> {
    await this.prisma.breed.create({ data: createData });
  }
}
