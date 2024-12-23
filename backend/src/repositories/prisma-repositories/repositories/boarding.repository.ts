import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma-repositories/prisma.service';
import { BoardingRepository } from 'src/repositories/abstract-repositories/boarding.repository';
import { BoardingDto } from 'src/modules/boarding/dtos/boarding.dto';
import { BoardingCreateData } from 'src/repositories/create-data/boarding-create.data';
import { BoardingFilterData } from 'src/repositories/filter-data/boarding-filter.data';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaBoardingRepository implements BoardingRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(filterData: BoardingFilterData): Promise<BoardingDto[]> {
    const where: Prisma.BoardingWhereInput = {};

    if (filterData.tutorId) {
      where.pet.tutorId = filterData.tutorId;
    }

    return this.prisma.boarding.findMany({
      where,
      include: {
        pet: {
          include: {
            tutor: true,
            species: true,
            breed: true,
          },
        },
      },
    });
  }

  findById(boardingId: string): Promise<BoardingDto | undefined> {
    return this.prisma.boarding.findUnique({
      where: { boardingId },
      include: {
        pet: {
          include: {
            tutor: true,
            species: true,
            breed: true,
          },
        },
      },
    });
  }

  async create(createData: BoardingCreateData): Promise<void> {
    await this.prisma.boarding.create({ data: createData });
  }
}
