import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma-repositories/prisma.service';
import { SpeciesDto } from 'src/modules/species/dtos/species.dto';
import { SpeciesRepository } from 'src/repositories/abstract-repositories/species.repository';
import { SpeciesCreateData } from 'src/repositories/create-data/species-create.data';

@Injectable()
export class PrismaSpeciesRepository implements SpeciesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(): Promise<SpeciesDto[]> {
    return this.prisma.species.findMany();
  }

  findById(speciesId: string): Promise<SpeciesDto | undefined> {
    return this.prisma.species.findUnique({
      where: { speciesId },
    });
  }

  findByName(name: string): Promise<SpeciesDto | undefined> {
    return this.prisma.species.findFirst({ where: { name } });
  }

  async create(createData: SpeciesCreateData): Promise<void> {
    await this.prisma.species.create({ data: createData });
  }
}
