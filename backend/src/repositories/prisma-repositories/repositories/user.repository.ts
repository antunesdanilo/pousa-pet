import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDto } from 'src/modules/user/dtos/user.dto';
import { UserCreateData } from 'src/repositories/create-data/user-create.data';
import { UserRepository } from 'src/repositories/abstract-repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(): Promise<UserDto[]> {
    return this.prisma.user.findMany();
  }

  findById(userId: string): Promise<UserDto | undefined> {
    return this.prisma.user.findUnique({ where: { userId } });
  }

  findByName(name: string): Promise<UserDto | undefined> {
    return this.prisma.user.findFirst({ where: { name } });
  }

  async create(createData: UserCreateData): Promise<void> {
    await this.prisma.user.create({ data: createData });
  }
}
