import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TutorDto } from 'src/modules/tutor/dtos/tutor.dto';
import { TutorRepository } from 'src/repositories/abstract-repositories/tutor.repository';
import { TutorCreateData } from 'src/repositories/create-data/tutor-create.data';

@Injectable()
export class PrismaTutorRepository implements TutorRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(): Promise<TutorDto[]> {
    return this.prisma.tutor.findMany();
  }

  findById(tutorId: string): Promise<TutorDto | undefined> {
    return this.prisma.tutor.findUnique({ where: { tutorId } });
  }

  findByName(name: string): Promise<TutorDto | undefined> {
    return this.prisma.tutor.findFirst({ where: { name } });
  }

  async create(createData: TutorCreateData): Promise<void> {
    await this.prisma.tutor.create({ data: createData });
  }
}
