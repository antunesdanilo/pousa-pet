import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma-repositories/prisma.service';
import { PetRepository } from 'src/repositories/abstract-repositories/pet.repository';
import { PetDto } from 'src/modules/pet/dtos/pet.dto';
import { PetCreateData } from 'src/repositories/create-data/pet-create.data';
import { PetFilterData } from 'src/repositories/filter-data/pet-filter.data';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaPetRepository implements PetRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(filterData: PetFilterData): Promise<PetDto[]> {
    const where: Prisma.PetWhereInput = {};

    if (filterData.tutorId) {
      where.tutorId = filterData.tutorId;
    }

    return this.prisma.pet.findMany({ where });
  }

  findById(petId: string): Promise<PetDto | undefined> {
    return this.prisma.pet.findUnique({
      where: { petId },
    });
  }

  findByName(name: string): Promise<PetDto | undefined> {
    return this.prisma.pet.findFirst({ where: { name } });
  }

  async create(createData: PetCreateData): Promise<void> {
    await this.prisma.pet.create({ data: createData });
  }
}
